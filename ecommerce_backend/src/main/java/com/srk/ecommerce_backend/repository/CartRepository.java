package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer>{

    List<CartItem> findByUser(Users user);

    CartItem findByUserAndProduct(Users user, Product product);

    List<CartItem> findByUserId(Integer id);

    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") int userId);
}
