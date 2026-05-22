package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String name;

    private String brand;

    private String category;

    private int price;

    private int stock;

    private String imageUrl;

}
