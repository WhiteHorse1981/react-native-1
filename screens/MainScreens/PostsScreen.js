import React from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import Home from '../nestedScreens/Home';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import { Feather, AntDesign } from '@expo/vector-icons';
import { authLogOutUser } from '../../redux/auth/authOperations';

const NestedScreen = createStackNavigator();

export default function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authLogOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Posts',
          headerTitleStyle: {
            color: '#212121',
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
            background: '#FFFFFF',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Comments',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Location',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
}
