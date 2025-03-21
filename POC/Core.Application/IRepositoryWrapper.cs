using Core.Application.Users;
namespace Core.Application
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        void Save();
    }
}
