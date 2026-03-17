package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.Order;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(int userId);
    Optional<Order> findByUserIdAndOrderId(int userId, int orderId);
    Optional<Order> findByOrderIdAndUserId (int orderId , int userId);

    Order findByOrderId(int orderId);

}
