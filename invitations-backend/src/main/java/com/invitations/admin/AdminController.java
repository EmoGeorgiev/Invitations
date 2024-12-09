package com.invitations.admin;

import com.invitations.dto.UserDto;
import com.invitations.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/not-activated")
    public List<UserDto> getNotActivatedUsers() {
        return userService.getNotActivatedUsers();
    }

    @PutMapping("/users/enable/{id}")
    public UserDto enableUser(@PathVariable Long id) {
        return userService.enableUser(id);
    }

    @PutMapping("/users/disable/{id}")
    public UserDto disableUser(@PathVariable Long id) {
        return userService.disableUser(id);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent()
                .build();
    }
}
