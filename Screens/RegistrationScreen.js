import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

initialState = {
  login: '',
  email: '',
  password: '',
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const keyBoardHideBtn = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../assets/images/PhotoBCG.jpg')}>
          <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? 0 : 0 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.containerForm}>
                <View style={styles.photo}>
                  <Image style={styles.photoAdd} source={require('../assets/images/add.png')} />
                </View>
                <Text style={styles.formTitle}>Registration</Text>
                <TextInput
                  onFocus={() => setIsShowKeyBoard(true)}
                  style={styles.input}
                  value={state.login}
                  placeholder="Login"
                  onChangeText={value => setState(prevState => ({ ...prevState, login: value }))}
                />
                <TextInput
                  onFocus={() => setIsShowKeyBoard(true)}
                  style={styles.input}
                  value={state.email}
                  placeholder="E-mail address"
                  onChangeText={value => setState(prevState => ({ ...prevState, email: value }))}
                />
                <TextInput
                  onFocus={() => setIsShowKeyBoard(true)}
                  style={styles.inputPassword}
                  value={state.password}
                  secureTextEntry={visiblePassword ? false : true}
                  placeholder="Password"
                  onChangeText={value => setState(prevState => ({ ...prevState, password: value }))}
                />
                <Text
                  style={styles.inputPasswordShow}
                  onPress={() => setVisiblePassword(!visiblePassword)}
                >
                  {visiblePassword ? 'Hide' : 'Show'}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={keyBoardHideBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTitle}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account? To come in</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  containerForm: {
    alignItems: 'center',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 20,
    width: 375,
  },
  photo: {
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    marginTop: -60,
    position: 'relative',
  },
  photoAdd: {
    position: 'absolute',
    right: -12,
    bottom: 15,
  },
  input: {
    height: 50,
    width: 343,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    borderColor: '#E8E8E8',
  },
  inputPassword: {
    height: 50,
    width: 343,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    position: 'relative',
    borderColor: '#E8E8E8',
  },
  inputPasswordShow: {
    position: 'absolute',
    right: 32,
    top: 354,
    color: '#1B4371',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
  },
  button: {
    width: 343,
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 43,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: '#FF6C00',
        color: '#fff',
      },
      android: {
        backgroundColor: '#FF6C00',
        color: '#fff',
      },
    }),
  },
  buttonTitle: {
    color: '#fff',
  },
  text: {
    marginTop: 16,
    color: '#1B4371',
    fontWeight: 400,
    fontSize: 16,
    fontFamily: 'Roboto',
    lineHeight: 19,
  },
  formTitle: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    marginBottom: 32,
  },
});

export default RegistrationScreen;
