import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { ArrowUpRight, ArrowDownLeft, Repeat, Shield } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

const activities = [
  {
    type: 'send',
    protocol: 'Uniswap V3',
    amount: '1,234.56 USDC',
    time: '2 hours ago',
    status: 'completed',
    risk: 'low',
  },
  {
    type: 'receive',
    protocol: 'Aave V3',
    amount: '0.5 ETH',
    time: '5 hours ago',
    status: 'completed',
    risk: 'medium',
  },
  {
    type: 'swap',
    protocol: 'PancakeSwap',
    amount: '500 USDT → 0.3 ETH',
    time: '1 day ago',
    status: 'completed',
    risk: 'low',
  },
  {
    type: 'stake',
    protocol: 'Lido',
    amount: '2 ETH',
    time: '3 days ago',
    status: 'completed',
    risk: 'low',
  },
];

export default function ActivitiesScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight size={24} color="#EF4444" />;
      case 'receive':
        return <ArrowDownLeft size={24} color="#22C55E" />;
      case 'swap':
        return <Repeat size={24} color="#6366F1" />;
      case 'stake':
        return <Shield size={24} color="#8B5CF6" />;
      default:
        return <ArrowUpRight size={24} color="#6366F1" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return '#22C55E';
      case 'medium':
        return '#EAB308';
      case 'high':
        return '#EF4444';
      default:
        return '#6366F1';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Activities</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={styles.filterButtonTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Transfers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Swaps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Stakes</Text>
        </TouchableOpacity>
      </View>

      {activities.map((activity, index) => (
        <TouchableOpacity key={index} style={styles.activityCard}>
          <View style={styles.activityIcon}>
            {getActivityIcon(activity.type)}
          </View>
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.protocolName}>{activity.protocol}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
            <Text style={styles.activityAmount}>{activity.amount}</Text>
            <View style={styles.activityFooter}>
              <Text style={styles.activityStatus}>{activity.status}</Text>
              <Text style={[styles.riskLevel, { color: getRiskColor(activity.risk) }]}>
                {activity.risk} risk
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1B1E',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2C2D31',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#71717A',
    fontSize: 14,
  },
  filterButtonTextActive: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#2C2D31',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1A1B1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  protocolName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
  },
  activityAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textTransform: 'capitalize',
  },
  riskLevel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});