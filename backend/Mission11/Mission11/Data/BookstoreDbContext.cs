using Microsoft.EntityFrameworkCore;

namespace Mission11.Data
{
    public class BookstoreDbContext : DbContext
    {
        public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }
    }
}
