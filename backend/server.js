const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/api/books/:query", async (req, res) => {
  const query = req.params.query;

  try {
    // Open Library API
    const openLibraryResponse = await axios.get(
      `https://openlibrary.org/search.json?q=${query}`
    );

    // Gutendex API
    const gutendexResponse = await axios.get(
      `https://gutendex.com/books/?search=${query}`
    );

    const openLibraryBooks = openLibraryResponse.data.docs
      .slice(0, 5)
      .map((book) => ({
        title: book.title,
        author: book.author_name?.[0] || "Unknown",
        year: book.first_publish_year || "N/A",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/200x300",
      }));

    const gutendexBooks = gutendexResponse.data.results
      .slice(0, 5)
      .map((book) => ({
        title: book.title,
        author: book.authors?.[0]?.name || "Unknown",
        download:
          book.formats["text/html"] ||
          book.formats["application/epub+zip"] ||
          "#",
      }));

    res.json({
      openLibrary: openLibraryBooks,
      gutendex: gutendexBooks,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching books",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});