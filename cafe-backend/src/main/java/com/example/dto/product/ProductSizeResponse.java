package com.example.dto.product;

import com.example.util.ProductStatus;
import com.example.util.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSizeResponse {

    private Long id;
    private String productName;
    private String image;
    private double discount;
    private ProductType productType;
    private ProductStatus productStatus;
    private String sizeName;
    Long price;
}
