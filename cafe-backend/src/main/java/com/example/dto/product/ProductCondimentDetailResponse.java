package com.example.dto.product;

import com.example.dto.codiment.CondimentResponse;
import com.example.entity.Condiment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCondimentDetailResponse {

     Long id;
     CondimentResponse condiment;
     int quantity;
     double condimentPrice;

}
