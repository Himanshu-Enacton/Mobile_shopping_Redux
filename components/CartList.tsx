import { theme } from '../assets/Themes';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { CartItem, Item } from './Products';
import { addToCart, removeToCart } from './redux/action';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export default function CartList({ navigation }: { navigation: any }) {
  const cartItems = useSelector(
    (state: { reducer: CartItem[] }) => state.reducer,
  );
  const dispatch = useDispatch();
  const handleAddToCart = (item: Item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (
    id: number, //quantity: number
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

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
                    onPress={() =>
                      handleRemoveFromCart(
                        item.id, //item.quantity
                      )
                    }
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quantitySymbol}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddToCart(item);
                    }}
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
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handlePresentModalPress}
        >
          <Text style={styles.continueText}>Continue to Checkout</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          enableDynamicSizing
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.sheetHandle}
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text style={styles.sheetTitle} accessibilityRole="header">
              Ready to checkout?
            </Text>
            <View style={styles.confirm}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={() => bottomSheetModalRef.current?.dismiss()}
                activeOpacity={0.75}
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, styles.proceedButton]}
                activeOpacity={0.75}
                accessibilityRole="button"
                onPress={()=>{
                  bottomSheetModalRef.current?.dismiss();
                  navigation.navigate('UserDetails');
                }}
              >
                <Text style={styles.proceedText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.screenBackground },
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
    backgroundColor: theme.backButtonBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { ...theme.text29, color: theme.textBackArrow, marginTop: -3 },
  headerTitle: {
    // backgroundColor:'red',
    // position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    textAlign: 'center',
    ...theme.text16Bold,
    fontSize: 25,
    paddingLeft:23,
    color: theme.textPrimary,
  },
  checkoutPill: {
    backgroundColor: theme.checkoutPillBackground,
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  checkoutText: { ...theme.text11Bold, color: theme.textCheckout, },
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
    backgroundColor: theme.cartCardBackground,
    shadowColor: theme.shadowCart,
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
    backgroundColor: theme.cartImageBackground,
  },
  mobileImage: { height: '100%', width: '100%', resizeMode: 'cover' },
  productInfo: { flex: 1, paddingHorizontal: 8, paddingTop: 4 },
  name: { ...theme.text12BoldLine15, color: theme.textPrimary },
  color: { ...theme.text10, color: theme.textCartSecondary, marginTop: 2 },
  price: { ...theme.text12ExtraBold, color: theme.textStrong, marginTop: 3 },
  actions: {
    width: 59,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    ...theme.text17,
    color: theme.iconMuted,
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
    backgroundColor: theme.cartQuantityBackground,
  },
  quantitySymbol: {
    ...theme.text16Medium,

    color: theme.textQuantitySymbol,
  },
  quantity: { ...theme.text12Bold, color: theme.textQuantity },
  emptyState: { paddingTop: 90, alignItems: 'center' },
  emptyTitle: { ...theme.text17Bold, color: theme.textEmptyTitle },
  emptyText: {
    ...theme.text13,
    color: theme.textEmptyDescription,
    marginTop: 6,
  },
  footer: {
    paddingBottom: 25,
    minHeight: 74,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderColor: theme.borderFooter,
    backgroundColor: theme.screenBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: { ...theme.text12Bold, color: theme.textCheckout },
  continueButton: {
    borderRadius: 18,
    backgroundColor: theme.checkoutButtonBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  continueText: { ...theme.text11Bold, color: theme.textCheckoutButton },
  sheetBackground: {
    backgroundColor: theme.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  sheetHandle: { backgroundColor: theme.borderRadio },
  sheetContent: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 30,
  },
  sheetTitle: {
    ...theme.text17Bold,
    color: theme.textPrimary,
  },
  sheetDescription: {
    ...theme.text13,
    color: theme.textSecondary,
    marginTop: 6,
  },
  confirm: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  confirmButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: { backgroundColor: theme.controlBackground },
  cancelText: { ...theme.text13Bold, color: theme.textControl },
  proceedButton: { backgroundColor: theme.actionBackground },
  proceedText: { ...theme.text13Bold, color: theme.white },
});
