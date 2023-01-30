import {Button, View, Text, Image, ScrollView} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';
import React from 'react';
import Option from './Option';
const BookDetails = ({getAllBooks}) => {
  const book = useLocation().state.book;
  const imageLink = !book.imageLinks.thumbnail
    ? false
    : {uri: book.imageLinks.thumbnail};
  const nav = useNavigate();
  const navigateHome = () => {
    nav('/');
    getAllBooks();
  };
  const navigateSearch = () => {
    nav('/search');
  };
  const imageDimension = {
    height: 220,
    width: 150,
  };
  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'dodgerblue',
            borderWidth: 1,
            padding: 5,
            margin: 2,
            marginTop: 15,
            marginBottom: 5,
          }}>
          <View
            style={{
              flex: 0.5,
            }}>
            <Button title="Home" onPress={navigateHome} />
          </View>
          <View
            style={{
              flex: 0.5,
              marginLeft: 5,
            }}>
            <Button title="Search" onPress={navigateSearch} />
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <View key={book.id}>
            <View style={{marginTop: 50}}>
              <Image
                style={{
                  alignSelf: 'center',
                  height: imageDimension.height,
                  width: imageDimension.width,
                  margin: 5,
                  borderBottomLeftRadius: 5,
                  borderTopLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                }}
                source={imageLink}
              />
              <View style={{ width: imageDimension.width, position: 'relative', top: 0, zIndex: 999, alignSelf: 'center' }}>
                <Option book={book} getAllBooks={getAllBooks} imageDimension={imageDimension} />
              </View>
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    width: imageDimension.width,
                    textAlign: 'center',
                    marginTop: 5,
                    marginBottom: 20,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingTop: 5,
                  }}>
                  {book.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 18,
                  }}>
                  Authors:
                </Text>
              </View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginBottom: 20,
                  color: 'black',
                  borderTopWidth: 0.5,
                  marginTop: 5,
                  paddingTop: 5,
                }}>
                {book.authors ? [...book.authors].join(', ') : 'No Authors'}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Description:
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
                borderTopWidth: 0.5,
                marginTop: 5,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                }}>
                {book.description.slice(0, 500) +
                  (book.description.length > 500 ? '...' : '')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetails;
