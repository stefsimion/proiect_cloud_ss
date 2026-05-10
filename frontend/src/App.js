import { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `${API_BASE}/api/books/${encodeURIComponent(query)}`
      );

      setBooks(response.data);
    } catch (error) {
      alert("Error fetching books");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>BookExplorer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {books && (
        <>
          <h2>Open Library Results</h2>

          <div className="books-grid">
            {books.openLibrary.map((book, index) => (
              <div className="card" key={index}>
                <img src={book.cover} alt={book.title} />

                <h3>{book.title}</h3>

                <p>
                  <strong>Author:</strong> {book.author}
                </p>

                <p>
                  <strong>Year:</strong> {book.year}
                </p>
              </div>
            ))}
          </div>

          <h2>Free Books (Gutendex)</h2>

          <div className="books-grid">
            {books.gutendex.map((book, index) => (
              <div className="card" key={index}>
                <h3>{book.title}</h3>

                <p>
                  <strong>Author:</strong> {book.author}
                </p>

                <a href={book.download} target="_blank" rel="noreferrer">
                  Read Book
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;