package com.example.mapper;

import com.example.dto.codiment.CondimentCreateRequest;
import com.example.dto.codiment.CondimentResponse;
import com.example.dto.codiment.CondimentUpdateRequest;
import com.example.entity.Condiment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CondimentMapper {
    private final ModelMapper mapper = new ModelMapper();

    public Condiment toEntity(CondimentCreateRequest condimentCreateRequest) {
        return mapper.map(condimentCreateRequest, Condiment.class);
    }
    public Condiment toEntity(CondimentUpdateRequest condimentUpdateRequest) {
        return mapper.map(condimentUpdateRequest, Condiment.class);
    }

    public CondimentResponse toResponse(Condiment condiment) {
        return mapper.map(condiment, CondimentResponse.class);
    }
    public List<CondimentResponse> toResponse(List<Condiment> condiments) {
        List<CondimentResponse> responses = new ArrayList<>();
        for (Condiment condiment : condiments) {
            responses.add(toResponse(condiment));
        }
        return responses;
    }
}
