package com.srk.ecommerce_backend.dto;


import com.srk.ecommerce_backend.model.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CartResponse {
    private List<CartItem> items;
    private int totalItems;
    private double price;
    private double discount;
    private double totalPrice;

}
