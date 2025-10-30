// src/App.jsx
import React, { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { loadBooks, saveBooks } from "./utils/storage";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("id");

  useEffect(() => {
    setBooks(loadBooks());
  }, []);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  function handleSave(book) {
    setBooks(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) {
        // update
        return prev.map(b => b.id === book.id ? book : b);
      } else {
        // add
        return [...prev, book];
      }
    });
    setEditingBook(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this book?")) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  }

  function handleToggle(id) {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, availability: b.availability === "Available" ? "Issued" : "Available" } : b));
  }

  function handleEdit(book) {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // search + sort
  const filtered = books.filter(b =>
    [b.id, b.title, b.author, b.availability].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  filtered.sort((a, b) => {
    const A = (a[sortKey] || "").toLowerCase();
    const B = (b[sortKey] || "").toLowerCase();
    return A < B ? -1 : A > B ? 1 : 0;
  });

  function clearAll() {
    if (window.confirm("Clear all books from localStorage?")) {
      setBooks([]);
    }
  }

  return (
    <div className="container">
      <h1>Library Book Management</h1>

      <BookForm onSave={handleSave} editingBook={editingBook} onCancel={() => setEditingBook(null)} />

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search by id/title/author/availability" value={query} onChange={e => setQuery(e.target.value)} />
        <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="id">Sort by ID</option>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="availability">Sort by Availability</option>
        </select>
        <button onClick={clearAll} style={{ marginLeft: 8 }}>Clear All</button>
      </div>

      <BookList books={filtered} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;
