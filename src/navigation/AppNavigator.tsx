import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, BorderRadius } from '../theme/tokens';

import HomeScreen from '../screens/HomeScreen';
import EstudioScreen from '../screens/EstudioScreen';
import DermaScreen from '../screens/DermaScreen';
import EmpresaScreen from '../screens/EmpresaScreen';
import InvestigacionScreen from '../screens/InvestigacionScreen';

const Tab = createBottomTabNavigator();

// Tab icon component using emoji (no external icon lib needed)
function TabIcon({ icon, focused, color }: { icon: string; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <Text style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}>{icon}</Text>
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
            tabBarLabel: 'Estudio',
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
          component={EmpresaScreen}
          options={{
            tabBarLabel: 'Empresa',
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
