package com.example.dto.order;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCondimentReceiptRequest {
    Long productCondimentDetailId;
    int quantity;
}
