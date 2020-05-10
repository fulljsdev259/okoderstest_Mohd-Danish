import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
} from 'native-base';
import COLORS from '../utils/colors';
import GenericButton from '../components/GenericButton';

export default function Homepage({navigation}) {
  const [state, setState] = useState({
    countryName: '',
    countryDetails: [],
    isLoading: false,
  });

  function handleChange(countryName) {
    setState({...state, countryName});
  }

  function handleFecthDetails() {
    setState({...state, isLoading: true});
    fetch(`https://restcountries.eu/rest/v2/name/${state.countryName}`).then(
      res => {
        res.json().then(data => {          
          if(data.status === 404){
            alert(data.message)
            setState({...state, isLoading: false});
          }else{
            setState({...state, isLoading: false, countryName: ''});
            navigation.navigate('Details', {countryDetails: data[0]});
          }
        });
      },
    ).catch(e=>{
      alert(e.message)
      setState({...state, isLoading: false,})
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Form>
          <Item>
            <Input
              onChangeText={handleChange}
              value={state.countryName}
              style={styles.inputField}
              placeholder="Enter country"
            />
          </Item>
        </Form>
        <View style={styles.buttonWrapper}>
          <GenericButton
            disabled={state.countryName === '' ? true : false}
            isLoading={state.isLoading}
            onPress={handleFecthDetails}
            text="Submit"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '90%',
  },
  buttonWrapper: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
  },
  inputField: {
    color: COLORS.BLACK,
  },
  button: {
    backgroundColor: COLORS.WHITE,
  },
});
