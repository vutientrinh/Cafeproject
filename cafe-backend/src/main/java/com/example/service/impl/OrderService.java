package com.example.service.impl;

import com.example.dto.order.*;
import com.example.dto.receipt.ReceiptResponse;
import com.example.entity.*;
import com.example.exeption.AppException;
import com.example.exeption.ErrorCode;
import com.example.mapper.ReceiptMapper;
import com.example.repository.*;
import com.example.service.IOrderService;
import com.example.util.ReceiptStatus;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {
    ReceiptRepository receiptRepository;
    StaffRepository staffRepository;
    CustomerRepository customerRepository;
    ProductRepository productRepository;
    ReceiptMapper receiptMapper;
    SizeRepository sizeRepository;
    ProductSizeRepository productSizeRepository;
    ProductDetailRepository productDetailRepository;
    CondimentRepository condimentRepository;
    ProductCondimentDetailRepository productCondimentDetailRepository;
    CustomerRankRepository customerRankRepository;
    @Override
    public ReceiptResponse getProcessReceiptOfStaff() {
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Staff staff = staffRepository.findStaffByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        List<Receipt> receipts = receiptRepository.findReceiptByStaffAndReceiptStatusOrderByDateDesc(staff, ReceiptStatus.PROGRESS);
        if (receipts.isEmpty()) return null;
        else return receiptMapper.toResponse(receipts.get(0));
    }
    @Override
    public ReceiptResponse createNewOrder() {
        //get current staff credential through token
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Staff staff = staffRepository.findStaffByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        LocalDateTime localDateTime = LocalDateTime.now();

        //mapper
        Receipt receipt = new Receipt();
        receipt.setDiscount(0);
        receipt.setTotalPrice(0);
        receipt.setStaff(staff);
        receipt.setReceiptStatus(ReceiptStatus.PROGRESS);
        receipt.setDate(localDateTime);

        //save and return
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }
    @Override
    public ReceiptResponse updateCustomerReceipt(UpdateCustomerReceiptRequest updateCustomerReceiptRequest) {
        Receipt receipt = receiptRepository.findReceiptById(updateCustomerReceiptRequest.getReceiptId());
        Customer customer = customerRepository.findCustomersById(updateCustomerReceiptRequest.getCustomerId());
        receipt.setCustomer(customer);
        //add discount
        receipt.setDiscount(customer.getCustomerRank().getDiscount());
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }
    @Override
    public ReceiptResponse addProductReceipt(AddProductReceiptRequest addProductReceiptRequest) {
        //find objects in database
        Product product = productRepository.findById(addProductReceiptRequest.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        Size size = sizeRepository.findById(addProductReceiptRequest.getSizeId())
                .orElseThrow(() -> new AppException((ErrorCode.SIZE_NOT_FOUND)));
        Receipt receipt = receiptRepository.findReceiptById(addProductReceiptRequest.getReceiptId());
        ProductSize productSize = productSizeRepository.findProductSizeByProductAndSize(product, size);

        //mapper
        ProductDetail productDetail = new ProductDetail();
        productDetail.setReceipt(receipt);
        productDetail.setProductSize(productSize);
        productDetail.setProductQuantity(addProductReceiptRequest.getQuantity());
        productDetail.setProductPrice(productSize.getPrice());
        productDetail.setProductDiscount(product.getDiscount());

        productDetail = productDetailRepository.save(productDetail);
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receiptRepository.findReceiptById(receipt.getId()));
    }
    @Override
    public ReceiptResponse addCondimentReceipt(AddCondimentReceiptRequest addCondimentReceiptRequest) {

        ProductDetail productDetail = productDetailRepository.findById(addCondimentReceiptRequest.getProductDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED));
        Condiment condiment = condimentRepository.findById(addCondimentReceiptRequest.getCondimentId())
                .orElseThrow(() -> new AppException(ErrorCode.CONDIMENTS_NOT_FOUND));
        ProductCondimentDetail productCondimentDetail = new ProductCondimentDetail();

        //mapper
        productCondimentDetail.setCondiment(condiment);
        productCondimentDetail.setProductDetail(productDetail);
        productCondimentDetail.setQuantity(addCondimentReceiptRequest.getQuantity());
        productCondimentDetail.setCondimentPrice(condiment.getUnitPrice());


        //save
        productCondimentDetail = productCondimentDetailRepository.save(productCondimentDetail);
        Receipt receipt = productCondimentDetail.getProductDetail().getReceipt();
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }
    @Override
    public ReceiptResponse updateProductReceipt(UpdateProductReceiptRequest updateProductReceiptRequest) {
        ProductDetail productDetail = productDetailRepository.findById(updateProductReceiptRequest.getProductDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED));

        productDetail.setProductQuantity(updateProductReceiptRequest.getQuantity());
        productDetail = productDetailRepository.save(productDetail);
        Receipt receipt = productDetail.getReceipt();
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }

    @Override
    public ReceiptResponse updateCondimentReceipt(UpdateCondimentReceiptRequest updateCondimentReceiptRequest) {
        ProductCondimentDetail productCondimentDetail = productCondimentDetailRepository.findById(updateCondimentReceiptRequest.getProductCondimentDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED));

        productCondimentDetail.setQuantity(updateCondimentReceiptRequest.getQuantity());
        productCondimentDetail = productCondimentDetailRepository.save(productCondimentDetail);
        Receipt receipt = productCondimentDetail.getProductDetail().getReceipt();
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }

    @Override
    public ReceiptResponse finishOrder(Long id) {
        Receipt receipt = receiptRepository.findReceiptById(id);
        receipt.setReceiptStatus(ReceiptStatus.FINISHED);
        if (receipt.getCustomer() != null)
        {
            Customer customer = receipt.getCustomer();
            customer.setTotalSpend(customer.getTotalSpend() + receipt.getTotalPrice()*(1-receipt.getDiscount()));

            // Retrieve all CustomerRank entities and sort them by threshold
            List<CustomerRank> ranks = customerRankRepository.findAll(Sort.by(Sort.Direction.ASC, "threshold"));

            // Find the highest rank for which the customer's totalSpend is greater than or equal to the threshold
            for (int i = ranks.size() - 1; i >= 0; i--) {
                if (customer.getTotalSpend() >= ranks.get(i).getThreshold()) {
                    customer.setCustomerRank(ranks.get(i));
                    break;
                }
            }

            customer = customerRepository.save(customer);
        }
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }


    @Override
    public Boolean deleteOrder(Long id) {
        if (receiptRepository.findReceiptById(id).getReceiptStatus() != ReceiptStatus.FINISHED) {
            receiptRepository.deleteById(id);
            return true;
        }
        else return false;
    }

    @Override
    public ReceiptResponse deleteProductReceipt(Long id) {
        Long receiptId = productDetailRepository.findById(id).get().getReceipt().getId();
        productDetailRepository.deleteById(id);
        Receipt receipt = receiptRepository.findReceiptById(receiptId);
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receiptRepository.findReceiptById(receiptId));
    }

    @Override
    public ReceiptResponse deleteCondimentReceipt(Long id) {
        Long receiptId = productCondimentDetailRepository.findById(id).get()
                .getProductDetail()
                .getReceipt()
                .getId();

        productCondimentDetailRepository.deleteById(id);
        Receipt receipt = receiptRepository.findReceiptById(receiptId);
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }

    @Override
    public ReceiptResponse removeCustomerReceipt(Long receiptId) {
        Receipt receipt = receiptRepository.findReceiptById(receiptId);
        receipt.setCustomer(null);
        receipt.setDiscount(0);
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receipt);
    }

    public Boolean checkGiftCustomer(Long customerId) {
        // Get the current year
        int currentYear = LocalDate.now().getYear();

        // Get the customer
        Customer customer = customerRepository.findById(customerId).get();

        // Get all receipts of the customer in the current year
        List<Receipt> receipts = receiptRepository.findReceiptByDate_YearAndCustomer(currentYear, customer);

        // Check all product details of all the receipts
        for (Receipt receipt : receipts) {
            for (ProductDetail productDetail : receipt.getProductDetails()) {
                // If there is a productDetail that has productPrice = 0, return false
                if (productDetail.getProductPrice() == 0) {
                    return false;
                }
            }
        }

        // If no productDetail has productPrice = 0, return true
        return true;
    }

    @Override
    public ReceiptResponse addGiffCustomer(AddGiftCustomer addGiftCustomer) {
        Product product = productRepository.findById(addGiftCustomer.getFoodId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        Size size = sizeRepository.findById(3L)
                .orElseThrow(() -> new AppException((ErrorCode.SIZE_NOT_FOUND)));
        Receipt receipt = receiptRepository.findReceiptById(addGiftCustomer.getReceiptId());
        ProductSize productSize = productSizeRepository.findProductSizeByProductAndSize(product, size);

        //mapper
        ProductDetail productDetail = new ProductDetail();
        productDetail.setReceipt(receipt);
        productDetail.setProductSize(productSize);
        productDetail.setProductQuantity(1);
        productDetail.setProductPrice(0);
        productDetail.setProductDiscount(product.getDiscount());

        productDetail = productDetailRepository.save(productDetail);
        receipt.updateTotalPrice();
        receipt = receiptRepository.save(receipt);
        return receiptMapper.toResponse(receiptRepository.findReceiptById(receipt.getId()));
    }
}