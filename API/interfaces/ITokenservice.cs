using API.Entities;

namespace API.Interfacesl
{
    public interface ITokenservice
    {
        string CreateToken(AppUser user); 
    }
}   

