package com.example.dto.product;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SizePriceRequest {
    String name;
    @NotNull(message = "PRICE_REQUIRED")
    double price;
}
