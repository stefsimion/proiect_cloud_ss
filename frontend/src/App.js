import { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_BASE}/api/books/${encodeURIComponent(query)}`
      );
      setBooks(response.data);
    } catch (requestError) {
      setError("Nu am putut incarca rezultatele. Incearca din nou.");
    }

    setLoading(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">BookExplorer</div>
        <nav className="menu">
          <a href="#search">Cautare</a>
          <a href="#open-library">Open Library</a>
          <a href="#gutendex">Gutendex</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero" id="search">
          <p className="badge">Descopera carti mai rapid</p>
          <h1>Cauta titluri, autori si carti gratuite intr-un singur loc</h1>
          <p className="hero-subtitle">
            Introdu un cuvant cheie si vezi instant rezultate din Open Library si
            Gutendex.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Ex: Mihai Eminescu, Harry Potter..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchBooks()}
            />
            <button onClick={searchBooks} disabled={loading}>
              {loading ? "Se incarca..." : "Search"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </section>

        {loading && <p className="status-message">Loading...</p>}

        {books && (
          <>
            <section id="open-library">
              <h2>Open Library Results</h2>
              <div className="books-grid">
                {books.openLibrary.map((book, index) => (
                  <article className="card" key={index}>
                    <img src={book.cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                      <strong>Year:</strong> {book.year}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section id="gutendex">
              <h2>Free Books (Gutendex)</h2>
              <div className="books-grid">
                {books.gutendex.map((book, index) => (
                  <article className="card" key={index}>
                    <h3>{book.title}</h3>
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <a href={book.download} target="_blank" rel="noreferrer">
                      Read Book
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;