package com.example.api;

import com.example.dto.ApiResponse;
import com.example.dto.customer.CustomerCreateRequest;
import com.example.dto.customer.CustomerResponse;

import com.example.service.ICustomerService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerAPI {

    ICustomerService customerService;

    @PostMapping
    public ApiResponse<CustomerResponse> addCustomer(@RequestBody @Valid CustomerCreateRequest customerCreateRequest) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.addCustomer(customerCreateRequest))
                .build();
    }

    @GetMapping({"/{id}"})
    public ApiResponse<CustomerResponse> getCustomerById(@PathVariable Long id) {
        CustomerResponse customer = customerService.getCustomerById(id);
        if (customer != null) {
            return ApiResponse.<CustomerResponse>builder()
                    .code(200)
                    .result(customer)
                    .message("Get customer successfully")
                    .build();
        } else {
            return ApiResponse.<CustomerResponse>builder()
                    .code(404)
                    .message("Customer not found")
                    .build();
        }
    }
    @GetMapping()
    public ApiResponse<List<CustomerResponse>> getALl() {
        return ApiResponse.<List<CustomerResponse>>builder()
                .code(200)
                .result(customerService.getAll())
                .build();

    }
}
