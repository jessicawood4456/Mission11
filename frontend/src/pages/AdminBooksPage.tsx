import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
import Pagination from '../components/Pagination';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortType, setSortType] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(sortType, pageSize, pageNum, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [sortType, pageSize, pageNum]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (error) {
      alert('Failed to delete project.');
      throw error;
    }
  };

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <div>
        <h1>Admin - Books</h1>

        {!showForm && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
          >
            Add Book
          </button>
        )}

        {showForm && (
          <NewBookForm
            onSuccess={() => {
              setShowForm(false);
              fetchBooks(sortType, pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingBook && (
          <EditBookForm
            book={editingBook}
            onSuccess={() => {
              setEditingBook(null);
              fetchBooks(sortType, pageSize, pageNum, []).then((data) =>
                setBooks(data.books)
              );
            }}
            onCancel={() => setEditingBook(null)}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.bookId}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>{b.price}</td>
                <td>
                  <button onClick={() => setEditingBook(b)}>Edit</button>
                  <button onClick={() => handleDelete(b.bookId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />

        <label>
          Sort Books By Title:
          <select
            value={sortType}
            onChange={(t) => {
              setSortType(t.target.value);
            }}
          >
            <option></option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default AdminBooksPage;
