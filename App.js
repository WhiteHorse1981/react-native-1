import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState } from 'react';
// import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('./assets/images/PhotoBCG.jpg')}>
          <RegistrationScreen />
          {/* <LoginScreen /> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
