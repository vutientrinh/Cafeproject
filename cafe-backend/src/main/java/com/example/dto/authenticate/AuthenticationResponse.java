package com.example.dto.authenticate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private boolean authenticated;
    private String token;
}
