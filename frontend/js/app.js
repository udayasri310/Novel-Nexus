// Fetch books from API and display them on the homepage
document.querySelector("#joinBookClub").addEventListener("click", () => {
    window.location.href = "bookClub.html";
  });
  
window.onload = async () => {
    const response = await fetch('http://localhost:5000/api/books');
    const books = await response.json();
    const booksList = document.getElementById('books');
    
    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;
        booksList.appendChild(listItem);
    });
};
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route to serve index.html if needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
