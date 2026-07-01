import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../theme/tokens';
import { useDataSource, fetchLocal } from '../lib/dataSource';
import { saveChatLogs } from '../lib/supabase';
import type { ChatLogEntry } from '../lib/supabase';

export type AgentId = 'promir' | 'usmle' | 'encaps' | 'method';

interface AgentDef {
  id: AgentId;
  name: string;
  short: string;
  color: string;
}

const AGENTS: AgentDef[] = [
  { id: 'promir', name: 'ProMIR Scout', short: 'ProMIR', color: Colors.blue },
  { id: 'usmle', name: 'USMLE Strategist', short: 'USMLE', color: Colors.green },
  { id: 'encaps', name: 'ENCAPS Optimizer', short: 'ENCAPS', color: Colors.amber },
  { id: 'method', name: 'Method Researcher', short: 'Method', color: Colors.teal },
];

interface Message {
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

interface ChatResponse {
  reply?: string;
  response?: string;
  message?: string;
}

interface AgentChatModalProps {
  visible: boolean;
  onClose: () => void;
  initialAgent?: AgentId;
}

function genSessionId(): string {
  // RFC4122-ish v4 (not crypto-grade — fine for log correlation)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AgentChatModal({ visible, onClose, initialAgent }: AgentChatModalProps) {
  const { isLocalAvailable } = useDataSource();
  const [agentId, setAgentId] = useState<AgentId | null>(initialAgent ?? null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const sessionIdRef = useRef<string>(genSessionId());
  const scrollRef = useRef<ScrollView>(null);

  // Reset on open with new initialAgent
  useEffect(() => {
    if (visible) {
      sessionIdRef.current = genSessionId();
      if (initialAgent) setAgentId(initialAgent);
    }
  }, [visible, initialAgent]);

  const activeAgent = AGENTS.find((a) => a.id === agentId) ?? null;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !agentId || !isLocalAvailable || sending) return;
    const userMsg: Message = { role: 'user', text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.text }));
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 60_000);
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agentId, message: text, history }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const data = (await res.json()) as ChatResponse;
      const reply = data.reply ?? data.response ?? data.message ?? 'Sin respuesta';
      setMessages((prev) => [...prev, { role: 'agent', text: reply, timestamp: Date.now() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'Error al contactar el agente. Reintenta.', timestamp: Date.now() },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleClose = useCallback(() => {
    // Persist chat pairs to Supabase in background
    if (agentId && messages.length > 0) {
      const pairs: ChatLogEntry[] = [];
      for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].role === 'user' && messages[i + 1].role === 'agent') {
          pairs.push({
            agente: AGENTS.find((a) => a.id === agentId)?.short ?? agentId,
            mensaje_usuario: messages[i].text,
            respuesta_agente: messages[i + 1].text,
            sesion_id: sessionIdRef.current,
          });
          i++; // skip paired agent msg
        }
      }
      if (pairs.length > 0) void saveChatLogs(pairs);
    }
    setMessages([]);
    setInput('');
    onClose();
  }, [agentId, messages, onClose]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }, [messages.length]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {activeAgent ? activeAgent.name : 'Chat con Agente'}
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isLocalAvailable ? Colors.teal : Colors.muted },
                ]}
              />
              <Text style={styles.statusText}>
                {isLocalAvailable ? 'PC conectada' : 'Agente offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Agent selector */}
        <View style={styles.agentSelector}>
          {AGENTS.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={[
                styles.agentBtn,
                agentId === a.id && { borderColor: a.color, backgroundColor: a.color + '15' },
              ]}
              onPress={() => setAgentId(a.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.agentBtnText,
                  agentId === a.id && { color: a.color, fontWeight: '700' },
                ]}
                numberOfLines={1}
              >
                {a.short}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageArea}
          contentContainerStyle={styles.messageContent}
        >
          {!agentId ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🤖</Text>
              <Text style={styles.emptyText}>Selecciona un agente para iniciar conversación</Text>
            </View>
          ) : messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>💬</Text>
              <Text style={styles.emptyText}>
                {isLocalAvailable
                  ? `Escribe un mensaje para ${activeAgent?.name}`
                  : 'Chat requiere PC encendida · Agente offline'}
              </Text>
            </View>
          ) : (
            messages.map((m, i) => (
              <View
                key={i}
                style={[
                  styles.bubble,
                  m.role === 'user' ? styles.bubbleUser : styles.bubbleAgent,
                  m.role === 'agent' && activeAgent ? { borderLeftColor: activeAgent.color } : {},
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    m.role === 'user' && { color: '#0B1628' },
                  ]}
                >
                  {m.text}
                </Text>
              </View>
            ))
          )}
          {sending && (
            <View style={[styles.bubble, styles.bubbleAgent]}>
              <ActivityIndicator size="small" color={activeAgent?.color ?? Colors.teal} />
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              (!isLocalAvailable || !agentId) && { opacity: 0.5 },
            ]}
            placeholder={
              !isLocalAvailable
                ? 'PC offline · chat no disponible'
                : !agentId
                ? 'Selecciona un agente'
                : 'Escribe un mensaje…'
            }
            placeholderTextColor={Colors.muted}
            value={input}
            onChangeText={setInput}
            editable={isLocalAvailable && !!agentId && !sending}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!isLocalAvailable || !agentId || !input.trim() || sending) && styles.sendBtnDisabled,
            ]}
            onPress={handleSend}
            disabled={!isLocalAvailable || !agentId || !input.trim() || sending}
            activeOpacity={0.7}
          >
            <Text style={styles.sendBtnText}>▶</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Hairline.soft,
  },
  closeBtn: {
    fontSize: 20, color: Colors.onSurfaceVariant, fontWeight: '400',
    width: 32, height: 32, textAlign: 'center', lineHeight: 32,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceContainerLow,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: FontSize.titleMd, lineHeight: LineHeight.titleMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2, marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: BorderRadius.full, marginRight: 6 },
  statusText: { fontSize: FontSize.labelSm, color: Colors.smallLabel, fontWeight: '600', letterSpacing: 0.3 },

  agentSelector: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Hairline.soft,
  },
  agentBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Hairline.medium,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any, transition: '150ms cubic-bezier(0.4,0,0.2,1)' } as any : {}),
  },
  agentBtnText: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.3 },

  messageArea: { flex: 1 },
  messageContent: { padding: Spacing.lg, gap: Spacing.md },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: Spacing.md },
  emptyText: { fontSize: FontSize.bodyMd, lineHeight: LineHeight.bodyMd, color: Colors.smallLabel, textAlign: 'center', paddingHorizontal: Spacing.xl },

  bubble: {
    maxWidth: '85%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.teal,
    borderBottomRightRadius: BorderRadius.sm,
    ...Elevation.sm,
  },
  bubbleAgent: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surfaceContainerHigh,
    borderBottomLeftRadius: BorderRadius.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
    ...Elevation.sm,
  },
  bubbleText: { fontSize: FontSize.bodyMd, color: Colors.onSurface, lineHeight: LineHeight.bodyMd },

  inputRow: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Hairline.soft,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    maxHeight: 100,
    minHeight: 44,
    borderWidth: 1,
    borderColor: Hairline.soft,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    ...Elevation.glow(Colors.teal),
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  sendBtnDisabled: { opacity: 0.3, ...Elevation.none },
  sendBtnText: { fontSize: 18, color: '#0B1628', fontWeight: '800' },
});
