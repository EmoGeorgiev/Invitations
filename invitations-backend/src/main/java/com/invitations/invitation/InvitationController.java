package com.invitations.invitation;

import com.invitations.dto.InvitationDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping
    public List<InvitationDto> getInvitations() {
        return invitationService.getInvitations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvitationDto> getInvitation(@PathVariable Long id) {
        InvitationDto invitationDto = invitationService.getInvitation(id);
        return ResponseEntity.ok()
               .body(invitationDto);
    }

    @PostMapping
    public ResponseEntity<InvitationDto> addInvitation(@RequestBody @Valid InvitationDto invitationDto) throws URISyntaxException {
        InvitationDto resultInvitationDto = invitationService.addInvitation(invitationDto);
        URI location = new URI("/invitations/" + resultInvitationDto.id());
        return ResponseEntity.created(location)
                .body(resultInvitationDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvitationDto> updateInvitation(@PathVariable Long id, @RequestBody @Valid InvitationDto invitationDto) {
        InvitationDto resultInvitationDto = invitationService.updateInvitation(id, invitationDto);
        return ResponseEntity.ok()
                .body(resultInvitationDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
        invitationService.deleteInvitation(id);
        return ResponseEntity.noContent()
                .build();
    }
}
