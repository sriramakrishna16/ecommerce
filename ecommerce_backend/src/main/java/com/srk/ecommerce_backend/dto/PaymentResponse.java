package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private String razorpayPaymentId;

    private String razorpayOrderId;

    private String razorpaySignature;

    private int dbOrderId;

}
