import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
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
        <Text style={styles.title}>Credit Risk Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>785</Text>
          <Text style={styles.scoreLabel}>Excellent</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Score History</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              data: [650, 680, 720, 750, 770, 785]
            }]
          }}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#1A1B1E',
            backgroundGradientFrom: '#1A1B1E',
            backgroundGradientTo: '#1A1B1E',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.factorsContainer}>
        <Text style={styles.sectionTitle}>Key Factors</Text>
        
        <View style={styles.factor}>
          <Shield size={24} color="#22C55E" />
          <View style={styles.factorContent}>
            <Text style={styles.factorTitle}>Strong Security Practices</Text>
            <Text style={styles.factorDesc}>Multiple wallets with proper security measures</Text>
          </View>
        </View>

        <View style={styles.factor}>
          <TrendingUp size={24} color="#6366F1" />
          <View style={styles.factorContent}>
            <Text style={styles.factorTitle}>Consistent Trading History</Text>
            <Text style={styles.factorDesc}>Regular activity across multiple DEXs</Text>
          </View>
        </View>

        <View style={styles.factor}>
          <AlertTriangle size={24} color="#EAB308" />
          <View style={styles.factorContent}>
            <Text style={styles.factorTitle}>High-Risk Transactions</Text>
            <Text style={styles.factorDesc}>Recent interaction with unaudited protocols</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Generate Detailed Report</Text>
      </TouchableOpacity>
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
  scoreContainer: {
    backgroundColor: '#2C2D31',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  score: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#6366F1',
  },
  scoreLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#6366F1',
    marginTop: 8,
  },
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  factorsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  factor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2D31',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  factorContent: {
    marginLeft: 16,
  },
  factorTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  factorDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});