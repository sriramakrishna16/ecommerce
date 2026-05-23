package com.srk.ecommerce_backend.repository;

import com.srk.ecommerce_backend.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import static org.springframework.data.domain.Sort.Direction.ASC;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
    List<Users> findALlByOrderByNameAsc();
}
