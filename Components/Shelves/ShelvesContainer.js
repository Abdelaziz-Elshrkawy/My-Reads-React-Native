import React, {useCallback, useEffect} from 'react';
import {View, Text, Button, ScrollView, Linking} from 'react-native';
import {useNavigate} from 'react-router-native';
import Shelves from './Shelves';

const ShelvesContainer = ({
  updateOption,
  allBooks,
  pageShelves,
  getAllBooks,
}) => {
  const nav = useNavigate();
  const navigate = () => {
    nav('/search');
  };
  useEffect(() => {
    getAllBooks();
  },[]);
  const openGitHub = useCallback(async () => {
    await Linking.openURL('https://github.com/Abdelaziz-Elshrkawy/My-Reads-React-Native')
  })
  return (
    <View style={{alignItems: 'center', marginBottom: 300, marginTop: 20}}>
      <View
        style={{
          height: 45,
          marginTop: 1,
          marginBottom: 15,
          backgroundColor: '#2e7c31',
          width: '100%',
        }}>
        <Text
          style={{
            marginTop: 3,
            alignSelf: 'center',
            fontSize: 28,
            fontWeight: 'bold',
            color: '#000',
          }}>
          My Reads
        </Text>
      </View>
      <View style={{position: 'absolute', left: 5, top: 5}}>
        <Button title='GitHub Link' color={'#22272e'} onPress={openGitHub} />
        </View>
      <View style={{ alignSelf: 'center', width: '100%', marginBottom: -110}}>
         <ScrollView style={{
        flexGrow: 1,
      }}>
        {pageShelves.map(e => {
          return (
            <Shelves
              updateOption={updateOption}
              allBooks={allBooks}
              getAllBooks={getAllBooks}
              key={e}
              name={e}
            />
          );
        })}
      </ScrollView>
        </View>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: '20%',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <Button title="Search" onPress={navigate} color="dodgerblue" />
      </View>
    </View>
  );
};

export default ShelvesContainer;


