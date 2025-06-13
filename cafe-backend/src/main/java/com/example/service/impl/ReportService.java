package com.example.service.impl;

import com.example.dto.report.TableRowProductResponse;
import com.example.dto.report.TableRowTotalResponse;
import com.example.entity.*;
import com.example.repository.ReceiptRepository;
import com.example.service.IReportService;
import com.example.util.ProductType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.Year;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportService implements IReportService {

    ReceiptRepository receiptRepository;
    private double roundToTwoDecimalPlaces(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
    @Override
    public List<TableRowTotalResponse> getYearReport(int year) {
        List<TableRowTotalResponse> responses = new ArrayList<>();
        String[] months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};

        for (int i = 0; i < 12; i++) {
            // Fetch all receipts for the given month and year
            List<Receipt> receipts = receiptRepository.findAllByDateBetween(
                    LocalDateTime.of(year, i+1, 1, 0, 0),
                    LocalDateTime.of(year, i+1, Month.of(i+1).length(Year.isLeap(year)), 23, 59)
            );

            // Initialize variables for total revenue, product quantity, condiment quantity, and discounted amount
            double totalRevenue = 0;
            int productQuantity = 0;
            int condimentQuantity = 0;
            double discounted = 0;

            // Iterate over each receipt
            for (Receipt receipt : receipts) {
                totalRevenue += receipt.getTotalPrice() * (1 - receipt.getDiscount());
                discounted += receipt.getTotalPrice() * receipt.getDiscount();

                // Iterate over each product detail
                for (ProductDetail productDetail : receipt.getProductDetails()) {
                    productQuantity += productDetail.getProductQuantity();
                    discounted += productDetail.getProductPrice() * productDetail.getProductDiscount();

                    // Iterate over each product condiment detail
                    for (ProductCondimentDetail productCondimentDetail : productDetail.getProductCondimentDetails()) {
                        condimentQuantity += productCondimentDetail.getQuantity();
                    }
                }
            }

            // Create and add the response for the month
            TableRowTotalResponse response = new TableRowTotalResponse();
            response.setLabel(months[i]);
            response.setTotalRevenue(roundToTwoDecimalPlaces(totalRevenue));
            response.setProductQuantity(productQuantity);
            response.setCondimentQuantity(condimentQuantity);
            response.setDiscounted(roundToTwoDecimalPlaces(discounted));
            responses.add(response);
        }

        return responses;
    }

    @Override
    public List<TableRowProductResponse> getProductReport(LocalDateTime timeStart, LocalDateTime timeEnd) {
        // Fetch all receipts between the start and end times
        List<Receipt> receipts = receiptRepository.findAllByDateBetween(timeStart, timeEnd);

        // Use a map to store the product report for each product
        Map<Product, TableRowProductResponse> productReports = new HashMap<>();

        // Iterate over each receipt
        for (Receipt receipt : receipts) {
            // Iterate over each product detail
            for (ProductDetail productDetail : receipt.getProductDetails()) {
                Product product = productDetail.getProductSize().getProduct();

                // Get the existing report for the product, or create a new one if it doesn't exist
                TableRowProductResponse report = productReports.getOrDefault(product, new TableRowProductResponse());
                report.setLabel(product.getName());

                // Update the report
                report.setTotalQuantity(report.getTotalQuantity() + productDetail.getProductQuantity());
                double revenue = productDetail.getProductPrice() * productDetail.getProductQuantity() * (1 - productDetail.getProductDiscount());
                report.setTotalRevenue(report.getTotalRevenue() + revenue);
                report.setDiscounted(report.getDiscounted() + productDetail.getProductPrice() * productDetail.getProductDiscount());

                // Put the updated report back into the map
                productReports.put(product, report);
            }
        }

        // Convert the map values to a list and return it
        return new ArrayList<>(productReports.values());
    }

    @Override
    public List<TableRowProductResponse> getCondimentReport(LocalDateTime timeStart, LocalDateTime timeEnd) {
        // Fetch all receipts between the start and end times
        List<Receipt> receipts = receiptRepository.findAllByDateBetween(timeStart, timeEnd);

        // Use a map to store the product report for each condiment
        Map<Condiment, TableRowProductResponse> condimentReports = new HashMap<>();

        // Iterate over each receipt
        for (Receipt receipt : receipts) {
            // Iterate over each product detail
            for (ProductDetail productDetail : receipt.getProductDetails()) {
                // Iterate over each product condiment detail
                for (ProductCondimentDetail productCondimentDetail : productDetail.getProductCondimentDetails()) {
                    Condiment condiment = productCondimentDetail.getCondiment();

                    // Get the existing report for the condiment, or create a new one if it doesn't exist
                    TableRowProductResponse report = condimentReports.getOrDefault(condiment, new TableRowProductResponse());
                    report.setLabel(condiment.getName());

                    // Update the report
                    report.setTotalQuantity(report.getTotalQuantity() + productCondimentDetail.getQuantity());
                    double revenue = productCondimentDetail.getCondimentPrice() * productCondimentDetail.getQuantity();
                    report.setTotalRevenue(report.getTotalRevenue() + revenue);

                    // Put the updated report back into the map
                    condimentReports.put(condiment, report);
                }
            }
        }

        // Convert the map values to a list and return it
        return new ArrayList<>(condimentReports.values());
    }

    @Override
    public List<TableRowProductResponse> getProductTypeReport(LocalDateTime timeStart, LocalDateTime timeEnd) {
        // Fetch all receipts between the start and end times
        List<Receipt> receipts = receiptRepository.findAllByDateBetween(timeStart, timeEnd);

        // Use a map to store the product report for each product type
        Map<ProductType, TableRowProductResponse> productTypeReports = new HashMap<>();

        // Iterate over each receipt
        for (Receipt receipt : receipts) {
            // Iterate over each product detail
            for (ProductDetail productDetail : receipt.getProductDetails()) {
                ProductType productType = productDetail.getProductSize().getProduct().getProductType();

                // Get the existing report for the product type, or create a new one if it doesn't exist
                TableRowProductResponse report = productTypeReports.getOrDefault(productType, new TableRowProductResponse());
                report.setLabel(productType.name());

                // Update the report
                report.setTotalQuantity(report.getTotalQuantity() + productDetail.getProductQuantity());
                double revenue = productDetail.getProductPrice() * productDetail.getProductQuantity() * (1 - productDetail.getProductDiscount());
                report.setTotalRevenue(report.getTotalRevenue() + revenue);
                report.setDiscounted(report.getDiscounted() + productDetail.getProductPrice() * productDetail.getProductDiscount());

                // Put the updated report back into the map
                productTypeReports.put(productType, report);
            }
        }

        // Convert the map values to a list and return it
        return new ArrayList<>(productTypeReports.values());
    }



}
