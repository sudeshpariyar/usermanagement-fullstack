using System.ComponentModel.DataAnnotations;

namespace server.Core.Dtos.Auth
{
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required(ErrorMessage = "UserName is missing.")]
        public string UserName { get; set; }
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is missing.")]
        public string Password { get; set; }
        public string Address { get; set; }

    }
}
