import { View, Text, Image } from 'react-native';
import Book from '../Book/Book';
import React from 'react';
const Shelves = ({ name, allBooks, updateOption, getAllBooks }) => {
  const componentState = 'shelves'
  const shelfBooks = allBooks.filter(
    e =>
      e.shelf ===
      `${name.charAt(0).toLowerCase()}${name.slice(1).split(' ').join('')}`,
  );
  const imageDimension = {
    height: 150,
    width: 90,
  };
  return (
    <View key={name} style={{ marginBottom: 18, borderBottomWidth: 0.5, width: '97%', alignSelf: 'center', paddingBottom: 8 }}>
      <View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 23,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 15,
            marginTop: name === 'Currently Reading' ? 2 : 30,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            paddingHorizontal: 10
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {shelfBooks.map(book => {
          return (
            <Book
              componentState={componentState}
              book={book}
              updateOption={updateOption}
              key={book.id}
              imageDimension={imageDimension}
              getAllBooks={getAllBooks}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Shelves;
