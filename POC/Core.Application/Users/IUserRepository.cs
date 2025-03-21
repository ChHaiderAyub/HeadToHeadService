using Core.Application.Users.UserDtos;
using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Users
{
    public interface IUserRepository
    {
        PayloadCustom<User> RegisterUser(User user);
      
    }
}
