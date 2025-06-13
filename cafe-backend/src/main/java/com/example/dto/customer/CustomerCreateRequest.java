package com.example.dto.customer;

import com.example.util.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CustomerCreateRequest {

    @Size(min = 1, max = 50, message = "FIRSTNAME_INVALID")
    String firstName;

    @Size(min = 1, max = 50, message = "LASTNAME_INVALID")
    String lastName;
    @NotNull(message = "DATEOFBIRTH_REQUIRED")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date dateOfBirth;
    Gender gender;
    @Pattern(regexp="(^$|[0-9]{10})", message = "PHONENUMBER_INVALID")
    String phoneNumber;
}
