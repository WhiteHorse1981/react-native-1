import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import PostsScreen from './HomeScreen/PostsScreen';
import CreatePostsScreen from './HomeScreen/CreatePostsScreen';
import ProfileScreen from './HomeScreen/ProfileScreen';

const Stack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

// const useRoute = isAuth => {
//   if (!isAuth) {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Register"
//           component={RegistrationScreen}
//         />
//         <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
//       </Stack.Navigator>
//     );
//   }
//   return (
//     <HomeTab.Navigator>
//       <HomeTab.Screen name="Posts" component={PostsScreen} />
//       <HomeTab.Screen name="CreatePosts" component={CreatePostsScreen} />
//       <HomeTab.Screen name="Profile" component={ProfileScreen} />
//     </HomeTab.Navigator>
//   );
// };

function Home() {
  // const icon = this.props.active
  //   ? require('./assets/images/activeAddPost.png')
  //   : require('./assets/images/addPost.png');

  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        options={{
          tabBarLabel: 'Posts',
          headerShown: false,
          tabBarShowLabel: false,
          showIcon: true,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="appstore-o" size={24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarLabel: 'CreatePosts',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add" size={24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarColor: '#B34EE9',
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTab.Navigator>
  );
}

export default function App() {
  // const routing = useRoute(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
