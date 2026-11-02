import { theme } from '../assets/Themes';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { CartItem } from './Products';

export default function Header({ navigation }: { navigation: any }) {
  const cartItems = useSelector(
    (state: { reducer: CartItem[] }) => state.reducer,
  );
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>DISCOVER</Text>
          <Text style={styles.title}>New In</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.75}
          onPress={() => {
            navigation.navigate('List');
          }}
        >
          <View style={styles.bagIcon}>
            <View style={styles.bagHandle} />
          </View>
          {cartItemCount > 0 ? (
            <View style={styles.countBadge}>
              <Text style={styles.count}>{cartItemCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>The latest phones, selected for you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.screenBackground,
    paddingHorizontal: 18,
    paddingTop: 23,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    ...theme.text10ExtraBoldSpaced,

    color: theme.textEyebrow,

    marginBottom: 4,
  },
  title: {
    ...theme.text29ExtraBold,

    color: theme.textHeading,
  },
  subtitle: { ...theme.text13, color: theme.textSecondary, marginTop: 7 },
  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.shadowButton,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bagIcon: {
    width: 18,
    height: 16,
    marginTop: 5,
    borderWidth: 1.8,
    borderColor: theme.textStrong,
    borderRadius: 3,
    alignItems: 'center',
  },
  bagHandle: {
    position: 'absolute',
    width: 9,
    height: 7,
    top: -7,
    borderWidth: 1.8,
    borderColor: theme.textStrong,
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  countBadge: {
    position: 'absolute',
    top: -3,
    right: -2,
    minWidth: 19,
    height: 19,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.actionBackground,
    borderWidth: 2,
    borderColor: theme.screenBackground,
  },
  count: { ...theme.text10ExtraBold, color: theme.white },
});
