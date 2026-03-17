package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummary {
    private int orderId;

    private double totalPrice;

    private List<OrderItemSummary> item;
}
