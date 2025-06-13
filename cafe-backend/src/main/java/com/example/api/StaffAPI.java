package com.example.api;

import com.example.dto.ApiResponse;
import com.example.dto.staff.StaffCreationRequest;
import com.example.dto.staff.StaffResponse;
import com.example.dto.staff.StaffUpdateRequest;
import com.example.service.IStaffService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/manager")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StaffAPI {
    IStaffService staffService;
    @PostMapping(value = "/staffs")
    private ApiResponse<StaffResponse> createStaff(@RequestBody @Valid StaffCreationRequest userCreationRequest) {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.createStaff(userCreationRequest))
                .build();
    }

    @PostMapping
    private ApiResponse<StaffResponse> createManager(@RequestBody @Valid StaffCreationRequest userCreationRequest) {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.createManager(userCreationRequest))
                .build();
    }

    @GetMapping(value = "/staffs")
    private ApiResponse<List<StaffResponse>> findAll() {
        return ApiResponse.<List<StaffResponse>>builder()
                .result(staffService.findAll())
                .build();
    }

    @GetMapping(value = "/staffs/{id}")
    private ApiResponse<StaffResponse> findStaffById(@PathVariable("id") Long id) {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.findStaffById(id))
                .build();
    }

    @GetMapping(value = "/myInfo")
    private ApiResponse<StaffResponse> getMyInfo() {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.getMyInfo())
                .build();
    }

    @PutMapping(value = "/staffs/{id}")
    private ApiResponse<StaffResponse> updateStaff(@PathVariable("id") Long id, @RequestBody StaffUpdateRequest staffUpdateRequest) {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.updateStaff(id, staffUpdateRequest))
                .build();
    }
    @PutMapping(value = "/staffs")
    private ApiResponse<StaffResponse> updateStaffInfo(@RequestBody StaffUpdateRequest staffUpdateRequest) {
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.updateStaffInfo(staffUpdateRequest))
                .build();
    }

    @DeleteMapping(value = "/staffs/{id}")
    private ApiResponse<String> deleteStaff(@PathVariable("id") Long id) {
        String result;
        if(staffService.deleteStaff(id)) result = "Staff deleted successfully";
        else result = "Staff deleted failed";
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }
}
