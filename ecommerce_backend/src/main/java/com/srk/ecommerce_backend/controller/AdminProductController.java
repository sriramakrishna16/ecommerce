package com.srk.ecommerce_backend.controller;

import com.srk.ecommerce_backend.dto.ProductRequest;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminProductController {

    @Autowired
    private ProductService productService;

//    @GetMapping("/hello")
//    public String hello(){
//        return "hello admin";
//    }

    @PostMapping("/products/add")
    @PreAuthorize("hasRole('ADMIN')")
    public Product addProduct(@RequestPart("image") MultipartFile image ,
                              @RequestPart("product") ProductRequest request) throws IOException {
        return productService.addProduct(image,request);
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Product> getProducts(){
        return productService.getProducts();
    }
}
