import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import db from '../../firebase/config';
import { nanoid } from 'nanoid';

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState('');

  console.log('location', location);

  const { userId, login } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('locationuseEffect', location);
    })();
  }, []);

  const takePhoto = async () => {
    console.log('locationtakePhoto', location);
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const createPost = await db.firestore().collection('posts').add({
        photo,
        title,
        location,
        // location: location?.coords,
        place,
        userId,
        login,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePostId = nanoid();

      await db.storage().ref(`postImage/${uniquePostId}`).put(file);

      const processedPhoto = await db
        .storage()
        .ref('postImage')
        .child(uniquePostId)
        .getDownloadURL();

      return processedPhoto;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const sendData = () => {
    uploadPostToServer();
    if (title.trim() && place.trim()) {
      navigation.navigate('Home');
      setPhoto('');
      setTitle('');
      setPlace('');
    } else {
      Alert.alert('Please fill in the fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          {photo && (
            <View style={styles.containerPhoto}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          )}
          {photo ? (
            <TouchableOpacity onPress={takePhoto} style={styles.snapPhoto}>
              <FontAwesome name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={takePhoto} style={styles.snap}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          )}
        </Camera>
        <Text style={styles.textPhoto}>{!photo ? 'Upload a photo' : 'Edit photo'}</Text>
        <View>
          <TextInput
            style={styles.titleName}
            placeholder={'Name...'}
            value={title}
            onChangeText={setTitle}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <TextInput
            style={styles.titlePlace}
            placeholder={'Terrain...'}
            value={place}
            onChangeText={setPlace}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <View style={{ position: 'absolute', top: 80, left: 14 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendData}>
          <Text style={styles.btnText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 32,
    borderColor: '#E8E8E8',
  },
  snap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
  },
  snapPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  containerPhoto: {
    position: 'absolute',
  },
  photo: {
    height: 240,
    borderRadius: 8,
    width: Dimensions.get('window').width - 32,
  },
  textPhoto: {
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 8,
    // fontFamily: 'Roboto-Regular',
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
  },
  btnSubmit: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    // fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  titleName: {
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    color: '#212121',
    borderBottomColor: '#E8E8E8',
  },
  titlePlace: {
    fontSize: 16,
    lineHeight: 19,
    marginHorizontal: 16,
    paddingTop: 16,
    paddingLeft: 28,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    color: '#212121',
  },
});
