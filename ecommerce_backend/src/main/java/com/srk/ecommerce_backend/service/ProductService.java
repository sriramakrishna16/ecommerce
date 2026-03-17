package com.srk.ecommerce_backend.service;

import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public void saveProducts(Product product){
        repo.save(product);
    }

    public List<Product> getProducts() {
        return repo.findAll();
    }


    public Product getProductById(int id) {
        return repo.findById(id);
    }
}
