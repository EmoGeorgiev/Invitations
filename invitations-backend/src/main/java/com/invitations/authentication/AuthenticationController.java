package com.invitations.authentication;

import com.invitations.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup/student")
    public ResponseEntity<StudentDto> studentSignUp(@RequestBody @Valid StudentSignUpDto studentSignUpDto) {
        StudentDto studentDto = authenticationService.studentSignUp(studentSignUpDto);
        return ResponseEntity.ok()
                .body(studentDto);
    }

    @PostMapping("/signup/teacher")
    public ResponseEntity<TeacherDto> studentSignUp(@RequestBody @Valid TeacherSignUpDto teacherSignUpDto) {
        TeacherDto teacherDto = authenticationService.teacherSignUp(teacherSignUpDto);
        return ResponseEntity.ok()
                .body(teacherDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        LoginResponseDto loginResponseDto = authenticationService.login(authentication);

        return ResponseEntity.ok()
                .body(loginResponseDto);
    }
}
