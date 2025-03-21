using Core.Application.Users.UserDtos;
using Core.Data;
using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users
{
    internal class UserRepository : IUserRepository
    {
        RepositoryContext _repositoryContext;
        private readonly IConfiguration _configuration;

        public UserRepository(RepositoryContext repositoryContext, IConfiguration configuration)
        {
            _repositoryContext = repositoryContext;
            _configuration = configuration;

        }






        public PayloadCustom<User> RegisterUser(User user)
        {
            try
            {
                var users = _repositoryContext.Users.FirstOrDefault(u=>u.Email==user.Email && u.PhoneNumber==user.PhoneNumber);
                if (users != null)
                {
                    return new PayloadCustom<User>
                    {
                        Status = (int)HttpStatusCode.Conflict,
                        Message = "User with this email or phone number already exists.",
                    };
                }
               
                user.CreatedAt = DateTime.UtcNow; // Set creation date
            
                _repositoryContext.Users.Add(user);
                _repositoryContext.SaveChanges();
                return new PayloadCustom<User>
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.Created,
                    Message = "User registered successfully."
                };

            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)
                };


            }


        }










       

    }
}
