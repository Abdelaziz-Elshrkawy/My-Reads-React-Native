import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Option from './Option';
const Book = ({ book, imageDimension, getAllBooks, componentState }) => {
  const nav = useNavigate();
  const urlParams = () => {
    nav(
      {
        pathname: '/book',
      },
      { state: { book } },
    );
  };
  return (
    <View>
      <View style={{ width: imageDimension.width+2, position: 'relative', top: 0, zIndex: 999, alignSelf: 'center' }}>
        <Option book={book} getAllBooks={getAllBooks} imageDimension={imageDimension} componentState={componentState} />
      </View>
      <TouchableOpacity onPress={urlParams}>
        <View key={book.id}>
          <View>
            <Image
              style={{
                height: imageDimension.height,
                width: imageDimension.width,
                margin: 5,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
              }}
              source={
                !book.imageLinks
                  ? {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/No_sign.svg',
                  }
                  : { uri: book.imageLinks.thumbnail }
              }
            />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            width: imageDimension.width,
            fontSize: 12,
            textAlign: 'center',
            color: 'black',
          }}>
          {book.title.slice(0, 30) + (book.title.length > 30 ? '...' : '')}
        </Text>
      </View>
    </View>
  );
};
export default Book;
