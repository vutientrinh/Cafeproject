package com.example.service;

import com.example.dto.codiment.CondimentCreateRequest;
import com.example.dto.codiment.CondimentResponse;
import com.example.dto.codiment.CondimentUpdateRequest;

import java.util.List;

public interface ICondimentService {

    List<CondimentResponse> findAll();
    CondimentResponse findById(long id);
    CondimentResponse createCondiment(CondimentCreateRequest condimentCreateRequest);
    CondimentResponse updateCondiment(Long id, CondimentUpdateRequest condimentUpdateRequest);

    Boolean deleteCondiment(Long id);
}
