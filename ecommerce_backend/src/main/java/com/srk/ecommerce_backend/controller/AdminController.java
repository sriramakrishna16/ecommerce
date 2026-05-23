package com.srk.ecommerce_backend.controller;

import com.srk.ecommerce_backend.dto.OrderStatusRequest;
import com.srk.ecommerce_backend.dto.ProductRequest;
import com.srk.ecommerce_backend.dto.UserDtoForAdmin;
import com.srk.ecommerce_backend.dto.UserProfileDto;
import com.srk.ecommerce_backend.model.Order;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.service.OrderService;
import com.srk.ecommerce_backend.service.ProductService;
import com.srk.ecommerce_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

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

    @DeleteMapping("/product/remove/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId){
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("product/update/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable int productId,@RequestPart(value = "image", required = false) MultipartFile image,
                                           @RequestPart("product") ProductRequest request) throws IOException{
        productService.updateProduct(productId , image , request);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserProfileDto> getUsers(){
       return userService.getUsers();
    }

    @PutMapping("/users/update/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable String username , @RequestBody UserDtoForAdmin request){
        userService.updateUser(username, request);
        return ResponseEntity.ok("done");
    }

    @DeleteMapping("/users/delete/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String username){
        userService.deleteUser(username);
        return ResponseEntity.ok("SUCCESS");
    }

    @GetMapping("/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getOrders(){
        return orderService.getAllOrders();
    }

    @PutMapping("/orders/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateOrderStatus(
            @PathVariable int orderId,
            @RequestBody OrderStatusRequest request) {
        orderService.updateOrderStatus(orderId, request.getOrderStatus());
    }

    @DeleteMapping("/orders/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOrder(@PathVariable int orderId) {
        orderService.adminDeleteOrder(orderId);
    }

}
