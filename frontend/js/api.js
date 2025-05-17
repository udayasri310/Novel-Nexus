const apiUrl = 'http://localhost:5000/api';

async function getBooks() {
  const response = await fetch(`${apiUrl}/books`);
  const data = await response.json();
  return data;
}
