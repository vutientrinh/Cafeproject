package com.example.service.impl;

import com.example.dto.receipt.ReceiptResponse;
import com.example.entity.Receipt;
import com.example.mapper.ReceiptMapper;
import com.example.repository.ReceiptRepository;
import com.example.service.IReceiptService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReceiptService implements IReceiptService {

    ReceiptRepository receiptRepository;
    ReceiptMapper receiptMapper;
    @Override
    public List<ReceiptResponse> getAll() {

        return receiptMapper.toResponse(receiptRepository.findAll());
    }
}
