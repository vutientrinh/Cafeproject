package com.example.entity;


import com.example.util.ProductStatus;
import com.example.util.ProductType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String image;
    double discount;
    ProductType productType;
    ProductStatus productStatus;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<ProductSize> productSizes;
}
