import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
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
  ScrollView,
} from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { authRegisterUser } from '../../redux/auth/authOperations';

initialState = {
  login: '',
  email: '',
  password: '',
  photo: '',
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const photo = await camera.takePictureAsync();
    setState(prev => ({ ...prev, photo: photo.uri }));
  };

  const handleSubmit = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authRegisterUser(state));
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/PhotoBCG.jpg')}>
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.form,
                  marginBottom: isShowKeyBoard ? 0 : 120,
                },
                android: {
                  ...styles.form,
                },
              }),
            }}
          >
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} ref={setCamera} type={CameraType.front}>
                {state.photo && (
                  <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: state.photo }} style={styles.photo} />
                  </View>
                )}
              </Camera>
            </View>
            {state.photo ? (
              <TouchableOpacity
                onPress={() => {
                  setState(prev => ({ ...prev, photo: '' }));
                }}
                style={{
                  position: 'absolute',
                  bottom: 510,
                  right: 136,
                  width: 24,
                  height: 24,
                  backgroundColor: '#ffffff',
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AntDesign style={styles.photoAdd} name="close" size={20} color="#BDBDBD" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 510,
                  right: 136,
                }}
                onPress={takePhoto}
              >
                <AntDesign style={styles.photoAdd} name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            )}

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.containerForm}>
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
                  <Text style={styles.buttonTitle}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
                  <Text style={styles.text}>
                    Already have an account? <Text style={styles.textLogin}>Login</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </ScrollView>
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
    paddingBottom: 20,
    width: 375,
    height: 575,
  },
  cameraContainer: {
    position: 'absolute',
    top: -90,
    left: '35%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    overflow: 'hidden',
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: 'absolute',
  },
  camera: {
    width: 120,
    height: 120,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  photoAdd: {
    position: 'absolute',
    right: -20,
    bottom: 45,
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
    top: 354,
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
  textLogin: {
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

export default RegistrationScreen;
