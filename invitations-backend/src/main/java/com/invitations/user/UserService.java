package com.invitations.user;

import com.invitations.dto.UserDto;
import com.invitations.enums.Role;
import com.invitations.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(user -> user.getRole() != Role.ADMIN)
                .map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getActivatedUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(user -> user.getRole() != Role.ADMIN)
                .filter(AppUser::isEnabled)
                .map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getNotActivatedUsers() {
        return userRepository.findNotEnabledUsers()
                .stream()
                .map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    public UserDto enableUser(Long id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("There does not exist such a user"));

        user.setEnabled(true);
        AppUser newUser = userRepository.save(user);
        return UserMapper.userToUserDto(newUser);
    }

    public UserDto disableUser(Long id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("There does not exist such a user"));

        user.setEnabled(false);
        AppUser newUser = userRepository.save(user);
        return UserMapper.userToUserDto(newUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("There does not exist such a user");
        }
        userRepository.deleteById(id);
    }
}
