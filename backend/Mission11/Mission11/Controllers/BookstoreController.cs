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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortType = "asc")
        {
            List<Book> books;
            
            if (sortType == "asc")
            {
                books = _context.Books
                    .OrderBy(b => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            } else if (sortType == "desc")
            {
                books = _context.Books
                    .OrderByDescending(b => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            } else
            {
                books = _context.Books
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            var totalNumBooks = _context.Books.Count();

            var returnObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(returnObject);
        }
    }
}
