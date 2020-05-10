import React, {useState} from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Body} from 'native-base';
import COLORS from '../utils/colors';
import GenericButton from '../components/GenericButton';
import {SvgUri} from 'react-native-svg';
const {width, height} = Dimensions.get('window');

export default function Details({navigation, route}) {
  const [state, setState] = useState({isLoading: false, weatherDetails: {}});
  const {countryDetails} = route.params;
  console.log(countryDetails, 'navigation');

  function handleFetchWeather() {
    setState({...state, isLoading: true, weatherDetails: {}});
    fetch(
      `http://api.weatherstack.com/current?access_key=${'4f09a4a697f0f852826b112bd08e0752'}&query=${
        countryDetails.name
      }`,
    )
      .then(res => {
        res.json().then(data => {
          setState({...state, isLoading: false, weatherDetails: data.current});
        });
      })
      .catch(e => {
        setState({...state, isLoading: false,})
        alert(e.message);
      });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardItem header>
          <Text>{countryDetails.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <View style={styles.flagView}>
              <SvgUri width="100%" height="100%" uri={countryDetails.flag} />
            </View>
            <View style={styles.infoWrapper}>
              <Text>Capital: {countryDetails.capital} </Text>
              <Text>Population: {countryDetails.population} </Text>
              <Text>
                Latlng:
                {countryDetails.latlng.map((lat, index) => (
                  <Text>
                    {lat}
                    {index == 0 && <Text>,</Text>}
                  </Text>
                ))}
              </Text>
              {Object.keys(state.weatherDetails).length > 0 && (
                <View>
                  <Text>
                    Weather : {state.weatherDetails.weather_descriptions}
                  </Text>
                  <Text>Pressure : {state.weatherDetails.pressure}</Text>
                  <Text>Temprature : {state.weatherDetails.temperature}</Text>
                </View>
              )}
            </View>
            <View style={styles.buttonWrapper}>
              <GenericButton
                isLoading={state.isLoading}
                onPress={handleFetchWeather}
                text="Capital Weather"
              />
            </View>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.BLACK,
    padding: 20,
  },
  card: {
    width: '100%',
  },
  flagView: {
    width: width * 0.3,
    height: width * 0.3,
  },
  countryFlag: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoWrapper: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
