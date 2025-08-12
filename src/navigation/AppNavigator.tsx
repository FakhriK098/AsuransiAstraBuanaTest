import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/home/HomePage';
import DetailPage from '../pages/detail/DetailPage';
import SearchPage from '../pages/search/SearchPage';
import ComparePage from '../pages/compare/ComparePage';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPage}
          options={{ title: 'Pokemon Detail' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: 'Search Pokemon' }}
        />
        <Stack.Screen
          name="Compare"
          component={ComparePage}
          options={{ title: 'Compare Pokemon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
