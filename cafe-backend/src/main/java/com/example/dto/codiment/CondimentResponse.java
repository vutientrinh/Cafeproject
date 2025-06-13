package com.example.dto.codiment;

import com.example.util.ProductStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CondimentResponse {
    Long id;
    String name;
    String image;
    double unitPrice;
    ProductStatus productStatus;
}
