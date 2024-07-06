import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import NewsDetails from '../screens/NewsDetails';
import WelcomeScreen from '../screens/WelcomeScreen';
import SeeAllPage from '../screens/SeeAllPage';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigationStrings.WELCOME}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          component={WelcomeScreen}
          name={navigationStrings.WELCOME}
        />
        <Stack.Screen component={Home} name={navigationStrings.HOME} />
        <Stack.Screen
          component={NewsDetails}
          name={navigationStrings.NEWSDETAILS}
        />
        <Stack.Screen component={SeeAllPage} name={navigationStrings.SEEALL} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
