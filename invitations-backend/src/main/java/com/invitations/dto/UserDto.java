package com.invitations.dto;

import com.invitations.enums.Role;
public record UserDto(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        Role role,
        boolean enabled) {
}
