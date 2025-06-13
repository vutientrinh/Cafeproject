package com.example.dto.product;


import com.example.util.ProductStatus;
import com.example.util.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String image;
    private double discount;
    private ProductType productType;
    private ProductStatus productStatus;
    private List<SizePriceResponse> sizes;

}
