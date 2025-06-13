package com.example.service;

import com.example.dto.report.TableRowProductResponse;
import com.example.dto.report.TableRowTotalResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface IReportService {
    List<TableRowTotalResponse> getYearReport(int year);

    List<TableRowProductResponse> getProductReport(LocalDateTime timeStart, LocalDateTime timeEnd);

    public List<TableRowProductResponse> getCondimentReport(LocalDateTime timeStart, LocalDateTime timeEnd);

    public List<TableRowProductResponse> getProductTypeReport(LocalDateTime timeStart, LocalDateTime timeEnd);

}
