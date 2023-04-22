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
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { authLoginUser } from '../../redux/auth/authOperations';

initialState = {
  email: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authLoginUser(state));
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/PhotoBCG.jpg')}>
          <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? 0 : 0 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.containerForm}>
                <Text style={styles.formTitle}>Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
                  <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.text}>
                    Don't have an account? <Text style={styles.textRegister}>Register</Text>
                  </Text>
                </TouchableOpacity>
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
    paddingTop: 260,
  },
  containerForm: {
    alignItems: 'center',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 0,
    paddingBottom: 20,
    width: 375,
    height: 420,
  },
  photo: {
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    marginTop: -60,
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
    // fontFamily: 'Roboto-Regular',
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
    // fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    position: 'relative',
    borderColor: '#E8E8E8',
  },
  inputPasswordShow: {
    position: 'absolute',
    right: 32,
    top: 210,
    color: '#1B4371',
    // fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  button: {
    width: 343,
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    // fontFamily: 'Roboto-Regular',
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
    fontWeight: '400',
    fontSize: 16,
    // fontFamily: 'Roboto-Regular',
    lineHeight: 19,
  },
  textRegister: {
    color: 'red',
    fontWeight: '600',
  },
  formTitle: {
    // fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    marginBottom: 32,
  },
});

export default LoginScreen;
