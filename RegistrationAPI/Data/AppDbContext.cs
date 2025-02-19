using Microsoft.EntityFrameworkCore;
using RegistrationAPI.Models;

namespace RegistrationAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Registration> Registrations { get; set; }
    }
}
