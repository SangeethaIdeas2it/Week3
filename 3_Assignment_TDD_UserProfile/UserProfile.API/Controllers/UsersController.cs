using System;
using Microsoft.AspNetCore.Mvc;
using UserProfile.Models;
using UserProfile.Services;

namespace UserProfile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult CreateUser(UserDto userDto)
        {
            try
            {
                var user = _userService.CreateUser(userDto);
                return CreatedAtAction(nameof(GetUserById), new { userId = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(Guid userId)
        {
            var user = _userService.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{userId}")]
        public IActionResult UpdateUser(Guid userId, UserDto userDto)
        {
            if (userId != userDto.Id)
            {
                return BadRequest("User ID mismatch");
            }

            try
            {
                _userService.UpdateUser(userDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(Guid userId)
        {
            _userService.DeleteUser(userId);
            return NoContent();
        }
    }
} 