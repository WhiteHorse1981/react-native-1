import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PostsScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}
        >
          <Image style={styles.iconLogOut} source={require('../assets/images/log-out.png')} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Posts</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text>PostsScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  header: {
    position: 'relative',
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: '#B3B3B3',
    paddingBottom: 10,
  },
  btnLogOut: {
    position: 'absolute',
    top: 35,
    right: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default PostsScreen;
