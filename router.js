import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import PostsScreen from './MainScreen/PostsScreen';
import CreatePostsScreen from './MainScreen/CreatePostsScreen';
import ProfileScreen from './MainScreen/ProfileScreen';

// icons import
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveBackgroundColor: '#011f3b',
        tabBarActiveBackgroundColor: '#032845',
      }}
    >
      <MainTab.Screen
        options={{
          tabBarLabel: 'Posts',
          headerShown: false,
          tabBarShowLabel: false,
          showIcon: true,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={focused ? 28 : 24}
              color={focused ? '#FF6C00' : '#4D4D4D'}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarLabel: 'CreatePosts',
          headerTitleStyle: {
            color: '#212121',
            // fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add" size={focused ? 32 : 24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  // onPress={() => navigation.navigate('Posts')}
                  activeOpacity={0.7}
                >
                  <Image source={require('./assets/images/arrow-left.png')} />
                </TouchableOpacity>
              </>
            );
          },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={focused ? 28 : 24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
