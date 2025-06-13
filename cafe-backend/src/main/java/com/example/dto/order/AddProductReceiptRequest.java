package com.example.dto.order;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddProductReceiptRequest {
    Long productId;
    Long sizeId;
    Long receiptId;
    int quantity;
}
