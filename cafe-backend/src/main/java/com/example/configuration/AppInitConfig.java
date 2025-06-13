package com.example.configuration;

import com.example.entity.CustomerRank;
import com.example.entity.Size;
import com.example.entity.Staff;
import com.example.repository.CustomerRankRepository;
import com.example.repository.SizeRepository;
import com.example.repository.StaffRepository;
import com.example.util.Role;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppInitConfig {

    PasswordEncoder passwordEncoder;
    SizeRepository sizeRepository;

    CustomerRankRepository customerRankRepository;
    @Bean
    ApplicationRunner applicationRunner(StaffRepository staffRepository){
        return args -> {
            if (staffRepository.findStaffByUsername("admin").isEmpty()){
                Staff user = new Staff();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin"));
                user.setRole(Role.ADMIN);
                staffRepository.save(user);
                Staff manager = new Staff();
                manager.setUsername("managerCafe123");
                manager.setPassword(passwordEncoder.encode("managerCafe123"));
                manager.setRole(Role.MANAGER);
                staffRepository.save(manager);
            }
        };
    }
    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            if (sizeRepository.count() == 0) {
                sizeRepository.save(new Size(1L, "S"));
                sizeRepository.save(new Size(2L, "M"));
                sizeRepository.save(new Size(3L, "L"));
            }
        };
    }
    @Bean
    CommandLineRunner initCustomerRanks() {
        return args -> {
            if(customerRankRepository.count() == 0) {
                customerRankRepository.save(new CustomerRank(null, "Unranked", 0, 0));
                customerRankRepository.save(new CustomerRank(null, "Bronze", 10, 0.02));
                customerRankRepository.save(new CustomerRank(null, "Silver", 20, 0.04));
                customerRankRepository.save(new CustomerRank(null, "Gold", 30, 0.06));
                customerRankRepository.save(new CustomerRank(null, "Emerald", 40, 0.08));
                customerRankRepository.save(new CustomerRank(null, "Diamond", 50, 0.1));
            }
        };
    }
}
