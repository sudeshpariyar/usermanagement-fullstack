using System.Security.Claims;
using server.Core.Dtos.General;
using server.Core.Dtos.Message;

namespace server.Core.Interfaces
{
    public interface IMessageService
    {
        Task<GeneralServiceResponseDto>CreateNewMessageAsync(ClaimsPrincipal User, CreateMessageDto createMessageDto);
        Task<IEnumerable<GetMessageDto>> GetMessageAsync();
        Task<IEnumerable<GetMessageDto>>GetMyMessagesAsync(ClaimsPrincipal User);
    }
}
