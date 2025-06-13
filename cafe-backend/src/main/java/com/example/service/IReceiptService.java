package com.example.service;

import com.example.dto.receipt.ReceiptResponse;
import com.example.entity.Receipt;

import java.util.List;

public interface IReceiptService {
    List<ReceiptResponse> getAll();

}
