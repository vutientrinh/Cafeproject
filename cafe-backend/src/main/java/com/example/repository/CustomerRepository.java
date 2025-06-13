package com.example.repository;

import com.example.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Override
    Optional<Customer> findById(Long aLong);
    Customer findCustomersById(Long id);
    List<Customer> findCustomerByPhoneNumber(String phoneNumber);
    Optional<Customer> findCustomersByPhoneNumber(String phoneNumber);
}
