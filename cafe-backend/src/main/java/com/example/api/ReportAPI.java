package com.example.api;

import com.example.dto.ApiResponse;
import com.example.dto.receipt.ReceiptResponse;
import com.example.dto.report.TableRowProductResponse;
import com.example.dto.report.TableRowTotalResponse;
import com.example.service.IReportService;
import com.example.service.impl.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = {"/report"})
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportAPI {
    IReportService reportService;

    @GetMapping(value = "/year-report/{year}")
    public ApiResponse<List<TableRowTotalResponse>> getYearReport(@PathVariable String year) {
        return ApiResponse.<List<TableRowTotalResponse>>builder()
                .result(reportService.getYearReport(Integer.parseInt(year)))
                .build();
    }

    @GetMapping(value = "/product-report")
    public ApiResponse<List<TableRowProductResponse>> getProductReport(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                       @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59);
        return ApiResponse.<List<TableRowProductResponse>>builder()
                .result(reportService.getProductReport(start, end))
                .build();
    }
    @GetMapping(value = "/condiment-report")
    public ApiResponse<List<TableRowProductResponse>> getCondimentReport(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59);
        return ApiResponse.<List<TableRowProductResponse>>builder()
                .result(reportService.getCondimentReport(start, end))
                .build();
    }

    @GetMapping(value = "/product-type-report")
    public ApiResponse<List<TableRowProductResponse>> getProductTypeReport(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59);
        return ApiResponse.<List<TableRowProductResponse>>builder()
                .result(reportService.getProductTypeReport(start, end))
                .build();
    }


}
