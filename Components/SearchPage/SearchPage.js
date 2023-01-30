import React from 'react';
import { useEffect, useState } from 'react';
import * as API from './../../API/BooksAPI';
import { Button, Image, ScrollView, Text, TextInput, View } from 'react-native';
import Book from '../Book/Book';
import { useNavigate } from 'react-router-native';

const SearchPage = ({
  getAllBooks,
  allBooks,
  shelves,
}) => {
  const nav = useNavigate();
  const navigate = () => {
    nav('/');
  };
  const imageDimension = {
    height: 190,
    width: 120,
  };
  const [searchValue, setSearchValue] = useState('');
  const updateSearchValue = e => {
    setSearchValue(e.nativeEvent.text);
  };
  const shelvesValue = shelves.map(e => {
    return `${e.charAt(0).toLowerCase()}${e.slice(1).split('-').join('')}`;
  });

  // array of book in the home page each within it's shelf in array
  //the first value from every array set to the value of shelf to use it in the iteration
  let fullBooksArr = [
    [shelvesValue[0], ...allBooks.filter(e => e.shelf === shelvesValue[0])],
    [shelvesValue[1], ...allBooks.filter(e => e.shelf === shelvesValue[1])],
    [shelvesValue[2], ...allBooks.filter(e => e.shelf === shelvesValue[2])],
  ];

  const [searchBooks, setSearchBooks] = useState([]);
  useEffect(() => {
    getAllBooks();
    if (searchValue.length > 0) {
      API.search(searchValue).then(data => {
        if (!data.error) {
          //assigning the retrieved search data to variable to modify it
          let finalData = data;
          for (let book of finalData) {
            book.shelf = 'none';
          }
          for (let i = 0; i < fullBooksArr.length; i++) {
            for (let j = 1; j < fullBooksArr[i].length; j++) {
              for (let y = 0; y < data.length; y++) {
                if (fullBooksArr[i][j].id === finalData[y].id) {
                  finalData[y].shelf = fullBooksArr[i][0];
                }
              }
            }
          }
          setSearchBooks(finalData);
        } else {
          setSearchBooks([]);
        }
      });
    }
  }, [searchValue]);
  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 15,
        }}>
        <View style={{ flex: 0.14, marginTop: 7 }}>
          <Button
            color="dodgerblue"
            style={{ marginBottom: 5, marginTop: 3, paddingvertical: 5 }}
            onPress={() => {
              getAllBooks();
              navigate();
            }}
            title="<"
          />
        </View>
        <View style={{ flex: 0.86, marginLeft: 2, marginRight: 2, marginTop: 4 }}>
          <TextInput
            defaultValue={searchValue}
            onChange={updateSearchValue}
            placeholder="Search by book title"
            style={{
              marginTop: 3,
              borderStyle: 'solid',
              borderWidth: 0.8,
              borderColor: 'dodgerblue',
              padding: 2,
              paddingvertical: 5
            }}
          />
        </View>
      </View>
      <View style={{ marginBottom: 180 }}>
        <ScrollView
          Style={{
            flexGrow: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {searchValue.length > 0 ? (
              searchBooks.length > 0 ? (
                searchBooks.map(book => {
                  return (
                    <View key={book.id} style={{marginTop: 40}}>
                      <Book book={book} imageDimension={imageDimension} getAllBooks={getAllBooks} />
                    </View>
                  );
                })
              ) : (
                <Text>No Book Matched Your Search Input</Text>
              )
            ) : (
              <Text>Search For Books</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchPage;
