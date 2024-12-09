package com.invitations.mapper;

import com.invitations.dto.InvitationDto;
import com.invitations.invitation.Invitation;

public class InvitationMapper {

    private InvitationMapper() {

    }

    public static Invitation invitationDtoToInvitation(InvitationDto invitationDto) {
        if (invitationDto == null) {
            return null;
        }

        Invitation invitation = new Invitation();

        invitation.setId(invitationDto.id());
        invitation.setTopicId(invitationDto.topicId());
        invitation.setTitle(invitationDto.title());
        invitation.setStudentName(invitationDto.studentName());
        invitation.setFacultyNumber(invitationDto.facultyNumber());
        invitation.setDate(invitationDto.date());
        invitation.setTime(invitationDto.time());
        invitation.setAuditory(invitationDto.auditory());

        return invitation;
    }

    public static InvitationDto invitationToInvitationDto(Invitation invitation) {
        if (invitation == null) {
            return null;
        }

        return new InvitationDto(
                invitation.getId(),
                invitation.getTopicId(),
                invitation.getTitle(),
                invitation.getStudentName(),
                invitation.getFacultyNumber(),
                invitation.getDate(),
                invitation.getTime(),
                invitation.getAuditory(),
                invitation.getStudent().getId()
        );
    }
}
