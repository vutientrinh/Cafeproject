package com.example.service.impl;

import com.example.configuration.Data;
import com.example.dto.authenticate.AuthenticationRequest;
import com.example.dto.authenticate.AuthenticationResponse;
import com.example.dto.authenticate.IntrospectRequest;
import com.example.dto.authenticate.IntrospectResponse;
import com.example.entity.Staff;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.repository.StaffRepository;
import com.example.service.IAuthenticationService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService implements IAuthenticationService {
    StaffRepository staffRepository;
    PasswordEncoder passwordEncoder;
    @Override
    public AuthenticationResponse authenticate (AuthenticationRequest request) {
        var staff = staffRepository.findStaffByUsername(request.getUsername())
                .orElseThrow( () -> new AppException(ErrorCode.USER_NOTFOUND));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), staff.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.WRONG_PASSWORD);

        var token = generateToken(staff);

        return AuthenticationResponse.builder()
                .authenticated(true)
                .token(token)
                .build();
    }

    //Check token is valid or not
    @Override
    public IntrospectResponse introspect(IntrospectRequest request) {
        String token = request.getToken();

        try {
            JWSVerifier verifier = new MACVerifier(Data.SIGNER_KEY.getBytes());
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date expiredTime = signedJWT.getJWTClaimsSet().getExpirationTime();
            boolean verified = signedJWT.verify(verifier);
            return IntrospectResponse.builder()
                    .valid(verified && expiredTime.after(new Date()))
                    .build();
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateToken(Staff staff) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(staff.getUsername())
                .issuer("cafe.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plusSeconds(3600).toEpochMilli()
                ))
                .claim("scope", staff.getRole())

                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(Data.SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

}
