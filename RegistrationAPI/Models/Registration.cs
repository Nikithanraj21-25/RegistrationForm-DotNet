namespace RegistrationAPI.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? FatherName { get; set; }
        public string? RollNumber { get; set; }
        public string? Department { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public int Status { get; set; } = 0; // Default status is 0 (active)
    }
}

