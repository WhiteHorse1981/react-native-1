import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  console.log('route.params.location', route.params.location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: route.params?.location?.coords?.latitude,
          longitude: route.params?.location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params?.location?.coords?.latitude,
            longitude: route.params?.location?.coords?.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
