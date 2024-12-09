package com.invitations.mapper;

import com.invitations.dto.TeacherDto;
import com.invitations.dto.TeacherSignUpDto;
import com.invitations.teacher.Teacher;

public class TeacherMapper {
    private TeacherMapper() {

    }

    public static TeacherDto teacherToTeacherDto(Teacher teacher) {
        if (teacher == null) {
            return null;
        }

        return new TeacherDto(
                teacher.getId(),
                teacher.getUsername(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getEmail(),
                teacher.getRole(),
                teacher.getDepartment());
    }

    public static Teacher teacherSignUpDtoToTeacher(TeacherSignUpDto teacherSignUpDto) {
        if (teacherSignUpDto == null) {
            return null;
        }

        Teacher teacher = new Teacher();

        teacher.setUsername(teacherSignUpDto.username());
        teacher.setPassword(teacherSignUpDto.password());
        teacher.setFirstName(teacherSignUpDto.firstName());
        teacher.setLastName(teacherSignUpDto.lastName());
        teacher.setEmail(teacherSignUpDto.email());
        teacher.setRole(teacherSignUpDto.role());
        teacher.setDepartment(teacherSignUpDto.department());
        teacher.setEnabled(false);

        return teacher;
    }
}
