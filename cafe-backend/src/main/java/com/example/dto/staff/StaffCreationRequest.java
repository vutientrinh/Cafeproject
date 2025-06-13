package com.example.dto.staff;

import com.example.util.Gender;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffCreationRequest {

    @Size(min = 8, max = 20, message = "PASSWORD_INVALID")
    String password;
    @Size(min = 8, max = 20, message = "USERNAME_INVALID")
    String username;
    @Size(min = 1, max = 50, message = "FIRSTNAME_INVALID")
    String firstName;

    @Size(min = 1, max = 50, message = "LASTNAME_INVALID")
    String lastName;
    Gender gender;
    String address;
    @Pattern(regexp="(^$|[0-9]{10})", message = "PHONENUMBER_INVALID")
    String phoneNumber;

    @Email(message = "EMAIL_INVALID")
    String email;
}
