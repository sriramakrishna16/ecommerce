package com.srk.ecommerce_backend.controller;

import com.srk.ecommerce_backend.dto.PaymentResponse;
import com.srk.ecommerce_backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(Authentication auth) throws Exception {
        String username = auth.getName();
        Map<String, Object> response = paymentService.createOrder(username);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentResponse response, Authentication auth){
        String username = auth.getName();
        paymentService.verifyPayment(response, username);
        return ResponseEntity.ok("payment successful");
    }

    @PostMapping("/orders/buy/{productId}")
    public ResponseEntity<?> buyProduct(@PathVariable int productId, Authentication auth) throws Exception {
        String username = auth.getName();
        Map<String, Object> response = paymentService.buyProduct(productId,username);
        return ResponseEntity.ok(response);
    }
}
