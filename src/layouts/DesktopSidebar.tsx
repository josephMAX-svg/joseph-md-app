import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors, FontSize, SidebarAccents, Elevation, Hairline, Motion } from '../theme/tokens';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';
import { Icon, SEGMENT_ICON, IconName } from '../components/icons';

// Etiqueta de Quick Stat: icono SVG + texto (reemplaza los emoji de prefijo)
function StatLabel({ icon, text, accent }: { icon: IconName; text: string; accent?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
      <Icon name={icon} size={14} color={accent || Colors.onSurfaceVariant} strokeWidth={1.6} />
      <Text style={desktopStyles.sidebarStatLabel}>{text}</Text>
    </View>
  );
}

export type ScreenName = 'Home' | 'Estudio' | 'Derma' | 'Empresa' | 'Investigación' | 'Vitals' | 'Synapse';

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
  { key: 'Home', label: 'Home', sublabel: 'Dashboard · 1,367 days', icon: '🏠' },
  { key: 'Estudio', label: 'Study', sublabel: 'APEX Engine · CZI --', icon: '📚' },
  { key: 'Derma', label: 'Derma', sublabel: 'Fellowship · 0 papers', icon: '💎' },
  { key: 'Empresa', label: 'Business', sublabel: 'Pulso · Liviano · Franquicias', icon: '💼' },
  { key: 'Investigación', label: 'Research', sublabel: 'Pipeline · 0 pub', icon: '🔬' },
  { key: 'Vitals', label: 'VITALS', sublabel: 'Body · AI-measured', icon: '🫀' },
  { key: 'Synapse', label: 'SYNAPSE', sublabel: 'Mind · AI-engineered', icon: '🧠' },
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

  // Active → tinted glass with the item's own accent (coherent con SidebarAccents).
  // Hover (inactivo) → sutil elevación tonal.
  const activeStyle = isActive
    ? { backgroundColor: accentColor + '16', borderLeftColor: accentColor }
    : hovered
      ? { backgroundColor: DesktopColors.sidebarHover, borderLeftColor: accentColor + '55' }
      : {};
  const webTransition = Platform.OS === 'web'
    ? { transition: Motion.base, cursor: 'pointer' as any }
    : {};

  return (
    <TouchableOpacity
      style={[
        desktopStyles.navItem,
        activeStyle,
        webTransition as any,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...webHoverProps}
    >
      {/* Icono SVG con realce (glow del acento) cuando el item está activo */}
      <View
        style={[
          desktopStyles.navItemIcon,
          { alignItems: 'center', justifyContent: 'center' },
          (isActive || hovered) && Platform.OS === 'web'
            ? ({ filter: `drop-shadow(0 0 9px ${accentColor}77)` } as any)
            : {},
          !isActive && !hovered ? { opacity: 0.82 } : {},
        ]}
      >
        <Icon
          name={SEGMENT_ICON[item.key] || 'target'}
          size={21}
          color={isActive || hovered ? accentColor : Colors.onSurfaceVariant}
          strokeWidth={isActive ? 1.9 : 1.65}
        />
      </View>
      <View style={desktopStyles.navItemTextContainer}>
        <Text
          style={[
            desktopStyles.navItemLabel,
            isActive && desktopStyles.navItemLabelActive,
            hovered && !isActive ? { color: Colors.onSurface } : {},
          ]}
        >
          {item.label}
        </Text>
        <Text
          style={[
            desktopStyles.navItemSublabel,
            isActive && desktopStyles.navItemSublabelActive,
          ]}
          numberOfLines={1}
        >
          {item.sublabel}
        </Text>
      </View>
      {/* Punto de estado activo con glow del acento */}
      {isActive && (
        <View
          style={[
            { width: 6, height: 6, borderRadius: 3, backgroundColor: accentColor, marginLeft: 8 },
            Elevation.glow(accentColor),
          ]}
        />
      )}
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
  const [chatHovered, setChatHovered] = useState(false);

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
    <View style={[desktopStyles.sidebar, Platform.OS === 'web' ? ({ borderRightWidth: 1, borderRightColor: Hairline.soft } as any) : {}]}>
      {/* Logo */}
      <View style={desktopStyles.sidebarLogo}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[
              { width: 3, height: 20, borderRadius: 2, backgroundColor: Colors.teal, marginRight: 10 },
              Elevation.glow(Colors.teal),
            ]}
          />
          <Text style={desktopStyles.sidebarLogoText}>Joseph MD</Text>
        </View>
        <Text style={[desktopStyles.sidebarLogoSub, { marginLeft: 13 }]}>
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
      <View
        style={[
          desktopStyles.sidebarStats,
          {
            marginHorizontal: 12,
            paddingHorizontal: 12,
            paddingVertical: 2,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderWidth: 1,
            borderColor: Hairline.soft,
          },
        ]}
      >
        <View style={desktopStyles.sidebarStatRow}>
          <StatLabel icon="queue" text="APEX Queue" />
          <Text style={[desktopStyles.sidebarStatValue, { color: queueCount > 0 ? Colors.teal : Colors.muted, fontVariant: ['tabular-nums'] }]}>
            {queueCount}
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <StatLabel icon="timer" text="Deep Work" />
          <Text style={[desktopStyles.sidebarStatValue, { color: Colors.amber, fontVariant: ['tabular-nums'] }]}>
            {Math.round(deepWorkHours * 10) / 10}h
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <StatLabel icon="chart" text="CZI" />
          <Text style={[desktopStyles.sidebarStatValue, { color: getCZIColor(cziValue), fontVariant: ['tabular-nums'] }]}>
            {cziValue !== null ? cziValue.toFixed(2) : '--'}
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <StatLabel icon="flame" text="Streak" accent={Colors.gold} />
          <Text style={[desktopStyles.sidebarStatValue, { color: Colors.amber, fontVariant: ['tabular-nums'] }]}>
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
            Elevation.sm,
            webBtnTransition as any,
            apexHovered && Platform.OS === 'web' ? { transform: [{ scale: 1.02 }], ...Elevation.glow(Colors.teal) } as any : {},
          ]}
          onPress={onApexPress}
          activeOpacity={0.7}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setApexHovered(true),
            onMouseLeave: () => setApexHovered(false),
          } : {})}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <Icon name="bolt" size={15} color={Colors.onSecondary} strokeWidth={1.9} />
            <Text style={desktopStyles.sidebarActionBtnText}>APEX 1-TAP</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            desktopStyles.sidebarActionBtn,
            { backgroundColor: Colors.purple },
            Elevation.sm,
            webBtnTransition as any,
            dictarHovered && Platform.OS === 'web' ? { transform: [{ scale: 1.02 }], ...Elevation.glow(Colors.purple) } as any : {},
          ]}
          onPress={onDictarPress}
          activeOpacity={0.7}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setDictarHovered(true),
            onMouseLeave: () => setDictarHovered(false),
          } : {})}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <Icon name="mic" size={15} color="#FFFFFF" strokeWidth={1.8} />
            <Text style={[desktopStyles.sidebarActionBtnText, { color: '#FFFFFF' }]}>DICTATE ERROR</Text>
          </View>
        </TouchableOpacity>
        {onChatPress && (
          <TouchableOpacity
            style={[
              desktopStyles.sidebarActionBtn,
              { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.blue + '55' },
              webBtnTransition as any,
              chatHovered && Platform.OS === 'web' ? { backgroundColor: Colors.blue + '18', borderColor: Colors.blue } as any : {},
            ]}
            onPress={onChatPress}
            activeOpacity={0.7}
            {...(Platform.OS === 'web' ? {
              onMouseEnter: () => setChatHovered(true),
              onMouseLeave: () => setChatHovered(false),
            } : {})}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <Icon name="chat" size={15} color={Colors.blue} strokeWidth={1.8} />
              <Text style={[desktopStyles.sidebarActionBtnText, { color: Colors.blue }]}>AGENT CHAT</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
