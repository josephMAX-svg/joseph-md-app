import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors, FontSize, SidebarAccents, Elevation, Hairline, Motion } from '../theme/tokens';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';

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
      {/* Icon con leve realce cuando el item está activo */}
      <Text
        style={[
          desktopStyles.navItemIcon,
          (isActive || hovered) && Platform.OS === 'web'
            ? ({ textShadow: `0 0 12px ${accentColor}66` } as any)
            : {},
          !isActive && !hovered ? { opacity: 0.72 } : {},
        ]}
      >
        {item.icon}
      </Text>
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
          <Text style={desktopStyles.sidebarStatLabel}>⏳ APEX Queue</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: queueCount > 0 ? Colors.teal : Colors.muted, fontVariant: ['tabular-nums'] }]}>
            {queueCount}
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <Text style={desktopStyles.sidebarStatLabel}>⏱ Deep Work</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: Colors.amber, fontVariant: ['tabular-nums'] }]}>
            {Math.round(deepWorkHours * 10) / 10}h
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <Text style={desktopStyles.sidebarStatLabel}>📊 CZI</Text>
          <Text style={[desktopStyles.sidebarStatValue, { color: getCZIColor(cziValue), fontVariant: ['tabular-nums'] }]}>
            {cziValue !== null ? cziValue.toFixed(2) : '--'}
          </Text>
        </View>
        <View style={[desktopStyles.sidebarStatRow, { borderTopWidth: 1, borderTopColor: Hairline.soft }]}>
          <Text style={desktopStyles.sidebarStatLabel}>🔥 Streak</Text>
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
          <Text style={desktopStyles.sidebarActionBtnText}>⚡ APEX 1-TAP</Text>
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
          <Text style={[desktopStyles.sidebarActionBtnText, { color: '#FFFFFF' }]}>
            🎙 DICTATE ERROR
          </Text>
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
            <Text style={[desktopStyles.sidebarActionBtnText, { color: Colors.blue }]}>
              💬 AGENT CHAT
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
