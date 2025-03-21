using Core.Application.Users;
using Core.Data;
using Microsoft.Extensions.Configuration;

namespace Core.Application
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repositoryContext;
        private IUserRepository _userRepository;
        private IConfiguration _configuration;

        public RepositoryWrapper(RepositoryContext repositoryContext, IConfiguration configuration)
        {
            _repositoryContext = repositoryContext;
            _configuration = configuration;
        }
        public IUserRepository User
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_repositoryContext, _configuration);
                }
                return _userRepository;
            }
        }
      
        public void Save()
        {
            _repositoryContext.SaveChanges();
        }


    }
}
