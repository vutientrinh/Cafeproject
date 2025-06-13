package com.example.repository;

import com.example.entity.Condiment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CondimentRepository extends JpaRepository<Condiment, Long> {
    Optional<Condiment> findById(Long id);
}
