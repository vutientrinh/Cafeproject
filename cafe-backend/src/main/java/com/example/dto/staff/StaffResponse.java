package com.example.dto.staff;

import com.example.util.Gender;
import com.example.util.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffResponse {
    Long id;
    String firstName;
    String lastName;
    Gender gender;
    Role role;
    String address;
    String phoneNumber;
    String email;
    String userName;
}
