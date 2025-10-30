// src/utils/storage.js
const LS_KEY = "library_books_v1";

export function loadBooks() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load books:", e);
    return [];
  }
}

export function saveBooks(books) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(books));
  } catch (e) {
    console.error("Failed to save books:", e);
  }
}
