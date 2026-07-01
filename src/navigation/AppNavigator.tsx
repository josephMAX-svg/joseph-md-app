import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, BorderRadius } from '../theme/tokens';
import { Icon, IconName } from '../components/icons';

import HomeScreen from '../screens/HomeScreen';
import EstudioScreen from '../screens/EstudioScreen';
import DermaScreen from '../screens/DermaScreen';
import EmpresaHubScreen from '../screens/EmpresaHubScreen';
import InvestigacionScreen from '../screens/InvestigacionScreen';
import VitalsScreen from '../screens/VitalsScreen';
import SynapseScreen from '../screens/SynapseScreen';

const Tab = createBottomTabNavigator();

// Tab icon: SVG profesional (mapea el emoji legacy → icono del set)
const EMOJI_TO_ICON: Record<string, IconName> = {
  '🏠': 'home', '📚': 'study', '💎': 'gem', '💼': 'business',
  '🔬': 'research', '🫀': 'vitals', '🧠': 'synapse',
};
function TabIcon({ icon, focused, color }: { icon: string; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <Icon
        name={EMOJI_TO_ICON[icon] || 'target'}
        size={22}
        color={focused ? Colors.secondary : Colors.muted}
        strokeWidth={focused ? 1.9 : 1.65}
      />
    </View>
  );
}

// Clinical Precision dark theme for React Navigation
const ClinicalTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.secondary,
    background: Colors.surface,
    card: Colors.surfaceContainerLowest,
    text: Colors.onSurface,
    border: Colors.surfaceContainerLow,
    notification: Colors.coral,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={ClinicalTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.onSurface,
          tabBarInactiveTintColor: Colors.muted,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="🏠" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Estudio"
          component={EstudioScreen}
          options={{
            tabBarLabel: 'Study',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="📚" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Derma"
          component={DermaScreen}
          options={{
            tabBarLabel: 'Derma',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="💎" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Empresa"
          component={EmpresaHubScreen}
          options={{
            tabBarLabel: 'Business',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="💼" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Investigación"
          component={InvestigacionScreen}
          options={{
            tabBarLabel: 'Research',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="🔬" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Vitals"
          component={VitalsScreen}
          options={{
            tabBarLabel: 'VITALS',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="🫀" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Synapse"
          component={SynapseScreen}
          options={{
            tabBarLabel: 'SYNAPSE',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon icon="🧠" focused={focused} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: FontSize.labelSm,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  iconContainer: {
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  iconContainerActive: {
    backgroundColor: Colors.surfaceContainerHighest,
  },
  icon: {
    fontSize: 18,
  },
});
