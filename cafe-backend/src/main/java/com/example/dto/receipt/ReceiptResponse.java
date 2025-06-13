package com.example.dto.receipt;

import com.example.dto.customer.CustomerResponse;
import com.example.dto.product.ProductDetailResponse;
import com.example.dto.staff.StaffResponse;
import com.example.util.ReceiptStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptResponse {
    Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime date;
    double discount;
    double totalPrice;
    ReceiptStatus receiptStatus;
    StaffResponse staff;
    CustomerResponse customer;
    List<ProductDetailResponse> productDetails;
}
