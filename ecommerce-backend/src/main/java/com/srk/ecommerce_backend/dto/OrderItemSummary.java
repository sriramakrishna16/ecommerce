package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemSummary {
    private int orderItemId;
    private int productId;
    private String productName;
    private int quantity;
    private double price;
}
