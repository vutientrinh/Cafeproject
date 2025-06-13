package com.example.service;

import com.example.dto.order.*;
import com.example.dto.receipt.ReceiptResponse;

import javax.swing.text.StyledEditorKit;

public interface IOrderService {

    ReceiptResponse getProcessReceiptOfStaff();
    ReceiptResponse createNewOrder();
    ReceiptResponse updateCustomerReceipt(UpdateCustomerReceiptRequest updateCustomerReceiptRequest);
    ReceiptResponse addProductReceipt(AddProductReceiptRequest addProductReceiptRequest);
    ReceiptResponse addCondimentReceipt(AddCondimentReceiptRequest addCondimentReceiptRequest);
    ReceiptResponse updateProductReceipt(UpdateProductReceiptRequest updateProductReceiptRequest);
    ReceiptResponse updateCondimentReceipt(UpdateCondimentReceiptRequest updateCondimentReceiptRequest);
    ReceiptResponse finishOrder(Long id);
    Boolean deleteOrder(Long id);
    ReceiptResponse deleteProductReceipt(Long id);
    ReceiptResponse deleteCondimentReceipt(Long id);
    ReceiptResponse removeCustomerReceipt(Long receiptId);

    Boolean checkGiftCustomer(Long customerId);
    ReceiptResponse addGiffCustomer(AddGiftCustomer addGiftCustomer);
}