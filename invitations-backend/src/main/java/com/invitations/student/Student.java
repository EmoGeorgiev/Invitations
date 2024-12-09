package com.invitations.student;

import com.invitations.invitation.Invitation;
import com.invitations.user.AppUser;
import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student extends AppUser {
    @Column(nullable = false, unique = true)
    private String facultyNumber;
    @OneToOne(mappedBy = "student", orphanRemoval = true)
    private Invitation invitation;

    public String getFacultyNumber() {
        return facultyNumber;
    }

    public void setFacultyNumber(String facultyNumber) {
        this.facultyNumber = facultyNumber;
    }

    public Invitation getInvitation() {
        return invitation;
    }

    public void setInvitation(Invitation invitation) {
        this.invitation = invitation;
    }
}
