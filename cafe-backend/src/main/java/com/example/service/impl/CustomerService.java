package com.example.service.impl;

import com.example.dto.customer.CustomerCreateRequest;
import com.example.dto.customer.CustomerResponse;
import com.example.entity.Customer;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.mapper.CustomerMapper;
import com.example.repository.CustomerRankRepository;
import com.example.repository.CustomerRepository;
import com.example.service.ICustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService implements ICustomerService {

    CustomerRepository customerRepository;
    CustomerRankRepository customerRankRepository;
    CustomerMapper customerMapper;
    @Override
    public CustomerResponse addCustomer(CustomerCreateRequest customerCreateRequest){
        // Check if a customer with the given phone number already exists
        Optional<Customer> existingCustomer = customerRepository.findCustomersByPhoneNumber(customerCreateRequest.getPhoneNumber());
        if (existingCustomer.isPresent()) {
            // If a customer with the given phone number exists, throw an AppException
            throw new AppException(ErrorCode.CUSTOMER_EXIST);
        }

        // If no such customer exists, proceed with saving the new customer
        Customer customer = customerMapper.toCustomer(customerCreateRequest);
        customer.setCustomerRank(customerRankRepository.findById(1L).orElseThrow());
        customerRepository.save(customer);
        return customerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse getCustomerById(Long id){
        return customerMapper.toResponse(customerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND)));
    }

    @Override
    public List<CustomerResponse> getAll() {
        return customerMapper.toResponse(customerRepository.findAll());
    }
}
