import React, { useEffect, useState } from "react";
import "./App.css";

function BookCard({ isbn13 }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
      const data = await res.json();
      setBook(data);
    })();
  }, [isbn13]);

  return (
    <div className="book-card">
      <div className="book-image">
        <img
          src={book?.image}
          alt={`Cover of ${book?.title || "book"}`}
        />
      </div>
      <div className="book-meta">
        <div className="book-authors">by {book?.authors}</div>
        <a
          className="learn-more"
          href={book?.url}
          target="_blank"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

function AddButton() {
  return <button className="add-card">New</button>;
}

export default function App() {
  const isbns = [
    "9781484292464", 
    "9781484289822",
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main className="main">
        <div className="row">
          {isbns.map((isbn) => (
            <BookCard key={isbn} isbn13={isbn} />
          ))}
          <AddButton />
        </div>
      </main>

      <footer className="footer">
        © Belinda To, 2025
      </footer>
    </div>
  );
}
