// src/components/BookItem.jsx
import React from "react";

export default function BookItem({ book, onEdit, onDelete, onToggle }) {
  return (
    <tr>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.availability}</td>
      <td>
        <button onClick={() => onEdit(book)}>Edit</button>{" "}
        <button onClick={() => onDelete(book.id)}>Delete</button>{" "}
        <button onClick={() => onToggle(book.id)}>
          {book.availability === "Available" ? "Issue" : "Return"}
        </button>
      </td>
    </tr>
  );
}
