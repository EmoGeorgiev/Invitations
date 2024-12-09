package com.invitations.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    @Query("SELECT u FROM AppUser u WHERE u.enabled = FALSE")
    List<AppUser> findNotEnabledUsers();
}
