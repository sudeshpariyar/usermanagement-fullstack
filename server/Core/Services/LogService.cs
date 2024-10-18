using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using server.Core.DbContext;
using server.Core.Dtos.Log;
using server.Core.Interfaces;
using server.Core.Models;

namespace server.Core.Services
{
    public class LogService : ILogService
    {
        private readonly ApplicationDbContext _context;

        public LogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SaveNewLog(string UserName, string Description)
        {
            var newLog = new Log()
            {
                UserName = UserName,
                Description = Description
            };
            await _context.Logs.AddAsync(newLog);
            await _context.SaveChangesAsync();  
        }
        public async Task<IEnumerable<GetLogDto>> GetLogAsync()
        {
            var logs = await _context.Logs
                .Select(l => new GetLogDto
                {
                    CreatedAt = l.CreatedAt,
                    Description = l.Description,
                    UserName = l.UserName,
                })
                .OrderByDescending(l=> l.CreatedAt)
                .ToListAsync(); 
            return logs;  
        }

        public async Task<IEnumerable<GetLogDto>> GetMyLogAsync(ClaimsPrincipal User)
        {
            var logs = await _context.Logs
                .Where(l=> l.UserName == User.Identity.Name)
                .Select(l => new GetLogDto
                {
                    CreatedAt = l.CreatedAt,
                    Description = l.Description,
                    UserName = l.UserName,
                })
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
            return logs;
        }

        
    }
}
