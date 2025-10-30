// src/components/BookList.jsx
import React from "react";
import BookItem from "./BookItem";

function exportCSV(books) {
  if (!books.length) return;
  const header = ["Book ID", "Title", "Author", "Availability"];
  const rows = books.map(b => [b.id, b.title, b.author, b.availability]);
  const csv = [header, ...rows].map(r => r.map(c => `"${(c+"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "books_export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookList({ books, onEdit, onDelete, onToggle }) {
  return (
    <>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length ? (
            books.map(b => <BookItem key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />)
          ) : (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No books</td></tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => exportCSV(books)}>Export CSV</button>
      </div>
    </>
  );
}
