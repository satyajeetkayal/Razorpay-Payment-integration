import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CartIcon = () => {
  const cartItems = useSelector(state => state.basket);
  const navigation = useNavigation();
  return (
    <View>
      <Text>{cartItems.length}</Text>
      <Icon name="cart" size={30} onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({});
