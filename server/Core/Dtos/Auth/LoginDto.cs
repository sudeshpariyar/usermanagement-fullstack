using System.ComponentModel.DataAnnotations;

namespace server.Core.Dtos.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage ="User Name is missing.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is missing.")]
        public string Password { get; set; }
    }
}
