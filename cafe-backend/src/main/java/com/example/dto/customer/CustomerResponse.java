package com.example.dto.customer;

import com.example.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    Long id;
    String firstName;
    String lastName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date dateOfBirth;
    double totalSpend;
    Gender gender;
    String phoneNumber;
    String rankName;
}
