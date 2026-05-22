package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
   Product findById(int id);

   @Query("select p from products p where "+
           "LOWER(p.name) like LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) like LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) like LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.category) like LOWER(CONCAT('%', :keyword, '%')) ")
   List<Product> searchProducts(String keyword);
}
