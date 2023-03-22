using System.ComponentModel.DataAnnotations;

namespace CRMApp.Models
{
    public class UserLoginTable
    {
        public int UserLogin_key { get; set; }
        public string LoginType { get; set; }= "";
        public int Logincode { get; set; }

        public string userid { get; set; } = "";
        // Public Property email As String


        [StringLength(150)]
        public string Email { get; set; } = "";
        [Required]
        [DataType(DataType.Password)]
        [StringLength(150, MinimumLength = 6)]
        [Display(Name = "Password: ")]
        public string Password { get; set; } = "";
        public string PasswordType { get; set; } = "";
        public string Corpid { get; set; } = "";






    }








}