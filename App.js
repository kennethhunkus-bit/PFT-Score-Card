import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from './src/utils/theme';
import CalculatorScreen from './src/screens/CalculatorScreen';
import StandardsScreen from './src/screens/StandardsScreen';
import InfoScreen from './src/screens/InfoScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ focused, label }) {
  const icons = { Calculator: '⚡', Standards: '📋', Info: 'ℹ️' };
  return (
    <View style={{ alignItems: 'center', paddingTop: 2 }}>
      <Text style={{ fontSize: 20 }}>{icons[label]}</Text>
    </View>
  );
}

function Header({ title }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.coastGuardMark}>
          <Text style={styles.markText}>⚓</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSub}>USCG Physical Readiness Program</Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: ({ options }) => <Header title={options.title || route.name} />,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} label={route.name} />,
            tabBarActiveTintColor: COLORS.navyLight,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
          })}
        >
          <Tab.Screen
            name="Calculator"
            component={CalculatorScreen}
            options={{ title: 'PFT Calculator' }}
          />
          <Tab.Screen
            name="Standards"
            component={StandardsScreen}
            options={{ title: 'Standards Table' }}
          />
          <Tab.Screen
            name="Info"
            component={InfoScreen}
            options={{ title: 'PFT Rules' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.navyDark,
    paddingTop: Platform.OS === 'ios' ? 54 : 12,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.red,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coastGuardMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: FONTS.sizes.xs,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    height: Platform.OS === 'ios' ? 82 : 62,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    marginTop: 2,
  },
});
