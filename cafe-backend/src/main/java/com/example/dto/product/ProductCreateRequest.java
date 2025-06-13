package com.example.dto.product;

import com.example.util.ProductStatus;
import com.example.util.ProductType;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {
    @Size(min = 1, max = 50, message = "NAME_INVALID")
    private String name;
    private String image;
    private double discount;
    @NotNull(message = "PRODUCT_TYPE_REQUIRED")
    private ProductType productType;
    @NotNull(message = "PRODUCT_STATUS_REQUIRED")
    private ProductStatus productStatus;
    private List<SizePriceRequest> sizes;
}
