package com.srk.ecommerce_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String brand;
    private String category;
    private int price;
    private int stock;
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Product(String name, String brand,String category,int price, int stock, String imageUrl, String description){
        this.name=name;
        this.brand=brand;
        this.category=category;
        this.price=price;
        this.stock=stock;
        this.imageUrl=imageUrl;
        this.description = description;
    }
}
