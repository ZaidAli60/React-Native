import {View, Text, Button, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About from '../Screen/frontend/About';
import Contact from '../Screen/frontend/Contact';
import Home from '../Screen/frontend/home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Carts from '../Screen/frontend/Carts';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import Login from '../Screen/auth/login/Login';
import Register from '../Screen/auth/register/Register';
import {useAuthContext} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          tabBarLabel: 'About',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: 'Contact',
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <MaterialIconsIcon name="contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carts"
        component={Carts}
        
        options={{
          tabBarLabel: 'Contact',
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            
            <FontAwesome5Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  const {isAuthenticated} = useAuthContext();
  console.log(isAuthenticated)
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <MyTabs />
      )}
    </NavigationContainer>
    //  <Stack.Navigator>
    //   <Stack.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       headerTitle: () => <LogoImage />,
    //       headerRight: () => (
    //         <Button
    //           onPress={() => alert('This is a button!')}
    //           title="Login"
    //           // color="#fff"
    //         />
    //       ),
    //     }}
    //   />
    //   <Stack.Screen name="About" component={About} />
    //   <Stack.Screen name="Contact" component={Contact} />
    //   </Stack.Navigator>
  );
}
