package com.example.service.impl;

import com.example.dto.staff.StaffCreationRequest;
import com.example.dto.staff.StaffResponse;
import com.example.dto.staff.StaffUpdateRequest;
import com.example.entity.Receipt;
import com.example.entity.Staff;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.mapper.StaffMapper;
import com.example.repository.ReceiptRepository;
import com.example.repository.StaffRepository;
import com.example.service.IStaffService;
import com.example.util.Role;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StaffService implements IStaffService {

    StaffRepository staffRepository;
    StaffMapper staffMapper;
    PasswordEncoder passwordEncoder;
    ReceiptRepository receiptRepository;

    @Override
    @PreAuthorize("hasRole('MANAGER')")
    public StaffResponse createStaff(StaffCreationRequest request) {
        if (staffRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXISTED);
        Staff staff = staffMapper.toEntity(request);
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        staff.setRole(Role.STAFF);
        staff = staffRepository.save(staff);
        return staffMapper.toResponse(staff);
    }

    @Override
    @PreAuthorize("hasRole('MANAGER')")
    public List<StaffResponse> findAll() {
        return staffMapper.toResponse(staffRepository.findAll());
    }

    @Override
    @PreAuthorize("hasRole('MANAGER')")
    public StaffResponse findStaffById(Long id) {
        return staffMapper.toResponse(staffRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND)));
    }

    @Override
    @PreAuthorize("hasRole('MANAGER')")
    public StaffResponse updateStaff(Long id, StaffUpdateRequest request) {
        Staff staff = staffRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        staffMapper.updateEntity(staff,request);
        staff.setPassword(passwordEncoder.encode(request.getPassword()));
        return staffMapper.toResponse(staffRepository.save(staff));
    }
    @Override
    @PreAuthorize("hasRole('STAFF')")
    public StaffResponse updateStaffInfo(StaffUpdateRequest request) {
        //get data of user after login
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Staff staff = staffRepository.findStaffByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        staffMapper.updateEntity(staff,request);
        staff.setPassword(passwordEncoder.encode(request.getPassword()));
        return staffMapper.toResponse(staffRepository.save(staff));
    }

    @Override
    @PreAuthorize("hasRole('MANAGER')")
    public boolean deleteStaff(Long id)
    {
        Staff staff = staffRepository.getStaffById(id);
        staff.setUsername("");
        staff = staffRepository.save(staff);
        return true;
    }

    @Override
    public StaffResponse getMyInfo() {
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Staff staff = staffRepository.findStaffByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        return staffMapper.toResponse(staff);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public StaffResponse createManager(StaffCreationRequest request) {
        if (staffRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXISTED);
        Staff staff = staffMapper.toEntity(request);
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        staff.setRole(Role.MANAGER);
        staff = staffRepository.save(staff);
        return staffMapper.toResponse(staff);
    }
    @Override
    public void saveReceipt(Long staffId, Receipt receipt){
        Staff staff = staffRepository.findById(staffId).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOTFOUND));
        staff.getReceipts().add(receipt);
        staffRepository.save(staff);
    }
}
