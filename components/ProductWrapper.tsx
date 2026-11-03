import { theme } from '../assets/Themes';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from './Header';
import Products from './Products';

export default function ProductWrapper({ navigation }: any) {
  return (
    <View style={styles.flex}>
      <Header navigation={navigation} />
      <ScrollView>
        <Products />
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.userButton}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('User')}
      >
        <Text style={styles.userButtonText}>User</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  userButton: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    minWidth: 68,
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: theme.actionBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.shadowButton,
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  userButtonText: { ...theme.text14Bold, color: theme.white },
});
