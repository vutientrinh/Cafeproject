package com.example.repository;

import com.example.entity.Product;
import com.example.util.ProductStatus;
import com.example.util.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    List<Product> findAll();
    Optional<Product> findByNameAndImageAndDiscountAndProductTypeAndProductStatus(
            String name,
            String image,
            double discount,
            ProductType productType,
            ProductStatus productStatus
    );
}
