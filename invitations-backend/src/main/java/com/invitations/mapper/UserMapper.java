package com.invitations.mapper;

import com.invitations.dto.UserDto;
import com.invitations.user.AppUser;

public class UserMapper {
    private UserMapper() {

    }

    public static UserDto userToUserDto(AppUser user) {
        if (user == null) {
            return null;
        }

        return new UserDto(user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled());
    }
}
