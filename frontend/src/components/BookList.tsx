import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({
  selectedCategories,
  pageNum,
  setPageNum,
}: {
  selectedCategories: string[];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortType, setSortType] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortType=${sortType}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortType, selectedCategories]);

  useEffect(() => {
    const sorted = [...books].sort((a, b) =>
      sortType === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setBooks(sorted);
  }, [sortType]);

  return (
    <>
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <br />
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn} Individuals Served
              </li>
              <li>
                <strong>Classfication:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${b.bookId}/${b.title}/${b.price}`)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
      <br />

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />

      <label>
        Results Per Page:
        <select
          value={pageSize}
          onChange={(b) => {
            setPageSize(Number(b.target.value));
            setPageNum(1);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>
      <br />
      <br />

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
    </>
  );
}

export default BookList;
