package com.example.mapper;

import com.example.dto.staff.StaffCreationRequest;
import com.example.dto.staff.StaffResponse;
import com.example.dto.staff.StaffUpdateRequest;
import com.example.entity.Staff;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StaffMapper {

    private final ModelMapper mapper = new ModelMapper();
    public StaffResponse toResponse(Staff staff) {
        return mapper.map(staff, StaffResponse.class);
    }
    public Staff toEntity(StaffCreationRequest staffCreationRequest) {
        return mapper.map(staffCreationRequest, Staff.class);
    }
    public List<StaffResponse> toResponse(List<Staff> staffs) {
        List<StaffResponse> result = new ArrayList<>();
        staffs.forEach(staff -> result.add(toResponse(staff)));
        return result;
    }

    public void updateEntity(Staff staff, StaffUpdateRequest request) {
        mapper.map(request, staff);
    }

}
