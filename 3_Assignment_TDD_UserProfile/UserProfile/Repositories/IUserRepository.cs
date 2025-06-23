using System;
using System.Collections.Generic;
using UserProfile.Models;

namespace UserProfile.Repositories
{
    public interface IUserRepository
    {
        User? GetUserById(Guid userId);
        User? GetUserByEmail(string email);
        IEnumerable<User> GetAllUsers();
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(Guid userId);
    }
} 