package com.example.mapper;

import com.example.dto.customer.CustomerCreateRequest;
import com.example.dto.customer.CustomerResponse;
import com.example.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerMapper {

    private final ModelMapper mapper = new ModelMapper();
    public Customer toCustomer(CustomerCreateRequest customerCreateRequest){
        return mapper.map(customerCreateRequest,Customer.class);
    }

    public CustomerResponse toResponse(Customer customer) {
        return mapper.map(customer, CustomerResponse.class);
    }

    public List<CustomerResponse> toResponse(List<Customer> customers) {
        List<CustomerResponse> result = new ArrayList<>();
        customers.forEach(customer -> result.add(toResponse(customer)));
        return result;

    }


}
