package com.invitations.dto;

import com.invitations.enums.Role;

public record StudentDto(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        Role role,
        String facultyNumber,
        InvitationDto invitationDto) {
}
