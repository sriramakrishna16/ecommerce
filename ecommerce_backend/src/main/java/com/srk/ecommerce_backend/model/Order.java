package com.srk.ecommerce_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private int userId;

    private double amount;

    private LocalDateTime orderDate;

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;

    private String status;

    private String razorpayOrderID;

    private String paymentId;



}
