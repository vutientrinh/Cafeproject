package com.example.api;


import com.example.dto.ApiResponse;
import com.example.dto.receipt.ReceiptResponse;
import com.example.dto.staff.StaffResponse;
import com.example.entity.Receipt;
import com.example.service.impl.ReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/receipt")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReceiptAPI {
    ReceiptService receiptService;
    @GetMapping
    public ApiResponse<List<ReceiptResponse>> getAll() {
        return ApiResponse.<List<ReceiptResponse>>builder()
                .result(receiptService.getAll())
                .build();
    }
}