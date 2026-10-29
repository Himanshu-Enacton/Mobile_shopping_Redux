import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { CartItem, Item } from './Products';
import { addToCart, removeToCart } from './redux/action';

export default function CartList({ navigation }: { navigation: any }) {
  const cartItems = useSelector(
    (state: { reducer: CartItem[] }) => state.reducer,
  );
  const dispatch = useDispatch();
  const handleAddToCart = (item: Item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (id: number,//quantity: number
    ) => {
    // if(quantity===1){
    //   setTimeout(()=>{
    //     dispatch(removeToCart(id))
    //   }, 2000)
    // }else{
    //   dispatch(removeToCart(id));
    // }
    dispatch(removeToCart(id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text pointerEvents="none" style={styles.headerTitle}>
          My Cart
        </Text>
        <View style={styles.checkoutPill}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>Add a phone to see it here.</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <View key={item.id} style={styles.container}>
              <View style={styles.imageBox}>
                <Image
                  style={styles.mobileImage}
                  source={{ uri: item.image }}
                />
              </View>
              <View style={styles.productInfo}>
                <Text numberOfLines={2} style={styles.name}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.color}>
                  {item.color}
                </Text>
                <Text style={styles.price}>
                  ₹{item.price.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.actions}>
                <Text style={styles.deleteIcon}>♧</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() => handleRemoveFromCart(item.id,//item.quantity
                      )}
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quantitySymbol}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {handleAddToCart(item);}}
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quantitySymbol}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.total}>
          Total ({cartItems.reduce((total, item) => total + item.quantity, 0)}{' '}
          items)
        </Text>
        <View style={styles.continueButton}>
          <Text style={styles.continueText}>Continue to Checkout</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f6f4' },
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#eeeeeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 29, lineHeight: 31, color: '#353532', marginTop: -3 },
  headerTitle: {

    backgroundColor:'red',
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#252523',
  },
  checkoutPill: {
    backgroundColor: '#ebe8e0',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  checkoutText: { fontSize: 11, fontWeight: '700', color: '#33332f' },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 100,
    gap: 11,
  },
  container: {
    minHeight: 108,
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#eeece7',
    shadowColor: '#232320',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2,
  },
  imageBox: {
    width: 67,
    height: 88,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#dfded9',
  },
  mobileImage: { height: '100%', width: '100%', resizeMode: 'cover' },
  productInfo: { flex: 1, paddingHorizontal: 8, paddingTop: 4 },
  name: { fontSize: 12, lineHeight: 15, fontWeight: '700', color: '#252523' },
  color: { fontSize: 10, lineHeight: 14, color: '#777771', marginTop: 2 },
  price: { fontSize: 12, fontWeight: '800', color: '#272725', marginTop: 3 },
  actions: {
    width: 59,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    fontSize: 17,
    color: '#8a8984',
    transform: [{ rotate: '180deg' }],
    marginRight: 2,
    marginTop: -3,
  },
  quantityRow: {
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginBottom: 2,
  },
  quantityButton: {
    width: 21,
    height: 21,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dad7cf',
  },
  quantitySymbol: {
    fontSize: 16,
    lineHeight: 18,
    color: '#46463f',
    fontWeight: '500',
  },
  quantity: { fontSize: 12, color: '#30302d', fontWeight: '700' },
  emptyState: { paddingTop: 90, alignItems: 'center' },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: '#2c2c29' },
  emptyText: { fontSize: 13, color: '#787873', marginTop: 6 },
  footer: {
    minHeight: 74,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderColor: '#e6e4de',
    backgroundColor: '#f6f6f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: { fontSize: 12, fontWeight: '700', color: '#33332f' },
  continueButton: {
    borderRadius: 18,
    backgroundColor: '#ded9ce',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  continueText: { fontSize: 11, fontWeight: '700', color: '#34342f' },
});
