package com.example.exeption;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
public enum ErrorCode {
    UNCATEGORIZED(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    KEY_INVALID(9998, "Key is invalid", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1001, "User is existed",HttpStatus.BAD_REQUEST),
    USER_NOTFOUND(1002, "User not found",HttpStatus.NOT_FOUND),
    USERNAME_INVALID(1003, "Username must be at least 8 characters and maximum 20 characters",HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1011, "Password must be at least 8 characters and maximum 20 characters",HttpStatus.BAD_REQUEST),
    FIRSTNAME_INVALID(1012, "First name is Invalid",HttpStatus.BAD_REQUEST),
    LASTNAME_INVALID(1013, "Last name is Invalid",HttpStatus.BAD_REQUEST),
    PHONENUMBER_INVALID(1014, "Phone is Invalid",HttpStatus.BAD_REQUEST),
    NAMER_INVALID(1015, "Name is Invalid",HttpStatus.BAD_REQUEST),
    DATEOFBIRTH_REQUIRED(1016,"Select date of birth",HttpStatus.BAD_REQUEST),
    PRICE_REQUIRED(1017,"Price is invalid ",HttpStatus.BAD_REQUEST),
    PRODUCT_TYPE_REQUIRED(1018,"Select type of Product",HttpStatus.BAD_REQUEST),
    PRODUCT_STATUS_REQUIRED(1019,"Select status of Product",HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1006, "You are not allowed!", HttpStatus.FORBIDDEN),
    WRONG_PASSWORD(1007,"The password is wrong!!", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND(1008, "Product not found", HttpStatus.NOT_FOUND),
    CONDIMENTS_NOT_FOUND(1009, "Condiments not found", HttpStatus.NOT_FOUND),
    SIZE_NOT_FOUND(1010, "Size not found", HttpStatus.NOT_FOUND),
    PRODUCT_CREATE_SUCCESSFULLY(200, "Product create successfully", HttpStatus.OK),
    PRODUCT_DELETE_SUCCESSFULLY(200, "Product delete successfully", HttpStatus.OK),
    PRODUCT_UPDATE_SUCCESSFULLY(200, "Product update successfully", HttpStatus.OK),
    ORDER_PLACED_SUCCESSFULLY(200, "Order placed successfully", HttpStatus.OK),
    ORDER_DELETED_SUCCESSFULLY(201, "Order deleted successfully", HttpStatus.OK),
    CART_IS_EMPTY(202, "Cart is empty", HttpStatus.BAD_REQUEST),
    INVALID_INDEX(203, "Order not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(204, "Invalid token", HttpStatus.BAD_REQUEST),
    RECEIPT_CREATE_SUCCESSFULLY(200, "Receipt create successfully", HttpStatus.OK),
    CUSTOMER_EXIST(1100, "Customer with phone number is already exist", HttpStatus.BAD_REQUEST)
    ;
    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
