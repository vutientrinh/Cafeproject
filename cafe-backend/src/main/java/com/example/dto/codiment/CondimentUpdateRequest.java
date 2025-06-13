package com.example.dto.codiment;

import com.example.util.ProductStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CondimentUpdateRequest {
    @Size(min = 1, max = 50, message = "NAME_INVALID")
    private String name;
    @NotNull(message = "PRICE_REQUIRED")
    double unitPrice;
    String image;
    @NotNull(message = "PRODUCT_STATUS_REQUIRED")
    ProductStatus productStatus;
}
