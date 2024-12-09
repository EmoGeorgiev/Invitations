package com.invitations.dto;

public record LoginResponseDto(
        String username,
        Long id,
        String role,
        String token) {
}
