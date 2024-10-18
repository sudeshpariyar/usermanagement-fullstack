namespace server.Core.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }

        //Returning to client
        public UserInfoResult UserInfo { get; set; }
    }
}
