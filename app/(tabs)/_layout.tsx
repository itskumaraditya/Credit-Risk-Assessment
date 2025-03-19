import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { SquareActivity as ActivitySquare, Chrome as Home, ChartLine as LineChart, User } from 'lucide-react-native';

export default function TabLayout() {
  // Use platform-specific props to avoid web warnings
  const iconProps = Platform.select({
    web: {
      // Remove responder props on web
      onStartShouldSetResponder: undefined,
      onResponderTerminate: undefined
    },
    default: {}
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1B1E',
          borderTopColor: '#2C2D31',
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#71717A',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} {...iconProps} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ size, color }) => (
            <LineChart size={size} color={color} {...iconProps} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          tabBarIcon: ({ size, color }) => (
            <ActivitySquare size={size} color={color} {...iconProps} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} {...iconProps} />
          ),
        }}
      />
    </Tabs>
  );
}