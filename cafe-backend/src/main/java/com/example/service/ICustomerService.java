package com.example.service;

import com.example.dto.customer.CustomerCreateRequest;
import com.example.dto.customer.CustomerResponse;

import java.util.List;

public interface ICustomerService {

    CustomerResponse addCustomer(CustomerCreateRequest customerCreateRequest);
    CustomerResponse getCustomerById(Long id);
    List<CustomerResponse> getAll();
}
