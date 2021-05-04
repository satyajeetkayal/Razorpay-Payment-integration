import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';
import {useSelector, useDispatch} from 'react-redux';
import {Card, CardContent, CardMedia} from 'material-bread';
import {EMPTY_CART, REMOVE_FROM_CART} from '../store/actionType';
import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.basket);
  const itemTotal = useSelector(state => state.total);
  const itemAmount = useSelector(state => state.amount);
  const itemTitle = useSelector(state => state.title);
  const itemImage = useSelector(state => state.image);
  const dispatch = useDispatch();

  const removeItem = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerRight: () => (
        <View>
          <CartIcon />
        </View>
      ),
    });
  }, []);

  return (
    <>
      <View>
        {cartItems.length !== 0 ? (
          <View>
            <FlatList
              data={cartItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}, index) => (
                <View style={{top: 0}} key={index}>
                  <Card>
                    <CardMedia
                      image={
                        <Image
                          style={{flex: 1, width: '100%'}}
                          source={{uri: item.image}}
                          resizeMode="contain"
                        />
                      }
                    />
                    <CardContent>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.price}>{`${item.price} ₹`}</Text>
                      <Button mode="contained" onPress={() => removeItem(item)}>
                        Remove from Cart
                      </Button>
                    </CardContent>
                  </Card>
                </View>
              )}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
              }}>
              Your cart is empty!
            </Text>
          </View>
        )}
      </View>
      <>
        {cartItems.length !== 0 && (
          <Animatable.View
            style={{
              backgroundColor: 'white',

              flexDirection: 'row',
              position: 'absolute',
              zIndex: 2,
              bottom: 20,
              width: Dimensions.get('window').width / 1.1,
              height: 50,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              borderWidth: 1,
              elevation: 20,
            }}
            animation="fadeInUp">
            <View style={{flex: 2}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: '700',
                  fontSize: 20,
                }}>{`Total Amount  ${itemTotal} ₹`}</Text>
            </View>
            <Button
              onPress={() => {
                var options = {
                  description: `${itemTitle}`,
                  image: `${itemImage}`,
                  currency: 'INR',
                  key: 'rzp_test_xNmBWr6pU4FjYE',
                  amount: `${itemAmount}`,
                  name: 'Checkout',
                  external: {
                    wallets: ['paytm'],
                  },
                  prefill: {
                    email: 'john@outlook.com',
                    contact: '9780038919',
                    name: 'john Adam',
                  },
                  theme: {color: '#6c5ce7'},
                };
                RazorpayCheckout.open(options)
                  .then(data => {
                    alert(`Success: ${data.razorpay_payment_id}`);
                    emptyCart();
                  })
                  .catch(error => {
                    alert(`Error: ${error.code} | ${error.description}`);
                  });
                RazorpayCheckout.onExternalWalletSelection(data => {
                  alert(`External Wallet Selected: ${data.external_wallet} `);
                });
              }}
              mode="text">
              Checkout
            </Button>
          </Animatable.View>
        )}
        {cartItems.length == 0 && (
          <Animatable.View animation="fadeInDown">
            <View>
              <Text></Text>
            </View>
          </Animatable.View>
        )}
      </>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
