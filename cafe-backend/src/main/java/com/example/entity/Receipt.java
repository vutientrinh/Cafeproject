package com.example.entity;


import com.example.util.ReceiptStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime date;
    double discount;
    double totalPrice;
    ReceiptStatus receiptStatus;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "receipt", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    private List<ProductDetail> productDetails;

    public void updateTotalPrice() {
        double total = 0;
        for (ProductDetail productDetail: getProductDetails()) {
            total += productDetail.getProductPrice()*productDetail.getProductQuantity()*(1-productDetail.getProductDiscount());
            if (productDetail.getProductCondimentDetails() != null) {
                for (ProductCondimentDetail productCondimentDetail: productDetail.getProductCondimentDetails()) {
                    total += productCondimentDetail.getCondimentPrice()* productCondimentDetail.getQuantity()*productDetail.getProductQuantity();
                }
            }
        }
        double roundedTotal = Math.round(total * 100.0) / 100.0; // rounding to 2 decimal places
        setTotalPrice(roundedTotal);
    }

}
