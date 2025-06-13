package com.example.service.impl;

import com.example.dto.codiment.CondimentCreateRequest;
import com.example.dto.codiment.CondimentResponse;
import com.example.dto.codiment.CondimentUpdateRequest;
import com.example.entity.Condiment;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.mapper.CondimentMapper;
import com.example.repository.CondimentRepository;
import com.example.service.ICondimentService;
import com.example.util.ProductStatus;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CondimentService implements ICondimentService {

    CondimentRepository condimentRepository;


    CondimentMapper condimentMapper;

    @Override
    public List<CondimentResponse> findAll() {
        return condimentMapper.toResponse(condimentRepository.findAll());
    }

    @Override
    public CondimentResponse findById(long id) {
        Condiment condiment = condimentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONDIMENTS_NOT_FOUND));
        return condimentMapper.toResponse(condiment);
    }

    @Override
    public CondimentResponse createCondiment(CondimentCreateRequest condimentCreateRequest) {
        Condiment condiment = condimentMapper.toEntity(condimentCreateRequest);
        condiment.setProductStatus(ProductStatus.ABLE);
        return condimentMapper.toResponse(condimentRepository.save(condiment));
    }

    @Override
    public CondimentResponse updateCondiment(Long id, CondimentUpdateRequest condimentUpdateRequest) {
        Condiment condiment = condimentMapper.toEntity(condimentUpdateRequest);
        condiment.setId(id);
        condiment = condimentRepository.save(condiment);
        return condimentMapper.toResponse(condiment);
    }

    @Override
    public Boolean deleteCondiment(Long id) {
        Condiment condiment = condimentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONDIMENTS_NOT_FOUND));
        condiment.setProductStatus(ProductStatus.ENABLE);
        condiment = condimentRepository.save(condiment);
        return true;
    }


}
