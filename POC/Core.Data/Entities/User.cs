
using System.ComponentModel.DataAnnotations;
using static Core.Data.Enums.Enums;

namespace Core.Data.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [StringLength(11)]
        public string PhoneNumber { get; set; }

        [Required]
        public UserRole Role { get; set; }

        public decimal? Longitude { get; set; }

        public decimal? Latitude { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
