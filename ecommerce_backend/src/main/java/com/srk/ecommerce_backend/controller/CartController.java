package com.srk.ecommerce_backend.controller;

import com.srk.ecommerce_backend.dto.AddressResponse;
import com.srk.ecommerce_backend.dto.CartResponse;
import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.Order;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.service.CartService;
import com.srk.ecommerce_backend.service.OrderService;
import com.srk.ecommerce_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService service;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;


    @PostMapping("/cart/add/{productId}")
    public String addToCart(@PathVariable int productId, Authentication auth) throws Exception{
        String username = auth.getName();
        service.addToCart(username, productId);
        return "added to cart";
    }

    @DeleteMapping("/cart/remove/{id}")
    public String removeFromCart(@PathVariable int id, Authentication auth) throws Exception{
        String username = auth.getName();
        service.removeFromCart(username, id);
        return "removed from cart";
    }
    
    @GetMapping("/cart")
    public ResponseEntity<CartResponse> getCartItems(Authentication authentication){
        String username = authentication.getName();
        CartResponse response = service.getCartItems(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cart/address")
    public String getAddress(Authentication auth){
        String username = auth.getName();
        return userService.getAddress(username);
    }

    @PostMapping("/cart/address")
    public ResponseEntity<?> saveAddress(Authentication auth, @RequestBody AddressResponse request){
        String username = auth.getName();
        String address = userService.saveAddress(username, request);
        return ResponseEntity.ok(address);
    }

}
