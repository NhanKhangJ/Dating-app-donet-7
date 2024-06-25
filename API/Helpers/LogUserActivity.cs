using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity: IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var restultContext = await next();

            if(!restultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = restultContext.HttpContext.User.GetUserId();
            var uow = restultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            var user = await uow.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await uow.Complete();
        }
    }
}


