using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context;
        
        public BookstoreController(BookstoreDbContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortType = "asc", [FromQuery] List<string>? bookCategories = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();
            
            List<Book> books;
            
            if (sortType == "asc")
            {
                books = query
                    .OrderBy(b => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            } else if (sortType == "desc")
            {
                books = query
                    .OrderByDescending(b => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            } else
            {
                books = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            var returnObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(returnObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookCategories);
        }

        [HttpPost("addBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("updateBook/{BookId}")]
        public IActionResult UpdateBook(int BookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(BookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(updatedBook);
        }

        [HttpDelete("deleteBook/{BookId}")]
        public IActionResult DeleteBook(int BookId)
        {
            var book = _context.Books.Find(BookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent(); 
        }
    }
}
