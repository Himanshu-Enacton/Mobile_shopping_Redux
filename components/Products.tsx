import { theme } from '../assets/Themes';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToCart, removeToCart } from './redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Feather } from '@react-native-vector-icons/feather/static';

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
  { id: '75000-plus', label: '₹75,000 +', min: 75000, max: null },
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

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [openPopup, setOpenPopup] = useState<'sort' | 'price' | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRangeId>('any');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activePriceRange = priceRanges.find(
    range => range.id === selectedPriceRange,
  );
  const activeSortRange = sortOptions.find(range => range.id === selectedSort);
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredProducts = products.filter(
    item =>
      activePriceRange !== undefined &&
      item.price >= activePriceRange.min &&
      (activePriceRange.max === null || item.price < activePriceRange.max) &&
      item.name.toLocaleLowerCase().includes(normalizedSearchQuery),
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
    openPopup === 'sort'
      ? sortOptions
      : openPopup === 'price'
      ? priceRanges
      : [];
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
          <Text style={styles.filterText}>
            {selectedSort === 'recommended' ? 'Sort' : activeSortRange?.label}
          </Text>
          <Feather name="chevron-down" size={14} color={theme.textControl} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.75}
          onPress={() => setOpenPopup('price')}
        >
          <Text style={styles.filterText}>
            {selectedPriceRange === 'any' ? 'Price' : activePriceRange?.label}
          </Text>
          <Feather name="chevron-down" size={14} color={theme.textControl} />
        </TouchableOpacity>
        {isSearchVisible ? (
          <View style={styles.searchInputRow}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              placeholderTextColor={theme.textPlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              textAlignVertical="center"
              accessibilityLabel="Search products by name"
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <Feather name="x" size={18} color={theme.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        <TouchableOpacity
          style={[
            styles.searchButton,
            isSearchVisible && styles.searchButtonInline,
          ]}
          activeOpacity={0.75}
          onPress={() => {
            setIsSearchVisible(current => !current);
            if (isSearchVisible) {
              setSearchQuery('');
            }
          }}
          accessibilityRole="button"
          accessibilityLabel={
            isSearchVisible ? 'Close search' : 'Search products'
          }
        >
          <Feather name="search" size={20} color={theme.textStrong} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {visibleProducts.length === 0 ? (
          <Text style={styles.emptyMessage}>
            {normalizedSearchQuery
              ? `No products found for "${searchQuery.trim()}".`
              : 'No products match this price range.'}
          </Text>
        ) : null}
        {visibleProducts.map(item => {
          const isFavorite = favoriteIds.includes(item.id);
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
                <TouchableOpacity
                  style={styles.heart}
                  activeOpacity={0.7}
                  onPress={() =>
                    setFavoriteIds(prev =>
                      prev.includes(item.id)
                        ? prev.filter(id => id !== item.id)
                        : [...prev, item.id],
                    )
                  }
                >
                  {isFavorite ? (
                    <Feather name="heart" size={18} color={theme.favorite} />
                  ) : (
                    <Feather name="heart" size={18} color={theme.textStrong} />
                  )}
                </TouchableOpacity>
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
                      <Feather
                        name="minus"
                        size={16}
                        color={theme.textStrong}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      {matchedCartItem.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      style={styles.quantityButton}
                      activeOpacity={0.8}
                    >
                      <Feather name="plus" size={16} color={theme.textStrong} />
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
        presentationStyle="pageSheet"
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
                <Feather name="x" size={20} color={theme.textMuted} />
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
  page: { backgroundColor: theme.screenBackground, paddingBottom: 20 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 15,
    gap: 8,
  },
  searchInputRow: {
    flex: 1,
    minWidth: 0,
    height: 36,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.borderInput,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    paddingVertical: 0,
    color: theme.textControl,
    ...theme.text12,
  },
  clearSearchButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    height: 36,
    paddingHorizontal: 11,
    borderRadius: 18,
    backgroundColor: theme.controlBackground,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  filterText: { ...theme.text11Semibold, color: theme.textControl },
  emptyMessage: {
    width: '100%',
    paddingVertical: 28,
    textAlign: 'center',
    color: theme.textMuted,
    ...theme.text14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.modalBackdrop,
  },
  modalContent: {
    backgroundColor: theme.white,
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
  modalTitle: { ...theme.text17Bold, color: theme.textPrimary },
  optionRow: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.controlBackground,
  },
  optionText: { ...theme.text14, color: theme.textControl },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.borderRadio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: theme.textStrong },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.textStrong,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.controlBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  searchButtonInline: { marginLeft: 0 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 10,
  },
  card: {
    width: '48.6%',
    backgroundColor: theme.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: theme.shadowProduct,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  imageWrap: {
    height: 174,
    backgroundColor: theme.productImageBackground,
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
    backgroundColor: theme.favoriteButtonBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 11 },
  name: {
    ...theme.text13BoldLine17,

    color: theme.textPrimary,
    minHeight: 34,
  },
  color: { ...theme.text11, color: theme.textMuted, marginTop: 2 },
  price: { ...theme.text13Bold, color: theme.textPrice, marginTop: 5 },
  cartButton: {
    backgroundColor: theme.textStrong,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    marginTop: 10,
  },
  cartButtonText: { color: theme.white, ...theme.text11Bold },
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
    backgroundColor: theme.controlBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: 14,
    textAlign: 'center',
    ...theme.text12Bold,
  },
});
