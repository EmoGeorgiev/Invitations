package com.invitations.dto;

import com.invitations.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TeacherSignUpDto(
        @NotBlank(message = "Username cannot be blank")
        @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
        String username,
        @NotBlank(message = "Password cannot be blank")
        @Size(min = 3, max = 20, message = "Password must be between 3 and 20 characters")
        String password,
        @NotBlank(message = "First name cannot be blank")
        @Size(min = 1, max = 30, message = "First name must be between 1 and 30 characters")
        String firstName,
        @NotBlank(message = "Last name cannot be blank")
        @Size(min = 1, max = 30, message = "Last name must be between 1 and 30 characters")
        String lastName,
        @Email(message = "Email should be valid")
        @NotBlank(message = "Email cannot be blank")
        String email,
        @NotNull(message = "Role cannot be null")
        Role role,
        @NotBlank(message = "Department cannot be blank")
        @Size(min = 1, max = 20, message = "Department must be between 1 and 20 characters")
        String department) {
}
