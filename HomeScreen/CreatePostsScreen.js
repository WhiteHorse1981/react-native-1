import { Text, View, StyleSheet } from 'react-native';

const CreatePostsScreen = () => {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>CreatePosts</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text>CreatePostsScreen</Text>
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
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: '#B3B3B3',
    paddingBottom: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default CreatePostsScreen;
