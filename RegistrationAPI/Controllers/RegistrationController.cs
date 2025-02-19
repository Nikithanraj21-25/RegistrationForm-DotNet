using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationAPI.Data;
using RegistrationAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrationController(AppDbContext context)
        {
            _context = context;
        }

        // POST: Register a new user
        [HttpPost]
        public async Task<ActionResult<Registration>> RegisterUser(Registration registration)
        {
            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Registration successful!" });
        }

        // GET: Retrieve all users
        [HttpGet]
        public async Task<ActionResult<List<Registration>>> GetRegistrations()
        {
            return await _context.Registrations.ToListAsync();
        }

        // DELETE: Delete a user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
            {
                return NotFound();
            }

            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully!" });
        }

        // PUT: Update a user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, Registration updatedRegistration)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
            {
                return NotFound();
            }

            registration.Name = updatedRegistration.Name;
            registration.RollNumber = updatedRegistration.RollNumber;
            registration.Department = updatedRegistration.Department;
            registration.PhoneNumber = updatedRegistration.PhoneNumber;
            registration.Address = updatedRegistration.Address;

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully!" });
        }
    }
}
