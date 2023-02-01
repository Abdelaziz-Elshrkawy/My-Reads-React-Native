import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {getAll, update} from '../API/BooksAPI';
import ShelvesContainer from './Shelves/ShelvesContainer';
import SearchPage from './SearchPage/SearchPage';
import BookDetails from './Book/BookDetails';
/* import BookDetails from './Book/BookDetails'; */

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const shelves = ['currently-Reading', 'want-To-Read', 'read'];

  const getAllBooks = async () => {
    await getAll().then(data => {
      setAllBooks(data);
    });
  };
  const pageShelves = shelves.map(
    e => `${e.charAt(0).toUpperCase()}${e.slice(1).split('-').join(' ')}`,
  );

  return (
    <SafeAreaView style={{marginTop: 10}}>
      <NativeRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ShelvesContainer
                getAllBooks={getAllBooks}
                pageShelves={pageShelves}
                allBooks={allBooks}
              />
            }
          />
          <Route
            exact
            path="/search"
            element={
              <SearchPage
                getAllBooks={getAllBooks}
                shelves={shelves}
                allBooks={allBooks}
              />
            }
          />
          <Route
            exact
            path="/book"
            element={<BookDetails getAllBooks={getAllBooks} />}
          />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
};

export default App;
