using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Core.Constants;
using server.Core.Dtos.General;
using server.Core.Dtos.Message;
using server.Core.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateNewMessage([FromBody] CreateMessageDto createMessageDto)
        {
            var result = await _messageService.CreateNewMessageAsync(User, createMessageDto);
            if(result.IsSucceed)
                return Ok(result.Message);

            return StatusCode(result.StatusCode,result.Message);
        }

        [HttpGet]
        [Route("own")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMyMessages()
        {
            var result = await _messageService.GetMyMessagesAsync(User);
            return Ok(result);
        }

        [HttpGet]
        [Authorize(Roles = StaticUserRoles.OWNERADMIN)]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMessageAsync()
        {
            var result = await _messageService.GetMessageAsync();
            return Ok(result);
        }
    }
}
