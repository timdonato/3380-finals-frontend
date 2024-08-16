import React, { useEffect, useState } from 'react';
import './styles.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://3380-finals-backend.vercel.app/api/books'); // Full URL to backend
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`https://3380-finals-backend.vercel.app/api/books/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBooks(books.filter(book => book._id !== id));
          alert('Book deleted successfully!');
        } else {
          alert('Failed to delete book');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="BookList">
      <div className="col-md-12">
        <h2 className="display-4 text-center">Books List</h2>
      </div>
      <div className="col-md-11">
        <a className="btn btn-info float-right" href="/add">+ Add New Book</a>
        <hr />
      </div>
      <div className="list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="card-container">
              <div className="desc">
                <h2>{book.bookTitle}</h2>
                <h3>{book.bookAuthor}</h3>
                <p>{book.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books available. Please add some books.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
