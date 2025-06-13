package com.example.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "receipt_id")
    Receipt receipt;

    @ManyToOne
    @JoinColumn(name = "product_size_id")
    ProductSize productSize;

    int productQuantity;
    double productDiscount;
    double productPrice;

    @OneToMany(mappedBy = "productDetail", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    List<ProductCondimentDetail> productCondimentDetails;
}
