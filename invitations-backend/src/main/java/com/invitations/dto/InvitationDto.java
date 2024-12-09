package com.invitations.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record InvitationDto(
        Long id,
        @NotNull(message = "Topic id cannot be null")
        @Min(value = 1, message = "Topic id must be at least 1")
        Long topicId,
        @NotBlank(message = "Title cannot be blank")
        @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
        String title,
        @NotBlank(message = "Student name cannot be blank")
        @Size(min = 1, max = 60, message = "Student name must be between 1 and 60 characters")
        String studentName,
        @NotBlank(message = "Faculty number cannot be blank")
        @Size(min = 5, max = 20, message = "Faculty number must be between 5 and 20 characters")
        String facultyNumber,
        @NotNull(message = "Date cannot be null")
        LocalDate date,
        @NotNull(message = "Time cannot be null")
        LocalTime time,
        @NotBlank(message = "Auditory cannot be blank")
        @Size(min = 1, max = 30, message = "Auditory must be between 1 and 30 characters")
        String auditory,
        @NotNull(message = "Student id cannot be null")
        Long studentId) {
}