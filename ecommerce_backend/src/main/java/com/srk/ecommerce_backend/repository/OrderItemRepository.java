package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer > {

    Optional<OrderItem> findByOrder_OrderIdAndProductId(int orderId, int productId);

    List<OrderItem> findByOrder_OrderId(int orderId);

    @Modifying
    @Query("DELETE FROM OrderItem o WHERE o.order.orderId = :orderId")
    void deleteByOrderId(@Param("orderId") int orderId);
}
