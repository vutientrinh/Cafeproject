package com.example.repository;

import com.example.entity.CustomerRank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRankRepository extends JpaRepository<CustomerRank, Long> {
}
