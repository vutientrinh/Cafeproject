package com.example.dto.report;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRowProductResponse {
    String label;
    int totalQuantity;
    double totalRevenue;
    double discounted;
}
