package com.example.service.impl;



import com.example.dto.product.ProductCreateRequest;
import com.example.dto.product.ProductResponse;

import com.example.dto.product.ProductUpdateRequest;
import com.example.dto.product.SizePriceRequest;
import com.example.entity.Product;
import com.example.entity.ProductSize;
import com.example.entity.Size;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.mapper.ProductMapper;
import com.example.repository.ProductRepository;
import com.example.repository.ProductSizeRepository;
import com.example.repository.SizeRepository;
import com.example.service.IProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService implements IProductService {


    ProductMapper productMapper;
    ProductRepository productRepository;
    ProductSizeRepository productSizeRepository;
    SizeRepository sizeRepository;
    ImageService imageService;
    @Override
    public ProductResponse createProduct(ProductCreateRequest productCreateRequest) {
        Product product = productMapper.toEntity(productCreateRequest);
        product = productRepository.save(product);
        for (SizePriceRequest sizePriceRequest: productCreateRequest.getSizes()) {
            Size size = sizeRepository.findByName(sizePriceRequest.getName()).get();
            ProductSize productSize = new ProductSize();
            productSize.setProduct(product);
            productSize.setSize(size);
            productSize.setPrice(sizePriceRequest.getPrice());
            productSize = productSizeRepository.save(productSize);
        }
        return productMapper.toResponse(product);
    }


    @Override
    public List<ProductResponse> getAll() {
        return productMapper.toResponse(productRepository.findAll());
    }

    @Override
    public ProductResponse findProductById(Long id) {

        return productMapper.toResponse(productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductUpdateRequest productUpdateRequest) {
        Product old = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        imageService.delete(old.getImage());
        Product product = productMapper.toEntity(productUpdateRequest);
        product.setId(id);
        product = productRepository.save(product);
        for (SizePriceRequest sizePriceRequest: productUpdateRequest.getSizes()) {
            Size size = sizeRepository.findByName(sizePriceRequest.getName()).get();
            ProductSize productSize = productSizeRepository.findProductSizeByProductAndSize(product, size);
            productSize.setPrice(sizePriceRequest.getPrice());
            productSize = productSizeRepository.save(productSize);
        }
        return productMapper.toResponse(product);
    }

    @Override
    public String uploadImage(MultipartFile multipartFile) {
        return imageService.upload(multipartFile);
    }
}
