package com.example.service;

import com.example.dto.authenticate.AuthenticationRequest;
import com.example.dto.authenticate.AuthenticationResponse;
import com.example.dto.authenticate.IntrospectRequest;
import com.example.dto.authenticate.IntrospectResponse;

public interface IAuthenticationService {
    AuthenticationResponse authenticate (AuthenticationRequest request);
    IntrospectResponse introspect(IntrospectRequest request);
}
