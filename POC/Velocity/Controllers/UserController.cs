using Core.Application;
using Core.Application.Users.UserDtos;
using Core.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Velocity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public UserController(IRepositoryWrapper repositoryWrapper) {
            _repository = repositoryWrapper;
        }







        
        [HttpPost("register")]
        public PayloadCustom<User> RegisterUser([FromBody] User user)
        {
            return _repository.User.RegisterUser(user);
        }







    }
}
