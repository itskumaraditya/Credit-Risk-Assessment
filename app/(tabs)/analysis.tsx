import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { Activity, Wallet, ArrowUpRight, ShieldCheck } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

export default function AnalysisScreen() {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Risk Analysis</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protocol Activity</Text>
        <View style={styles.card}>
          <Activity size={24} color="#6366F1" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Active on 8 Protocols</Text>
            <Text style={styles.cardDesc}>High engagement across DeFi ecosystem</Text>
            <View style={styles.riskIndicator}>
              <Text style={styles.riskText}>Low Risk</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Analysis</Text>
        <View style={styles.card}>
          <Wallet size={24} color="#22C55E" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Multiple Secure Wallets</Text>
            <Text style={styles.cardDesc}>Good distribution of assets</Text>
            <View style={[styles.riskIndicator, styles.lowRisk]}>
              <Text style={styles.riskText}>Low Risk</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction Patterns</Text>
        <View style={styles.card}>
          <ArrowUpRight size={24} color="#EAB308" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>High-Value Transactions</Text>
            <Text style={styles.cardDesc}>Regular large transfers detected</Text>
            <View style={[styles.riskIndicator, styles.mediumRisk]}>
              <Text style={styles.riskText}>Medium Risk</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Score</Text>
        <View style={styles.card}>
          <ShieldCheck size={24} color="#22C55E" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Strong Security Practices</Text>
            <Text style={styles.cardDesc}>Multi-sig and hardware wallet usage</Text>
            <View style={[styles.riskIndicator, styles.lowRisk]}>
              <Text style={styles.riskText}>Low Risk</Text>
            </View>
          </View>
        </View>
      </View>
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
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2C2D31',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardContent: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cardDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginTop: 4,
  },
  riskIndicator: {
    backgroundColor: '#22C55E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  lowRisk: {
    backgroundColor: '#22C55E20',
  },
  mediumRisk: {
    backgroundColor: '#EAB30820',
  },
  highRisk: {
    backgroundColor: '#EF444420',
  },
  riskText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#22C55E',
  },
});