using System;
using UserProfile.Models;
using UserProfile.Repositories;

namespace UserProfile.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User CreateUser(UserDto userDto)
        {
            if (userDto == null)
            {
                throw new ArgumentNullException(nameof(userDto));
            }

            if (string.IsNullOrWhiteSpace(userDto.Email))
            {
                throw new ArgumentException("Email is required.", nameof(userDto.Email));
            }

            var existingUser = _userRepository.GetUserByEmail(userDto.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = userDto.Name,
                Email = userDto.Email
            };

            _userRepository.AddUser(user);
            return user;
        }

        public User? GetUserById(Guid userId)
        {
            return _userRepository.GetUserById(userId);
        }

        public void UpdateUser(UserDto userDto)
        {
            if (userDto == null)
            {
                throw new ArgumentNullException(nameof(userDto));
            }

            var existingUser = _userRepository.GetUserById(userDto.Id);
            if (existingUser == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            existingUser.Name = userDto.Name;
            existingUser.Email = userDto.Email;

            _userRepository.UpdateUser(existingUser);
        }

        public void DeleteUser(Guid userId)
        {
            _userRepository.DeleteUser(userId);
        }
    }
} 