import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import db from '../../firebase/config';
import { Feather } from '@expo/vector-icons';

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const { email, photo, login } = useSelector(state => state.auth);
  console.log('route.params', route.params);

  const getAllPosts = async () => {
    try {
      await db
        .firestore()
        .collection('posts')
        .onSnapshot(data => setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View style={{ backgroundColor: 'black', marginTop: 32 }}>
              <Image source={{ uri: item.photo }} style={styles.img} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.wraper}>
              <TouchableOpacity
                style={styles.comments}
                onPress={() =>
                  navigation.navigate('Comments', { postId: item.id, photo: item.photo })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('Map', { location: item.location })}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.place}> {item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  wraper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 16,
    marginTop: 10,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  commentsCount: {
    marginLeft: 8,
    // fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  place: {
    // fontFamily: 'Roboto-Regular',
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
    color: '#212121',
  },
});
