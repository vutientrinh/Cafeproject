package com.example.repository;

import com.example.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findStaffByUsername(String username);
    boolean existsByUsername(String username);
    Staff getStaffById(Long id);
}
