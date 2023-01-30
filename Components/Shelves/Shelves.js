import {View, Text, Image} from 'react-native';
import Book from '../Book/Book';
import React from 'react';
const Shelves = ({name, allBooks, updateOption, updateBooks}) => {
  const shelfBooks = allBooks.filter(
    e =>
      e.shelf ===
      `${name.charAt(0).toLowerCase()}${name.slice(1).split(' ').join('')}`,
  );
  const imageDimension = {
    height: 130,
    width: 90,
  };
  return (
    <View key={name} style={{marginBottom: 18, borderBottomWidth: 0.5, width: '97%', alignSelf: 'center', paddingBottom: 8}}>
      <View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {shelfBooks.map(book => {
          return (
            <Book
              book={book}
              updateOption={updateOption}
              key={book.id}
              imageDimension={imageDimension}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Shelves;
