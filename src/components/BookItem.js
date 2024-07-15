import React from 'react';
// import './BookItem.css';

const BookItem = ({ book }) => {
  const { volumeInfo } = book;
  return (
    <div className="book-item">
      <h3>{volumeInfo.title}</h3>
      <p>{volumeInfo.authors?.join(', ')}</p>
      <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
    </div>
  );
};

export default BookItem;