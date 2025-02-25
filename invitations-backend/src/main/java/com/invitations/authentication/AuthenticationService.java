package com.invitations.authentication;

import com.invitations.config.JwtService;
import com.invitations.dto.*;
import com.invitations.student.StudentMapper;
import com.invitations.teacher.TeacherMapper;
import com.invitations.student.Student;
import com.invitations.teacher.Teacher;
import com.invitations.user.JpaUserDetailsService;
import com.invitations.user.SecurityUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final JpaUserDetailsService userDetailsService;

    public AuthenticationService(JwtService jwtService, JpaUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    public StudentDto studentSignUp(StudentSignUpDto studentSignUpDto) {
        Student student = StudentMapper.studentSignUpDtoToStudent(studentSignUpDto);
        Student newStudent = (Student) userDetailsService.createUser(student);
        return StudentMapper.studentToStudentDto(newStudent);
    }

    public TeacherDto teacherSignUp(TeacherSignUpDto teacherSignUpDto) {
        Teacher teacher = TeacherMapper.teacherSignUpDtoToTeacher(teacherSignUpDto);
        Teacher newTeacher = (Teacher) userDetailsService.createUser(teacher);
        return TeacherMapper.teacherToTeacherDto(newTeacher);
    }

    public LoginResponseDto login(Authentication authentication) {
        String token = jwtService.generateToken(authentication);
        String username = authentication.getName();
        SecurityUser user = (SecurityUser) authentication.getPrincipal();
        Long id = user.getId();
        String role = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        return new LoginResponseDto(username, id, role, token);
    }
}
