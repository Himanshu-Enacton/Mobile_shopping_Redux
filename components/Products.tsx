import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToCart, removeToCart } from './redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

type SortOption =
  | 'recommended'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z';
type PriceRangeId =
  | 'any'
  | 'under-30000'
  | '30000-49999'
  | '50000-74999'
  | '75000-plus';

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low-high', label: 'Price: low to high' },
  { id: 'price-high-low', label: 'Price: high to low' },
  { id: 'name-a-z', label: 'Name: A to Z' },
];

const priceRanges: {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number | null;
}[] = [
  { id: 'any', label: 'Any price', min: 0, max: null },
  { id: 'under-30000', label: 'Under ₹30,000', min: 0, max: 30000 },
  { id: '30000-49999', label: '₹30,000–₹49,999', min: 30000, max: 50000 },
  { id: '50000-74999', label: '₹50,000–₹74,999', min: 50000, max: 75000 },
  { id: '75000-plus', label: '₹75,000 and above', min: 75000, max: null },
];

export type Item = {
  id: number;
  name: string;
  color: string;
  price: number;
  image: string;
};

export type CartItem = Item & {
  quantity: number;
};

export default function Products() {

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      color: 'Natural Titanium',
      price: 29999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctJlMR1cUjvxaqoPK_iHabdoOF3tOnCYtsM1KbjnlTd14IjuMQLdRwFon&s=10',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      color: 'Onyx Black',
      price: 27999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaaepCBHsEk02j6cgSCXiQF45pjk67DVdLRUE-mYpW0fniv8SkI-2QK95_&s=10',
    },
    {
      id: 3,
      name: 'Google Pixel 8',
      color: 'Obsidian',
      price: 26999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHHbMRV9AxXAgG441ydIKVpoEE3uu-0-E06oN8QNY8FiKz0468ipJ0sng&s=10',
    },
    {
      id: 4,
      name: 'Samsung S25 Ultra',
      color: 'Butterfly White',
      price: 127999,
      image:
        'https://images.samsung.com/in/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-features-kv.jpg?imbypass=true',
    },
    {
      id: 5,
      name: 'iPhone 16',
      color: 'Ultramarine',
      price: 74999,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    },
    {
      id: 6,
      name: 'OnePlus 13',
      color: 'Midnight Ocean',
      price: 69999,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    },
    {
      id: 7,
      name: 'Nothing Phone 2',
      color: 'Dark Grey',
      price: 44999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNhUkaLClCu9MwwZRTXn8dGc4Pt-GgxKNw2ZaTsHY-g&s=10',
    },
    {
      id: 8,
      name: 'Xiaomi 14',
      color: 'Jade Green',
      price: 49999,
      image:
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800',
    },
    {
      id: 9,
      name: 'Motorola Edge 50',
      color: 'Peach Fuzz',
      price: 31999,
      image:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800',
    },
    {
      id: 10,
      name: 'Vivo X100',
      color: 'Asteroid Black',
      price: 63999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6Ekyp9jLjWMwOalnquLkO7sbUyn7crB0Bfnq2-pODg&s=10',
    },
  ];
  
  const cartItems = useSelector(
    (state: { reducer: CartItem[] }) => state.reducer,
  );
  const dispatch = useDispatch();
  const handleAddToCart = (item: Item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeToCart(id));
  };

  const [openPopup, setOpenPopup] = useState<'sort' | 'price' | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRangeId>('any');

  const activePriceRange = priceRanges.find(
    range => range.id === selectedPriceRange,
  );
  const filteredProducts = products.filter(
    item =>
      activePriceRange !== undefined &&
      item.price >= activePriceRange.min &&
      (activePriceRange.max === null || item.price < activePriceRange.max),
  );
  const visibleProducts = [...filteredProducts].sort((first, second) => {
    switch (selectedSort) {
      case 'price-low-high':
        return first.price - second.price;
      case 'price-high-low':
        return second.price - first.price;
      case 'name-a-z':
        return first.name.localeCompare(second.name);
      case 'recommended':
        return first.id - second.id;
    }
  });
  const popupOptions =
    openPopup === 'sort' ? sortOptions : openPopup === 'price' ? priceRanges : [];
  const selectedOption =
    openPopup === 'sort' ? selectedSort : selectedPriceRange;
  const handleSelectOption = (optionId: SortOption | PriceRangeId) => {
    if (openPopup === 'sort') {
      const option = sortOptions.find(({ id }) => id === optionId);
      if (option) {
        setSelectedSort(option.id);
      }
    } else if (openPopup === 'price') {
      const option = priceRanges.find(({ id }) => id === optionId);
      if (option) {
        setSelectedPriceRange(option.id);
      }
    }
    setOpenPopup(null);
  };

  return (
    <View style={styles.page}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.75}
          onPress={() => setOpenPopup('sort')}
        >
          <Text style={styles.filterText}>Sort</Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.75}
          onPress={() => setOpenPopup('price')}
        >
          <Text style={styles.filterText}>
            {selectedPriceRange === 'any'
              ? 'Price'
              : activePriceRange?.label}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slidersButton} activeOpacity={0.75}>
          <View style={styles.searchIcon}>
                      <View style={styles.searchHandel} />
                    </View>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {visibleProducts.length === 0 ? (
          <Text style={styles.emptyMessage}>
            No products match this price range.
          </Text>
        ) : null}
        {visibleProducts.map(item => {
          const matchedCartItem = cartItems.find(
            cartItem => cartItem.id === item.id,
          );
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.imageWrap}>
                <Image
                  style={styles.mobileImage}
                  source={{ uri: item.image }}
                />
                <TouchableOpacity style={styles.heart} activeOpacity={0.7}>
                  <Text style={styles.heartText}>♡</Text>
                </TouchableOpacity>
                {item.id === 1 || item.id === 5 ? (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.details}>
                <Text numberOfLines={2} style={styles.name}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.color}>
                  {item.color}
                </Text>
                <Text style={styles.price}>
                  ₹{item.price.toLocaleString('en-IN')}
                </Text>
                {matchedCartItem ? (
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      onPress={() => handleRemoveFromCart(item.id)}
                      style={styles.quantityButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.quantitySymbol}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      {matchedCartItem.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      style={styles.quantityButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.quantitySymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={styles.cartButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cartButtonText}>Add to cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <Modal
        visible={openPopup !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setOpenPopup(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setOpenPopup(null)}
            accessibilityRole="button"
            accessibilityLabel="Close options"
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {openPopup === 'sort' ? 'Sort by' : 'Filter by price'}
              </Text>
              <TouchableOpacity
                onPress={() => setOpenPopup(null)}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel="Close options"
              >
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            {popupOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionRow}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityState={{ selected: option.id === selectedOption }}
                onPress={() => handleSelectOption(option.id)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    option.id === selectedOption && styles.radioOuterSelected,
                  ]}
                >
                  {option.id === selectedOption ? (
                    <View style={styles.radioInner} />
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#f6f6f4', paddingBottom: 20 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 15,
    gap: 8,
  },
  searchIcon: {
    width: 18,
    height: 16,
    marginTop: 5,
    borderWidth: 1.8,
    borderColor: '#272725',
    borderRadius: 3,
    alignItems: 'center',
  },
  searchHandle: {
    position: 'absolute',
    width: 9,
    height: 7,
    top: -7,
    borderWidth: 1.8,
    borderColor: '#272725',
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  filterButton: {
    height: 36,
    paddingHorizontal: 11,
    borderRadius: 18,
    backgroundColor: '#ecece9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  filterText: { fontSize: 11, fontWeight: '600', color: '#282827' },
  chevron: { fontSize: 15, color: '#282827', marginTop: -7 },
  emptyMessage: {
    width: '100%',
    paddingVertical: 28,
    textAlign: 'center',
    color: '#777773',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#252523' },
  closeButton: { fontSize: 27, lineHeight: 30, color: '#777773' },
  optionRow: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ecece9',
  },
  optionText: { fontSize: 14, color: '#282827' },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: '#272725' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#272725',
  },
  slidersButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ecece9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  sliders: { fontSize: 19, color: '#282827', transform: [{ rotate: '90deg' }] },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 10,
  },
  card: {
    width: '48.6%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1d1d1b',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  imageWrap: {
    height: 174,
    backgroundColor: '#ecebe7',
    position: 'relative',
    justifyContent: 'center',
  },
  mobileImage: { height: '100%', width: '100%', resizeMode: 'cover' },
  heart: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: { fontSize: 21, lineHeight: 23, color: '#272725' },
  newBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: '#f7f7f4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9,
  },
  newBadgeText: { fontSize: 9, fontWeight: '700', color: '#343432' },
  details: { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 11 },
  name: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    color: '#252523',
    minHeight: 34,
  },
  color: { fontSize: 11, lineHeight: 15, color: '#777773', marginTop: 2 },
  price: { fontSize: 13, fontWeight: '700', color: '#242422', marginTop: 5 },
  cartButton: {
    backgroundColor: '#272725',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    marginTop: 10,
  },
  cartButtonText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  quantityRow: {
    height: 35,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#ecece9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantitySymbol: { fontSize: 18, lineHeight: 21, color: '#272725' },
  quantity: { minWidth: 14, textAlign: 'center', fontSize: 12, fontWeight: '700' },
});
