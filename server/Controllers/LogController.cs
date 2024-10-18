using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Core.Constants;
using server.Core.Dtos.Log;
using server.Core.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogController(ILogService logService)
        {
            _logService = logService;
        }

        [HttpGet]
        [Authorize(Roles =StaticUserRoles.OWNERADMIN)]
        public async Task<ActionResult<IEnumerable<GetLogDto>>> GetLogs()
        {
            var logs = await _logService.GetLogAsync();
            return Ok(logs);
        }

        [HttpGet]
        [Route("own")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetLogDto>>> GetMyLogs()
        {
            var logs = await _logService.GetMyLogAsync(User);
            return Ok(logs);
        }
    }
}
