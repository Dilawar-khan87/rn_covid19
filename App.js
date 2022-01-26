import {View, Text, FlatList,TouchableOpacity} from 'react-native';
import React from 'react';

export default function App() {
  const [data, setData] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [confirmedCases, setConfirmedCases] = React.useState(0);
  const [deaths, setDeaths] = React.useState(0);
  const [recovered, setRecovered] = React.useState(0);
  const [lastUpdate, setLastUpdate] = React.useState('');
  const [countryName, setCountryName] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    fetch('https://covid19.mathdro.id/api', {
      method: 'GET',
    })
      .then(res => {
        res
          .json()
          .then(data => {
            console.log(data);
            setLoading(false);
            setData(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    getCountries();
  }, []);
  function getCountries() {
    setLoading(true);
    fetch('https://covid19.mathdro.id/api/countries', {
      method: 'GET',
    })
      .then(res => {
        res
          .json()
          .then(data => {
            console.log(data);
            setLoading(false);
            setCountries(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getCountryData(e) {
    // console.log(country);
    setLoading(true);
    fetch('https://covid19.mathdro.id/api/countries/' + e, {
      method: 'GET',
    })
      .then(res => {
        res
          .json()
          .then(data => {
            console.log(data);
            setCountryName(e);
            setConfirmedCases(data.confirmed.value);
            setRecovered(data.recovered.value);
            setDeaths(data.deaths.value);
            setLastUpdate(data.lastUpdate);  
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View>
      <Text style={{fontSize: 28, textAlign: 'center', fontWeight: '500'}}>
        Covid 19 Tracker
      </Text>
      {/* <View style={{margin: 10,borderRadius:10, backgroundColor: 'lightblue', padding: 20}}>
      <Text style={{fontSize: 28, textAlign: 'center', fontWeight: '500'}}>
        Global Data
      </Text>
        <Text style={{fontSize: 16,marginTop:10}}>
          1.Confirmed Cases:{data.confirmed.value}
        </Text>
        <Text style={{fontSize: 16,marginTop:6}}>
          2.Recovered cases:{data.recovered.value}
        </Text>
        <Text style={{fontSize: 16,marginTop:6}}>3.Total Deaths:{data.deaths.value}</Text>
        <Text style={{fontSize: 16,marginTop:6}}>
          Last Update on:{new Date(data.lastUpdate).toLocaleDateString()}
        </Text>
      </View> */}

      <View style={{margin: 10, backgroundColor: 'lightblue', padding: 20,borderRadius:10}}>
      <Text style={{fontSize: 28, textAlign: 'center', fontWeight: '500'}}>
        Selected Country Data
      </Text>
      <Text style={{fontSize: 16,marginTop:10}}>
          Country:{countryName}
        </Text>
        <Text style={{fontSize: 16,marginTop:6}}>
          1.Confirmed Cases:{confirmedCases}
        </Text>
        <Text style={{fontSize: 16,marginTop:6}}>
          2.Recovered cases:{recovered}
        </Text>
        <Text style={{fontSize: 16,marginTop:6}}>3.Total Deaths:{deaths}</Text>
        <Text style={{fontSize: 16,marginTop:6}}>
          Last Update on:{new Date(lastUpdate).toLocaleDateString()}
        </Text>
      </View>
      
      <FlatList
        data={countries.countries}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'lightblue',borderRadius:10 ,margin: 10, padding: 20}}>
            <TouchableOpacity onPress={() => getCountryData(item.name)}>
              <Text style={{fontSize: 16,fontWeight:'bold'}}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.name}
        refreshing={false}
        onRefresh={() => getCountries()}
      />
    </View>
  );
}
