package com.example.repository;

import com.example.entity.Product;
import com.example.entity.ProductSize;
import com.example.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
//    Optional<ProductSize> findByProductIdAndSizeId(Long productId, Long productSizeId);
    ProductSize findProductSizeByProductAndSize(Product product, Size size);
}
