import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';

import Home from '../nestedScreens/Home';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Posts',
          headerTitleStyle: {
            color: '#212121',
            // fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15, marginTop: 5 }}
              activeOpacity={0.7}
              // onPress={logOut}
            >
              <Image source={require('../assets/images/log-out.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen
        options={{
          title: 'Map',
          headerTitleStyle: {
            color: '#212121',
            // fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          // headerLeft: () => {
          //   return (
          //     <>
          //       <TouchableOpacity
          //         style={{ marginLeft: 16 }}
          //         // onPress={() => navigation.navigate('Posts')}
          //         activeOpacity={0.7}
          //       >
          //         <Image source={require('../assets/images/arrow-left.png')} />
          //       </TouchableOpacity>
          //     </>
          //   );
          // },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
}
