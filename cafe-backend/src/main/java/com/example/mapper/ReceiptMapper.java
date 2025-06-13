package com.example.mapper;

import com.example.dto.receipt.ReceiptResponse;
import com.example.entity.Receipt;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReceiptMapper {


    private final ModelMapper mapper = new ModelMapper();

    public ReceiptResponse toResponse(Receipt receipt) {
        return mapper.map(receipt, ReceiptResponse.class);
    }

    public List<ReceiptResponse> toResponse(List<Receipt> receipt) {
        List<ReceiptResponse> responses = new ArrayList<>();
        for (Receipt r:receipt
             ) {
            responses.add(toResponse(r));
        }
        return responses;
    }


}