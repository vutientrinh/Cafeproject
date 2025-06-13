package com.example.mapper;


import com.example.dto.product.*;
import com.example.entity.Product;
import com.example.entity.ProductSize;
import com.example.entity.Size;
import com.example.repository.SizeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductMapper {
    @Autowired
    private SizeRepository sizeRepository;
    private final ModelMapper mapper = new ModelMapper();

    public Product toEntity(ProductCreateRequest productCreateRequest) {
        //base mapper
        Product product = mapper.map(productCreateRequest, Product.class);

        //SizePrice manual mapper
        List<ProductSize> productSizes = new ArrayList<>();
        for (SizePriceRequest sizePrice : productCreateRequest.getSizes()) {
            Size size = sizeRepository.findByName(sizePrice.getName()).get();
            ProductSize productSize = new ProductSize();
            productSize.setSize(size);
            productSize.setPrice(sizePrice.getPrice());
            productSizes.add(productSize);
        }
        product.setProductSizes(productSizes);
        return product;
    }
    public Product toEntity(ProductUpdateRequest productCreateRequest) {
        //base mapper
        Product product = mapper.map(productCreateRequest, Product.class);

        //SizePrice manual mapper
        List<ProductSize> productSizes = new ArrayList<>();
        for (SizePriceRequest sizePrice : productCreateRequest.getSizes()) {
            Size size = sizeRepository.findByName(sizePrice.getName()).get();
            ProductSize productSize = new ProductSize();
            productSize.setSize(size);
            productSize.setPrice(sizePrice.getPrice());
            productSizes.add(productSize);
        }
        product.setProductSizes(productSizes);
        return product;
    }
    public ProductResponse toResponse(Product product) {
        ProductResponse productResponse = mapper.map(product, ProductResponse.class);
        List<SizePriceResponse> sizePriceResponses = new ArrayList<>();
        for (ProductSize productSize: product.getProductSizes()) {
            SizePriceResponse sizePriceResponse = new SizePriceResponse();
            sizePriceResponse.setName(productSize.getSize().getName());
            sizePriceResponse.setPrice(productSize.getPrice());
            sizePriceResponses.add(sizePriceResponse);
        }
        productResponse.setSizes(sizePriceResponses);
        return productResponse;
    }
    public List<ProductResponse> toResponse(List<Product> products) {
        List<ProductResponse> result = new ArrayList<>();
        for (Product product:products) {
            result.add(toResponse(product));
        }
        return result;
    }

}
