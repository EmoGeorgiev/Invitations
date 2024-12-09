package com.invitations.invitation;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Long> {
    @Query("SELECT i FROM Invitation i WHERE i.student.id = :id")
    Optional<Invitation> findByStudentId(Long id);
}
