package com.example.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponse {

    Long id;
    int productQuantity;
    double productDiscount;
    double productPrice;
    ProductSizeResponse productSize;
    List<ProductCondimentDetailResponse> productCondimentDetails;
}
