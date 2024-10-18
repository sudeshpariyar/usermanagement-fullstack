using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Core.DbContext;
using server.Core.Dtos.General;
using server.Core.Dtos.Message;
using server.Core.Interfaces;
using server.Core.Models;

namespace server.Core.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogService _logService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MessageService(ApplicationDbContext context, ILogService logService, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _logService = logService;
            _userManager = userManager;
        }

        public async Task<GeneralServiceResponseDto> CreateNewMessageAsync(ClaimsPrincipal User, CreateMessageDto createMessageDto)
        {
            if(User.Identity.Name == createMessageDto.ReceiverUserName)
                return new GeneralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Sender and Receiver Cannot be same."
                };
            
            var isReceiverUserNameValid = _userManager.Users.Any(m=> m.UserName == createMessageDto.ReceiverUserName);
            if (!isReceiverUserNameValid)
                return new GeneralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Receiver UserName is not valid."
                };

            Message newMessage = new Message()
            {
                SenderUserName = User.Identity.Name,
                ReceiverUserName = createMessageDto.ReceiverUserName,
                Text = createMessageDto.Text
            };
            await _context.Messages.AddAsync(newMessage);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Send Message.");

            return new GeneralServiceResponseDto()
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "Message Saved."
            };

        }

        public async Task<IEnumerable<GetMessageDto>> GetMessageAsync()
        {
            var messages = await _context.Messages
                .Select(m => new GetMessageDto()
                {
                    Id = m.Id,
                    SenderUserName = m.SenderUserName,
                    ReceiverUserName = m.ReceiverUserName,
                    Text = m.Text,
                    CreatedAt = m.CreatedAt
                })
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();
            return messages;
        }

        public async Task<IEnumerable<GetMessageDto>> GetMyMessagesAsync(ClaimsPrincipal User)
        {
            var loggedUser = User.Identity.Name;
            var messages = await _context.Messages
                .Where(m=> m.SenderUserName == loggedUser || m.ReceiverUserName == loggedUser)
                .Select(m => new GetMessageDto()
                {
                    Id = m.Id,
                    SenderUserName = m.SenderUserName,
                    ReceiverUserName = m.ReceiverUserName,
                    Text = m.Text,
                    CreatedAt = m.CreatedAt
                })
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();
            return messages;
        }
    }
}
