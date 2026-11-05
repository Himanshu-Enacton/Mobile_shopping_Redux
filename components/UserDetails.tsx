import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik, type FormikErrors } from 'formik';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../assets/Themes';
import { Feather } from '@react-native-vector-icons/feather/static';
import type { CustomerDetails, RootStackParamList } from './navigationTypes';

type UserDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'UserDetails'
>;

export default function UserDetails({ navigation }: UserDetailsProps) {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>CHECKOUT</Text>
          <Text style={styles.title} accessibilityRole="header">
            Your details
          </Text>
          <Text style={styles.subtitle}>
            Add your contact and delivery details.
          </Text>
        </View>

        <Formik
          initialValues={{ name: '', address: '', email: '' }}
          validate={(values): FormikErrors<CustomerDetails> => {
            const errors: FormikErrors<CustomerDetails> = {};
            if (!values.name.trim()) {
              errors.name = 'Enter your full name.';
            }
            if (!values.address.trim()) {
              errors.address = 'Enter your delivery address.';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
              errors.email = 'Enter a valid email address.';
            }
            return errors;
          }}
          onSubmit={values => {
            const customerDetails = {
              name: values.name.trim(),
              address: values.address.trim(),
              email: values.email.trim(),
            };
            Alert.alert(
              'Place your order?',
              'Your details are ready. Confirm to place your order.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Place order',
                  onPress: () => navigation.replace('Final', { customerDetails }),
                },
              ],
              { cancelable: true },
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <View style={styles.card}>
                <Text style={styles.sectionTitle} accessibilityRole="header">
                  Contact & delivery
                </Text>
                <Text style={styles.sectionDescription}>
                  Where should we send your order?
                </Text>

                <View style={styles.field}>
                  <Text style={styles.label}>Full name</Text>
                  <TextInput
                    style={styles.input}
                    accessibilityLabel="Full name"
                    placeholder="Enter your full name"
                    placeholderTextColor={theme.textPlaceholder}
                    autoCapitalize="words"
                    autoComplete="name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name ? (
                    <Text style={styles.fieldError}>{errors.name}</Text>
                  ) : null}
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Delivery address</Text>
                  <TextInput
                    style={[styles.input, styles.addressInput]}
                    accessibilityLabel="Delivery address"
                    placeholder="House number, street, city and PIN code"
                    placeholderTextColor={theme.textPlaceholder}
                    autoCapitalize="sentences"
                    autoComplete="street-address"
                    multiline
                    textAlignVertical="top"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  {touched.address && errors.address ? (
                    <Text style={styles.fieldError}>{errors.address}</Text>
                  ) : null}
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Email address</Text>
                  <TextInput
                    style={styles.input}
                    accessibilityLabel="Email address"
                    placeholder="you@example.com"
                    placeholderTextColor={theme.textPlaceholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.fieldError}>{errors.email}</Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.paymentSection}>
                <Text style={styles.sectionTitle} accessibilityRole="header">
                  Payment method
                </Text>
                <View style={styles.paymentOptions}>
                  <View style={styles.paymentOption}>
                    <View style={styles.paymentIcon}>
                      <Feather
                        name="truck"
                        size={22}
                        color={theme.textStrong}
                      />
                    </View>
                    <View>
                      <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                      <Text style={styles.paymentDescription}>
                        Pay when it arrives
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit()}
                activeOpacity={0.8}
                accessibilityRole="button"
              >
                <Text style={styles.submitText}>Submit details</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.screenBackground },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },
  heading: { marginBottom: 28 },
  eyebrow: {
    ...theme.text10ExtraBoldSpaced,
    color: theme.textEyebrow,
    marginBottom: 8,
  },
  title: { ...theme.text29ExtraBold, color: theme.textHeading },
  subtitle: {
    ...theme.text13,
    color: theme.textSecondary,
    marginTop: 8,
    lineHeight: 20,
  },
  form: { flex: 1 },
  card: {
    backgroundColor: theme.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.borderFooter,
  },
  sectionTitle: { ...theme.text17Bold, color: theme.textPrimary },
  sectionDescription: {
    ...theme.text13,
    color: theme.textSecondary,
    marginTop: 6,
    marginBottom: 6,
    lineHeight: 20,
  },
  field: { marginTop: 20 },
  label: { ...theme.text12Bold, color: theme.textPrimary, marginBottom: 9 },
  input: {
    ...theme.text14,
    color: theme.textPrimary,
    backgroundColor: theme.screenBackground,
    borderWidth: 1,
    borderColor: theme.borderInput,
    borderRadius: 12,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  fieldError: {
    ...theme.text12,
    color: theme.error,
    marginTop: 6,
  },
  addressInput: { minHeight: 108 },
  paymentSection: { marginTop: 24 },
  paymentOptions: { flexDirection: 'row', gap: 12, marginTop: 14 },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.borderInput,
    borderRadius: 16,
    padding: 14,
  },
  paymentIcon: {
    marginRight: 15,
    marginLeft: 15,
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.controlBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: { ...theme.text13Bold, color: theme.textPrimary },
  paymentDescription: {
    ...theme.text12,
    color: theme.textSecondary,
    lineHeight: 18,
    marginTop: 6,
  },
  submitButton: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: theme.actionBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  submitText: { ...theme.text14Bold, color: theme.white },
});
