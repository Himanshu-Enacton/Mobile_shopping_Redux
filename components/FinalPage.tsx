import React from 'react';
import { Feather } from '@react-native-vector-icons/feather/static';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../assets/Themes';
import { useDispatch } from 'react-redux';
import { resetAll } from './redux/action';

const FinalPage = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const handleResetAll = () => {
    dispatch(resetAll());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.successIcon}>
        <Feather name="check" size={30} color={theme.textStrong} />
      </View>
      <Text style={styles.title} accessibilityRole="header">
        Order delivered
      </Text>
      <Text style={styles.message}>
        Your item has been successfully delivered.
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 140,
    backgroundColor: theme.screenBackground,
  },
  successIcon: {
    width: 168,
    height: 168,
    borderRadius: 134,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.controlBackground,
    marginBottom: 22,
  },
  title: {
    ...theme.text17Bold,
    color: theme.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...theme.text13,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    minHeight: 48,
    minWidth: 190,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: theme.actionBackground,
    marginTop: 28,
  },
  buttonText: {
    ...theme.text13Bold,
    color: theme.white,
  },
});

export default FinalPage;
