import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('./books.json');
      setBooks(response.data);
      setFilteredBooks(response.data); // Set initially fetched books as the filtered list
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  const searchBooks = (query) => {
    if (!query) {
      setFilteredBooks(books); // Reset to original list if query is empty
      fetchBooks()
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = books.filter(book => 
      book.volumeInfo.title.toLowerCase().includes(lowercasedQuery) ||
      (book.volumeInfo.authors && book.volumeInfo.authors.some(author => author.toLowerCase().includes(lowercasedQuery)))
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="App">
    <h1>Book Search App</h1>
    <SearchBar onSearch={searchBooks} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} />
      ) : (
        <p>No books found</p>
      )
    )}
  </div>
  );
};

export default App;
