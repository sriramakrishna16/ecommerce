package com.srk.ecommerce_backend.controller;

import com.srk.ecommerce_backend.dto.OrderResponse;
import com.srk.ecommerce_backend.dto.OrderSummary;
import com.srk.ecommerce_backend.model.Order;
import com.srk.ecommerce_backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<OrderResponse> getOrders(Authentication auth){
        String username = auth.getName();
        return orderService.getOrders(username);

    }

    @GetMapping("/orders/{orderId}")
    public OrderSummary getOrderDetails(@PathVariable int orderId, Authentication auth){
        String username = auth.getName();
        return orderService.getOrderDetails(orderId, username);
    }

    @DeleteMapping("/orders/{orderId}/cancel/{orderItemId}")
    public ResponseEntity<?> cancelItem(@PathVariable int orderId , @PathVariable int orderItemId , Authentication auth){
        String username = auth.getName();
        orderService.removeItemFromOrder(orderId,orderItemId, username);
        return ResponseEntity.ok("item deleted successfully");
    }

    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable int orderId , Authentication auth){
        String username = auth.getName();
        orderService.deleteOrder(orderId, username);
        return ResponseEntity.ok("order cancelled successfully");
    }

}
