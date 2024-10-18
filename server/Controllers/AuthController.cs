using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Core.Constants;
using server.Core.Dtos.Auth;
using server.Core.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedResult = await _authService.SeedRolesAsync();
            return StatusCode(seedResult.StatusCode,seedResult.Message);
        }

        //Register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult = await _authService.RegisterAsync(registerDto); 
            return StatusCode(registerResult.StatusCode,registerResult.Message);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);

            if(loginResult is null)
                return Unauthorized("Your credentials are invalid. Please try again.");
            
            return Ok(loginResult);
        }

        [HttpPost]
        [Route("update-role")]
        [Authorize(Roles =StaticUserRoles.OWNERADMIN)]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await _authService.UpdateRoleAsync(User,updateRoleDto);
            if(updateRoleResult.IsSucceed)
            { 
                return Ok(updateRoleResult.Message); 
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode,updateRoleResult.Message);
            }
        }

        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody]MeDto token)
        {
            try
            {
                var me = await _authService.MeAsync(token);
                if (me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("Invalid Token.");
                }
            }
            catch (Exception) 
            {
                return Unauthorized("Invalid Token.");
            }
        }

        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserInfoResult>>> GetUserList()
        {
            var userList = await _authService.GetUserListAsync();
            return Ok(userList);
        }

        [HttpGet]
        [Route("users/{usersName}")]
        public async Task<ActionResult<UserInfoResult>> GetUserDetailsByUserName([FromRoute]string userName)
        {
            var user = await _authService.GetUserDetailsByNameAsync(userName);
            if(user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("UserName not found."); 
            }
        }

        [HttpGet]
        [Route("usernames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUserNameList()
        {
            var userNames = await _authService.GetUsernamesListAsync();
            return Ok(userNames);
        }

    }
}
