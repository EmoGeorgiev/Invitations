package com.invitations.invitation;

import com.invitations.dto.InvitationDto;
import com.invitations.exception.InvitationNotFoundException;
import com.invitations.exception.StudentAlreadyHasInvitationException;
import com.invitations.exception.UserIsNotEnabledException;
import com.invitations.student.Student;
import com.invitations.student.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final StudentService studentService;

    public InvitationService(InvitationRepository invitationRepository, StudentService studentService) {
        this.invitationRepository = invitationRepository;
        this.studentService = studentService;
    }

    public List<InvitationDto> getInvitations() {
        return StreamSupport.stream(invitationRepository.findAll().spliterator(), false)
                .filter(invitation -> invitation.getStudent().isEnabled())
                .map(InvitationMapper::invitationToInvitationDto)
                .collect(Collectors.toList());

    }

    public InvitationDto getInvitation(Long id) {
        return invitationRepository.findById(id)
                .filter(invitation -> invitation.getStudent().isEnabled())
                .map(InvitationMapper::invitationToInvitationDto)
                .orElseThrow(() -> new InvitationNotFoundException("There does not exist an invitation with this id"));
    }
    public InvitationDto addInvitation(InvitationDto invitationDto) {
        if (invitationRepository.findByStudentId(invitationDto.studentId()).isPresent()) {
            throw new StudentAlreadyHasInvitationException("This student already has an invitation");
        }
        Student student = studentService.getStudent(invitationDto.studentId());
        if (!student.isEnabled()) {
            throw new UserIsNotEnabledException("This student is not enabled");
        }
        Invitation invitation = InvitationMapper.invitationDtoToInvitation(invitationDto);
        invitation.setStudent(student);
        Invitation newInvitation = invitationRepository.save(invitation);
        student.setInvitation(newInvitation);
        return InvitationMapper.invitationToInvitationDto(newInvitation);
    }

    public InvitationDto updateInvitation(Long id, InvitationDto invitationDto) {
        Invitation oldInvitation = invitationRepository.findById(id)
                .orElseThrow(() -> new InvitationNotFoundException("There does not exist an invitation with this id"));

        oldInvitation.setTopicId(invitationDto.topicId());
        oldInvitation.setTitle(invitationDto.title());
        oldInvitation.setStudentName(invitationDto.studentName());
        oldInvitation.setFacultyNumber(invitationDto.facultyNumber());
        oldInvitation.setDate(invitationDto.date());
        oldInvitation.setTime(invitationDto.time());
        oldInvitation.setAuditory(invitationDto.auditory());
        Student student = studentService.getStudent(invitationDto.studentId());
        oldInvitation.setStudent(student);

        Invitation newInvitation = invitationRepository.save(oldInvitation);
        student.setInvitation(newInvitation);
        return InvitationMapper.invitationToInvitationDto(newInvitation);
    }

    public void deleteInvitation(Long id) {
        if (!invitationRepository.existsById(id)) {
            throw new InvitationNotFoundException("There does not exist an invitation with this id");
        }
        invitationRepository.deleteById(id);
    }
}
