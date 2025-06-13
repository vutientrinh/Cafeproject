package com.example.api;

import com.example.dto.ApiResponse;

import com.example.dto.product.ProductCreateRequest;
import com.example.dto.product.ProductResponse;
import com.example.dto.product.ProductUpdateRequest;
import com.example.exeption.ErrorCode;
import com.example.service.IImageService;
import com.example.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = {"/product"})
public class ProductAPI {
    @Autowired
    private IProductService productService;

    @PostMapping
    public ApiResponse<ProductResponse> createProduct(@RequestBody @Valid  ProductCreateRequest productCreateRequest) {
        ProductResponse result = productService.createProduct(productCreateRequest);
        return ApiResponse.<ProductResponse>builder()
                .code(ErrorCode.PRODUCT_CREATE_SUCCESSFULLY.getCode())
                .message(ErrorCode.PRODUCT_CREATE_SUCCESSFULLY.getMessage())
                .result(result)
                .build();
    }

    @PostMapping(value = "/upload-image")
    public ApiResponse<String> uploadImage(@RequestParam("image") MultipartFile multipartFile) {
        return ApiResponse.<String>builder()
                .result(productService.uploadImage(multipartFile))
                .build();
    }

    @GetMapping(value = "/{id}")
    public ApiResponse<ProductResponse> findProductById(@PathVariable("id") Long id) {
        ProductResponse result = productService.findProductById(id);
        return ApiResponse.<ProductResponse>builder()
                .result(result)
                .build();
    }

    @GetMapping
    public ApiResponse<List<ProductResponse>> findAll() {
        List<ProductResponse> result = productService.getAll();
        return ApiResponse.<List<ProductResponse>>builder()
                .result(result)
                .build();
    }

    @PutMapping(value = "/{id}")
    public ApiResponse<ProductResponse> updateProduct(@PathVariable("id") Long id, @RequestBody @Valid ProductUpdateRequest productUpdateRequest) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.updateProduct(id, productUpdateRequest))
                .build();
    }

}