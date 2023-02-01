import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { update } from '../../API/BooksAPI';
const Option = ({ book, getAllBooks, imageDimension, componentState }) => {
  const [shelf, setShelf] = useState('');
  const data = [
    { key: 1, value: 'Currently Reading' },
    { key: 2, value: 'Want To Read' },
    { key: 3, value: 'Read' },
    { key: 4, value: 'None' },
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
  const defaultKey = (data.filter(e => {
    const noSpaceValue = e.value.split(' ').join('')
    return `${noSpaceValue.charAt(0).toLocaleLowerCase()}${noSpaceValue.slice(1)}` === book.shelf
  }))[0].key
  return (
    <View>
      <SelectList
        data={data}
        dropdownStyles={{ position: 'absolute', top: 35, backgroundColor: '#fff', width: imageDimension.width, opacity: 0.7 }}
        inputStyles={{ fontSize: 11 }}
        boxStyles={{ paddingVertical: 6 }}
        setSelected={updateShelf}
        dropdownItemStyles={{ margin: -2 }}
        defaultOption={{ key: defaultKey, value: data[defaultKey - 1].value }}
        search={false}
        onSelect={async () => {
          await update(book, finalShelfValueOnSelect);
          componentState === 'shelves' ? getAllBooks() : false
        }}
      />
    </View>
  );
};

export default Option;
