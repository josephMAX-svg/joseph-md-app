import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
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
}

const NAV_ITEMS: { key: ScreenName; label: string; icon: string }[] = [
  { key: 'Home', label: 'Home', icon: '🏠' },
  { key: 'Estudio', label: 'Estudio', icon: '📚' },
  { key: 'Derma', label: 'Derma', icon: '💎' },
  { key: 'Empresa', label: 'Empresa', icon: '💼' },
  { key: 'Investigación', label: 'Research', icon: '🔬' },
];

export default function DesktopSidebar({
  activeScreen,
  onNavigate,
  queueCount,
  streak,
  cziValue,
  deepWorkHours,
  onApexPress,
  onDictarPress,
}: SidebarProps) {
  const getCZIColor = (val: number | null) => {
    if (val === null) return Colors.muted;
    if (val >= 0.90) return Colors.green;
    if (val >= 0.70) return Colors.amber;
    return Colors.coral;
  };

  return (
    <View style={desktopStyles.sidebar}>
      {/* Logo */}
      <View style={desktopStyles.sidebarLogo}>
        <Text style={desktopStyles.sidebarLogoText}>Joseph MD</Text>
        <Text style={desktopStyles.sidebarLogoSub}>
          Dermatologist · Mayo Clinic
        </Text>
      </View>

      {/* Navigation */}
      <View style={desktopStyles.navSection}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[desktopStyles.navItem, isActive && desktopStyles.navItemActive]}
              onPress={() => onNavigate(item.key)}
              activeOpacity={0.7}
            >
              <Text style={desktopStyles.navItemIcon}>{item.icon}</Text>
              <Text
                style={[
                  desktopStyles.navItemLabel,
                  isActive && desktopStyles.navItemLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Stats */}
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

      {/* Action Buttons */}
      <View style={desktopStyles.sidebarActions}>
        <TouchableOpacity
          style={[desktopStyles.sidebarActionBtn, { backgroundColor: Colors.blue }]}
          onPress={onApexPress}
          activeOpacity={0.7}
        >
          <Text style={desktopStyles.sidebarActionBtnText}>⚡ APEX 1 TOQUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[desktopStyles.sidebarActionBtn, { backgroundColor: Colors.purple }]}
          onPress={onDictarPress}
          activeOpacity={0.7}
        >
          <Text style={[desktopStyles.sidebarActionBtnText, { color: '#FFFFFF' }]}>
            🎙 DICTAR ERROR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
