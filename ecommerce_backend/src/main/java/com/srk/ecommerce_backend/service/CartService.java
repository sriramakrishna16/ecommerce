package com.srk.ecommerce_backend.service;

import com.srk.ecommerce_backend.dto.CartResponse;
import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.CartRepository;
import com.srk.ecommerce_backend.repository.ProductRepository;
import com.srk.ecommerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CartService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CartRepository cartRepo;

    public void addToCart(String username,int productId) throws Exception{
        Users user = userRepo.findByUsername(username);
        Product product = productRepo.findById(productId);
        CartItem cartItem = cartRepo.findByUserAndProduct(user,product);

        if(cartItem != null){
             cartItem.setQuantity(cartItem.getQuantity() + 1);
        }else{
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(1);
        }
        cartRepo.save(cartItem);
    }
    public void removeFromCart(String username, int id) {
        Users user = userRepo.findByUsername(username);
        CartItem cartItem = cartRepo.findById(id).orElse(null);
        if(cartItem == null){
            return;
        }
        if(!Objects.equals(cartItem.getUser().getUsername(), username)){
            throw new RuntimeException("Unauthorized access");
        }
        if(cartItem.getQuantity()>1){
            cartItem.setQuantity(cartItem.getQuantity()-1);
            cartRepo.save(cartItem);
        }else{
            cartRepo.delete(cartItem);
        }
    }

    public CartResponse getCartItems(String username) {
        Users user = userRepo.findByUsername(username);
        List<CartItem> cartItems = cartRepo.findByUser(user);
//        double totalPrice = 0.0;
//        for(CartItem item:cartItems){
//            double itemTotal = item.getProduct().getPrice() * item.getQuantity();
//            totalPrice = totalPrice + itemTotal;
//        }
        double price = cartItems.stream().
                mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        int totalItems = cartItems.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        double discount = (price/10);

        double totalAmount = price - discount;

        return new CartResponse(cartItems,totalItems,price,discount,totalAmount);
    }


}
