package com.invitations.student;

import com.invitations.dto.StudentDto;
import com.invitations.dto.StudentSignUpDto;
import com.invitations.invitation.InvitationMapper;
import com.invitations.student.Student;

public class StudentMapper {
    private StudentMapper() {

    }

    public static StudentDto studentToStudentDto(Student student) {
        if (student == null) {
            return null;
        }

        return new StudentDto(
                student.getId(),
                student.getUsername(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getRole(),
                student.getFacultyNumber(),
                InvitationMapper.invitationToInvitationDto(student.getInvitation()));
    }

    public static Student studentSignUpDtoToStudent(StudentSignUpDto studentSignUpDto) {
        if (studentSignUpDto == null) {
            return null;
        }

        Student student = new Student();

        student.setUsername(studentSignUpDto.username());
        student.setPassword(studentSignUpDto.password());
        student.setFirstName(studentSignUpDto.firstName());
        student.setLastName(studentSignUpDto.lastName());
        student.setEmail(studentSignUpDto.email());
        student.setRole(studentSignUpDto.role());
        student.setFacultyNumber(studentSignUpDto.facultyNumber());
        student.setEnabled(false);

        return student;
    }
}
