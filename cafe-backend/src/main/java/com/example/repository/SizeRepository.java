package com.example.repository;

import com.example.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SizeRepository extends JpaRepository<Size, Long> {
    @Override
    Optional<Size> findById(Long id);
    Optional<Size> findByName(String name);
}
