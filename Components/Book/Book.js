import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Link, useNavigate} from 'react-router-native';
import Option from './Option';
const Book = ({book, imageDimension, updateOption}) => {
  const nav = useNavigate();
  const urlParams = () => {
    nav(
      {
        pathname: '/book',
      },
      {state: {book}},
    );
  };
  return (
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
                : {uri: book.imageLinks.thumbnail}
            }
          />
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
      </View>
    </TouchableOpacity>
  );
};
export default Book;
