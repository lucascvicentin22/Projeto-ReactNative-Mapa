import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [localizacao, setLocalizacao] = useState(null)

  permissaoGPS = async () => {
    const { granted} = await requestForegroundPermissionsAsync()

    if(granted){
      const posicaoAtual = await getCurrentPositionAsync()
      setLocalizacao(posicaoAtual)
    }
  };

    useEffect(() => {
      permissaoGPS()
    },[]);

  return (
    <View style={styles.container}>
      {
        localizacao && 
        <MapView style={styles.mapa}
        initialRegion = {{
          latitude : localizacao.coords.latitude,
          longitude : localizacao.coords.longitude,
          latitudeDelta : 0.005,
          longitudeDelta : 0.005
        }}
        showsUserLocation={true}
        >
          <Marker
              coordinate={{
                latitude : localizacao.coords.latitude,
                longitude : localizacao.coords.longitude
              }}
              title="Localização Atual"
          />

        </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapa : {
    flex : 1,
    width : '100%'
  }
});
