package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private int productId;
    private String productName;
    private String productBrand;
    private String imageUrl;
    private double Price;
    private int quantity;

}
