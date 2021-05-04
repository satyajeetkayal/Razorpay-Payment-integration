import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import CartScreen from './screens/CartScreen';
import 'react-native-gesture-handler';
import {BreadProvider} from 'material-bread';
import {Provider} from 'react-redux';
import store from './store/index';

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BreadProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </BreadProvider>
      </Provider>
    );
  }
}
