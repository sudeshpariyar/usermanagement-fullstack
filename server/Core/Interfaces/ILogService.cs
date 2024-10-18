using System.Security.Claims;
using server.Core.Dtos.Log;

namespace server.Core.Interfaces
{
    public interface ILogService
    {
        Task SaveNewLog(string UserName, string Description);
        Task<IEnumerable<GetLogDto>> GetLogAsync();
        Task<IEnumerable<GetLogDto>> GetMyLogAsync(ClaimsPrincipal User);
    }
}
