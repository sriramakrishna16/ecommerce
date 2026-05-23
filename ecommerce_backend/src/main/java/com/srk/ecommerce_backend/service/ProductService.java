package com.srk.ecommerce_backend.service;

import com.srk.ecommerce_backend.dto.ProductRequest;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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

    public List<Product> searchProducts(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return repo.findAll();
        }
        return repo.searchProducts(keyword.trim());
    }

    public Product addProduct(MultipartFile image, ProductRequest request) throws IOException {
        Files.createDirectories(Paths.get("Uploads/Images"));
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get("Uploads/Images", filename);
        Files.write(path, image.getBytes());
        Product product = new Product();
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(filename);

        return repo.save(product);
    }

    public void deleteProduct(int productId) {
        Product product = repo.findById(productId);
        if(product != null){
            try{
                Path imagePath = Paths.get("Uploads/Images", product.getImageUrl());
                Files.deleteIfExists(imagePath);
            }catch(IOException e){
                System.err.println("Failed to delete image file: " + e.getMessage());
            }
            repo.delete(product);
        }
    }

    public void updateProduct(int productId , MultipartFile image , ProductRequest request) throws IOException{
        Product product = repo.findById(productId);
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        if(image != null && !image.isEmpty()){
            Files.createDirectories(Paths.get("Uploads/Images"));
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path path = Paths.get("Uploads/Images", filename);
            Files.write(path, image.getBytes());
            product.setImageUrl(filename);
        }

        repo.save(product);
    }
}
