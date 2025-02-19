namespace RegistrationAPI.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public string? Name { get; set; }  // Nullable
        public string? RollNumber { get; set; }
        public string? Department { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
