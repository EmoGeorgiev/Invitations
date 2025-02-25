package com.invitations.student;

import com.invitations.dto.GradeDto;
import com.invitations.dto.StudentDto;
import com.invitations.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("There does not exist such a student"));
    }

    public List<GradeDto> getStudentGrades() {
        return StreamSupport.stream(studentRepository.findAll().spliterator(), false)
                .filter(Student::isEnabled)
                .map(user -> {
                    StudentDto studentDto = StudentMapper.studentToStudentDto((Student) user);
                    String grade;
                    if (studentDto.invitationDto() != null) {
                        grade = "Submitted";
                    } else {
                        grade = "Not submitted";
                    }
                    return new GradeDto(studentDto, grade);
                })
                .collect(Collectors.toList());
    }

    public List<StudentDto> getNotActivatedStudents() {
        return StreamSupport.stream(studentRepository.findAll().spliterator(), false)
                .filter(student -> !student.isEnabled())
                .map(StudentMapper::studentToStudentDto)
                .collect(Collectors.toList());
    }

    public StudentDto enableStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("There does not exist such a student"));

        student.setEnabled(true);
        Student newStudent = studentRepository.save(student);
        return StudentMapper.studentToStudentDto(newStudent);
    }
}
