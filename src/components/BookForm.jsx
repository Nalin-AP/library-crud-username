// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";

const initial = { id: "", title: "", author: "", availability: "Available" };

export default function BookForm({ onSave, editingBook, onCancel }) {
  const [book, setBook] = useState(initial);

  useEffect(() => {
    if (editingBook) setBook(editingBook);
    else setBook(initial);
  }, [editingBook]);

  function handleChange(e) {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
    if (!book.id.trim() || !book.title.trim() || !book.author.trim()) {
      alert("Please fill Book ID, Title and Author.");
      return;
    }
    onSave({ ...book });
    setBook(initial);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <div>
        <label>Book ID</label><br/>
        <input name="id" value={book.id} onChange={handleChange} />
      </div>
      <div>
        <label>Title</label><br/>
        <input name="title" value={book.title} onChange={handleChange} />
      </div>
      <div>
        <label>Author</label><br/>
        <input name="author" value={book.author} onChange={handleChange} />
      </div>
      <div>
        <label>Availability</label><br/>
        <select name="availability" value={book.availability} onChange={handleChange}>
          <option>Available</option>
          <option>Issued</option>
        </select>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Save</button>{" "}
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
