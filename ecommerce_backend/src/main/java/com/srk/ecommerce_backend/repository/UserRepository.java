package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
