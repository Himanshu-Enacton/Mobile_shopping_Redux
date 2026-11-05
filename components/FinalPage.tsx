import React from 'react';
import { Feather } from '@react-native-vector-icons/feather/static';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../assets/Themes';
import { useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resetAll } from './redux/action';
import type { RootStackParamList } from './navigationTypes';

type FinalPageProps = NativeStackScreenProps<RootStackParamList, 'Final'>;

const FinalPage = ({ navigation, route }: FinalPageProps) => {
  const dispatch = useDispatch();
  const { customerDetails } = route.params;
  const handleResetAll = () => {
    dispatch(resetAll());
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.successIcon}>
        <Feather name="check" size={28} color={theme.textStrong} />
      </View>
      <Text style={styles.eyebrow}>ORDER CONFIRMED</Text>
      <Text style={styles.title} accessibilityRole="header">
        Order placed
      </Text>
      <Text style={styles.message}>
        Thanks, {customerDetails.name.split(' ')[0]}. Your order is confirmed
        and will be delivered to the address below.
      </Text>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          Delivery details
        </Text>
        <View style={styles.detailRow}>
          <Feather name="user" size={17} color={theme.textSecondary} />
          <Text style={styles.detailText}>{customerDetails.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="mail" size={17} color={theme.textSecondary} />
          <Text style={styles.detailText}>{customerDetails.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={17} color={theme.textSecondary} />
          <Text style={styles.detailText}>{customerDetails.address}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment</Text>
          <Text style={styles.paymentValue}>Cash on Delivery</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleResetAll();
          navigation.navigate('Home');
        }}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Back to products</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.screenBackground,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  successIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.controlBackground,
    marginBottom: 18,
  },
  eyebrow: {
    ...theme.text10ExtraBoldSpaced,
    color: theme.textEyebrow,
    marginBottom: 8,
  },
  title: {
    ...theme.text29ExtraBold,
    color: theme.textHeading,
    textAlign: 'center',
  },
  message: {
    ...theme.text13,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 26,
  },
  detailsCard: {
    alignSelf: 'stretch',
    backgroundColor: theme.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.borderFooter,
    padding: 18,
  },
  cardTitle: {
    ...theme.text15Bold,
    color: theme.textPrimary,
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailText: {
    ...theme.text13,
    color: theme.textPrimary,
    flex: 1,
    lineHeight: 19,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.borderFooter,
    marginBottom: 14,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    ...theme.text12,
    color: theme.textSecondary,
  },
  paymentValue: {
    ...theme.text12Bold,
    color: theme.textPrimary,
  },
  button: {
    minHeight: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: theme.actionBackground,
    marginTop: 22,
  },
  buttonText: {
    ...theme.text13Bold,
    color: theme.white,
  },
});

export default FinalPage;
