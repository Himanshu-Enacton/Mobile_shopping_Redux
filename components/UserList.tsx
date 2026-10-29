import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from './redux/action';
import { getUserList } from './redux/action';
import type rootReducer from './redux/rootReducer';

type RootState = ReturnType<typeof rootReducer>;

export default function UserList({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserList());
    }, [dispatch]),
  );

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={styles.backArrow}>‹</Text></TouchableOpacity>
      <Text style={styles.title}>Users</Text>
      {loading ? (
        <ActivityIndicator color="#292927" style={styles.loading} />
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={users}
        keyExtractor={user => String(user.id)}
        renderItem={renderUser}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.empty}>No users found.</Text>
          ) : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f4',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  title: {
    color: '#1e1e1c',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  loading: {
    marginVertical: 16,
  },
  error: {
    color: '#b42318',
    fontSize: 14,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 12,
  },
  avatar: {
    backgroundColor: '#e8e8e5',
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#1e1e1c',
    fontSize: 15,
    fontWeight: '700',
  },
  email: {
    color: '#757570',
    fontSize: 12,
    marginTop: 4,
  },
  empty: {
    color: '#757570',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },backArrow: { fontSize: 29, lineHeight: 31, color: '#353532', marginTop: -3 },

});
