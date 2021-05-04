import React, {useLayoutEffect} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CartIcon from './CartIcon';
import {products} from '../ProductData';
import {Card, CardContent, CardActions, CardMedia} from 'material-bread';
import {useDispatch} from 'react-redux';
import {ADD_TO_CART} from '../store/actionType';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const addItem = item => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerTitleAlign: 'center',

      headerRight: () => (
        <View>
          <CartIcon />
        </View>
      ),
    });
  }, []);

  return (
    <View>
      {/* <Button
          title="Pay"
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_xNmBWr6pU4FjYE',
              amount: '5000',
              name: 'Acme Corp',
              external: {
                wallets: ['paytm'],
              },

              prefill: {
                email: 'satyajeetkayal@gamil.com',
                contact: '8058234114',
                name: 'satyajeet',
              },
              theme: {color: '#53a20e'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
            RazorpayCheckout.onExternalWalletSelection(data => {
              alert(`External Wallet Selected: ${data.external_wallet} `);
            });
          }}></Button> */}
      <FlatList
        style={{top: 10}}
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, index) => (
          <View key={index}>
            <Card>
              <CardActions rightActionItems={[{name: 'share'}]}></CardActions>

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
                <Button title="Add to cart" onPress={() => addItem(item)} />
              </CardContent>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default MainScreen;

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
