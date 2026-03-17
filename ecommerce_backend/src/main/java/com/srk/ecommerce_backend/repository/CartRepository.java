package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer>{

    List<CartItem> findByUser(Users user);

    CartItem findByUserAndProduct(Users user, Product product);

    List<CartItem> findByUserId(Integer id);
}
