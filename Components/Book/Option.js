import React, {useState} from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {update} from '../../API/BooksAPI';
const Option = ({book}) => {
  const [shelf, setShelf] = useState('');
  const data = [
    {key: 1, value: 'Currently Reading'},
    {key: 2, value: 'Want To Read'},
    {key: 3, value: 'Read'},
    {key: 4, value: 'None'},
  ];
  const shelfValueOnSelect = shelf
    ? data
        .filter(e => e.key === parseInt(shelf))[0]
        .value.split(' ')
        .join('')
    : book.shelf;
  const finalShelfValueOnSelect = `${shelfValueOnSelect
    .charAt(0)
    .toLowerCase()}${shelfValueOnSelect.slice(1)}`;
  const updateShelf = async value => {
    setShelf(value);
  };
  return (
    <View>
      <SelectList
        data={data}
        dropdownItemStyles={{margin: -2}}
        setSelected={updateShelf}
        defaultOption={{value: book.shelf}}
        search={false}
        onSelect={async () => {
          await update(book, finalShelfValueOnSelect);  
        }}
      />
    </View>
  );
};

export default Option;
