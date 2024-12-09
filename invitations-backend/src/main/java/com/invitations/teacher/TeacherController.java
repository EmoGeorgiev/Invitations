package com.invitations.teacher;

import com.invitations.dto.GradeDto;
import com.invitations.dto.StudentDto;
import com.invitations.student.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    private final StudentService studentService;

    public TeacherController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/grades")
    public List<GradeDto> getStudentGrades() {
        return studentService.getStudentGrades();
    }

    @GetMapping("/students/not-activated")
    public List<StudentDto> getNotActivatedStudents() {
        return studentService.getNotActivatedStudents();
    }

    @PutMapping("/students/enable/{id}")
    public StudentDto enableStudent(@PathVariable Long id) {
        return studentService.enableStudent(id);
    }
}