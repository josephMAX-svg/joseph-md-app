import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors, FontSize, SidebarAccents } from '../theme/tokens';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';

export type ScreenName = 'Home' | 'Estudio' | 'Derma' | 'Empresa' | 'Investigación';

interface SidebarProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  queueCount: number;
  streak: number;
  cziValue: number | null;
  deepWorkHours: number;
  onApexPress: () => void;
  onDictarPress: () => void;
  onChatPress?: () => void;
}

const NAV_ITEMS: { key: ScreenName; label: string; sublabel: string; icon: string }[] = [
  { key: 'Home', label: 'Home', sublabel: 'Dashboard · 1,367 días', icon: '🏠' },
  { key: 'Estudio', label: 'Estudio', sublabel: 'Motor APEX · CZI --', icon: '📚' },
  { key: 'Derma', label: 'Derma', sublabel: 'Fellowship · 0 papers', icon: '💎' },
  { key: 'Empresa', label: 'Empresa', sublabel: 'DTC Perú · Fase 0', icon: '💼' },
  { key: 'Investigación', label: 'Research', sublabel: 'Pipeline · 0 pub', icon: '🔬' },
];

function NavItem({
  item,
  isActive,
  onPress,
}: {
  item: typeof NAV_ITEMS[0];
  isActive: boolean;
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const accentColor = SidebarAccents[item.key] || Colors.teal;

  const webHoverProps = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};

  const hoverBg = hovered && !isActive ? { backgroundColor: DesktopColors.sidebarHover } : {};
  const webTransition = Platform.OS === 'web'
    ? { transition: 'background-color 0.15s ease', cursor: 'pointer' as any }
    : {};

  return (
    <TouchableOpacity
      style={[
        desktopStyles.navItem,
        isActive && desktopStyles.navItemActive,
        hoverBg,
        webTransition as any,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...webHoverProps}
    >
      <Text style={desktopStyles.navItemIcon}>{item.icon}</Text>
      <View style={desktopStyles.navItemTextContainer}>
        <Text
          style={[
            desktopStyles.navItemLabel,
            isActive && desktopStyles.navItemLabelActive,
          ]}
        >
          {item.label}
        </Text>
        <Text
          style={[
            desktopStyles.navItemSublabel,
            isActive && desktopStyles.navItemSublabelActive,
          ]}
        >
          {item.sublabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function DesktopSidebar({
  activeScreen,
  onNavigate,
  queueCount,
  streak,
  cziValue,
  deepWorkHours,
  onApexPress,
  onDictarPress,
  onChatPress,
}: SidebarProps) {
  const [apexHovered, setApexHovered] = useState(false);
  const [dictarHovered, setDictarHovered] = useState(false);

  const getCZIColor = (val: number | null) => {
    if (val === null) return Colors.muted;
    if (val >= 0.90) return Colors.green;
    if (val >= 0.70) return Colors.amber;
    return Colors.coral;
  };

  const webBtnTransition = Platform.OS === 'web'
    ? { transition: 'all 0.2s ease', cursor: 'pointer' as any }
    : {};

  return (
    <View style={desktopStyles.sidebar}>
      {/* Logo */}
      <View style={desktopStyles.sidebarLogo}>
        <Text style={desktopStyles.sidebarLogoText}>Joseph MD</Text>
        <Text style={desktopStyles.sidebarLogoSub}>
          Dermatologist · Mayo Clinic
        </Text>
      </View>

      {/* Section 1: Navigation */}
      <Text style={desktopStyles.sidebarSectionLabel}>NAVIGATION</Text>
      <View style={desktopStyles.navSection}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            isActive={activeScreen === item.key}
            onPress={() => onNavigate(item.key)}
          />
        ))}
      </View>

      {/* Divider */}
      <View style={desktopStyles.sidebarDivider} />

      {/* Section 2: Quick Stats */}
      <Text style={desktopStyles.sidebarSectionLabel}>QUICK STATS</Text>
      <View style={desktopStyles.sidebarStats}>
        <View style={desktopStyles.sidebarStatRow}>
          <Text style={desktopStyles.sidebarStatLabel}>⏳ APEX Queue</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: queueCount > 0 ? Colors.teal : Colors.muted }]}>
            {queueCount}
          </Text>
        </View>
        <View style={desktopStyles.sidebarStatRow}>
          <Text style={desktopStyles.sidebarStatLabel}>⏱ Deep Work</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: Colors.amber }]}>
            {Math.round(deepWorkHours * 10) / 10}h
          </Text>
        </View>
        <View style={desktopStyles.sidebarStatRow}>
          <Text style={desktopStyles.sidebarStatLabel}>📊 CZI</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: getCZIColor(cziValue) }]}>
            {cziValue !== null ? cziValue.toFixed(2) : '--'}
          </Text>
        </View>
        <View style={desktopStyles.sidebarStatRow}>
          <Text style={desktopStyles.sidebarStatLabel}>🔥 Streak</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: Colors.amber }]}>
            {streak}d
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={desktopStyles.sidebarDivider} />

      {/* Section 3: Actions */}
      <Text style={desktopStyles.sidebarSectionLabel}>ACTIONS</Text>
      <View style={desktopStyles.sidebarActions}>
        <TouchableOpacity
          style={[
            desktopStyles.sidebarActionBtn,
            { backgroundColor: Colors.teal },
            webBtnTransition as any,
            apexHovered && Platform.OS === 'web' ? { opacity: 0.9, transform: [{ scale: 1.02 }] } as any : {},
          ]}
          onPress={onApexPress}
          activeOpacity={0.7}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setApexHovered(true),
            onMouseLeave: () => setApexHovered(false),
          } : {})}
        >
          <Text style={desktopStyles.sidebarActionBtnText}>⚡ APEX 1 TOQUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            desktopStyles.sidebarActionBtn,
            { backgroundColor: Colors.purple },
            webBtnTransition as any,
            dictarHovered && Platform.OS === 'web' ? { opacity: 0.9, transform: [{ scale: 1.02 }] } as any : {},
          ]}
          onPress={onDictarPress}
          activeOpacity={0.7}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setDictarHovered(true),
            onMouseLeave: () => setDictarHovered(false),
          } : {})}
        >
          <Text style={[desktopStyles.sidebarActionBtnText, { color: '#FFFFFF' }]}>
            🎙 DICTAR ERROR
          </Text>
        </TouchableOpacity>
        {onChatPress && (
          <TouchableOpacity
            style={[
              desktopStyles.sidebarActionBtn,
              { backgroundColor: Colors.blue },
              webBtnTransition as any,
            ]}
            onPress={onChatPress}
            activeOpacity={0.7}
          >
            <Text style={[desktopStyles.sidebarActionBtnText, { color: '#FFFFFF' }]}>
              💬 CHAT AGENTE
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
