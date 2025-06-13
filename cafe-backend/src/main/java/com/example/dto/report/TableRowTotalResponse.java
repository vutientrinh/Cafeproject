package com.example.dto.report;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRowTotalResponse {
    String label;
    double totalRevenue;
    int productQuantity;
    int condimentQuantity;
    double discounted;
}
