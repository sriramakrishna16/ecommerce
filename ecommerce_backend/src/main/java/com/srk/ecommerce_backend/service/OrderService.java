package com.srk.ecommerce_backend.service;

import com.srk.ecommerce_backend.dto.OrderItemResponse;
import com.srk.ecommerce_backend.dto.OrderItemSummary;
import com.srk.ecommerce_backend.dto.OrderResponse;
import com.srk.ecommerce_backend.dto.OrderSummary;
import com.srk.ecommerce_backend.model.*;
import com.srk.ecommerce_backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepo;

    public Order placeOrder(String username){
        Users user = userRepository.findByUsername(username);
        int userId = user.getId();
        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();

        double total = 0;

        for(CartItem item : cartItems){
            Product product = productRepository.findById(item.getProduct().getId());
            if(product.getStock() < item.getQuantity()){
                throw new RuntimeException("Out Of Stock" + product.getName());
            }
            OrderItem orderItem = new OrderItem();

//            product.setStock(product.getStock()-item.getQuantity());
//            productRepository.save(product);
            orderItem.setProductId(product.getId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());

            orderItem.setOrder(order);
            orderItems.add(orderItem);

            total += product.getPrice() * item.getQuantity();
        }

        order.setItems(orderItems);
        order.setAmount(total - total/10);
        order.setStatus("PENDING");
        order.setRazorpayOrderID(null);
        order.setPaymentId(null);
        //        cartRepository.deleteAll(cartItems);

        return orderRepo.save(order);

    }

    public List<OrderResponse> getOrders(String username) {
        Users user = userRepository.findByUsername(username);
        int userId = user.getId();
        List<Order> orders = orderRepo.findByUserIdAndStatus(userId,"SUCCESS");
        List<OrderResponse> result = new ArrayList<>();
        for(Order order: orders ){
            OrderResponse response = new OrderResponse();
            response.setOrderId(order.getOrderId());
            response.setOrderDate(order.getOrderDate());
            response.setAmount(order.getAmount());

            List<OrderItemResponse> itemResponses = new ArrayList<>();

            for(OrderItem item : order.getItems()){
                OrderItemResponse itemResponse = new OrderItemResponse();
                int id = item.getProductId();
                Product product = productRepository.findById(id);
                itemResponse.setProductId(id);
                itemResponse.setProductBrand(product.getBrand());
                itemResponse.setImageUrl(product.getImageUrl());
                itemResponse.setProductName(product.getName());

                itemResponse.setQuantity(item.getQuantity());
                itemResponse.setPrice(item.getPrice());
                itemResponses.add(itemResponse);
            }
            response.setItems(itemResponses);
            result.add(response);
        }

        return result;
    }

    public OrderSummary getOrderDetails(int orderId, String username) {
        Users user = userRepository.findByUsername(username);
        int userId = user.getId();
        Order order = orderRepo.findByUserIdAndOrderId(userId, orderId).orElseThrow(()->new RuntimeException("order not found"));
        OrderSummary orderSummary = new OrderSummary();
        orderSummary.setOrderId(order.getOrderId());
        orderSummary.setTotalPrice(order.getAmount());
        List<OrderItemSummary> result = new ArrayList<>();

        for(OrderItem item: order.getItems()){
            OrderItemSummary itemSummary = new OrderItemSummary();
            Product product = productRepository.findById(item.getProductId());
            String productName = product.getName();
            itemSummary.setOrderItemId(item.getId());
            itemSummary.setProductId(item.getProductId());
            itemSummary.setProductName(productName);
            itemSummary.setQuantity(item.getQuantity());
            itemSummary.setPrice(item.getPrice());
            result.add(itemSummary);
        }
        orderSummary.setItem(result);


        return orderSummary;
    }



    @Transactional
    public void removeItemFromOrder(int orderId, int orderItemId, String username) {

        Users user = userRepository.findByUsername(username);
        int userId = user.getId();

        Order order = orderRepo.findByOrderIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Order not found"));

        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Item not found"));

        Product product = productRepository.findById(orderItem.getProductId());
        product.setStock(product.getStock() + orderItem.getQuantity());
        productRepository.save(product);

        orderItemRepo.delete(orderItem);

        List<OrderItem> remainingItems =
                orderItemRepo.findByOrder_OrderId(orderId);

        if(remainingItems.isEmpty()){
            orderRepo.delete(order);
            return;
        }

        double total = remainingItems.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        order.setAmount(total);
        orderRepo.save(order);
    }

    @Transactional
    public void deleteOrder(int orderId, String username) {
        Users user = userRepository.findByUsername(username);
        int userId = user.getId();
        Order order = orderRepo.findByOrderIdAndUserId(orderId,userId).orElseThrow(() -> new RuntimeException("Order not found"));
        List<OrderItem> orderItem = orderItemRepo.findByOrder_OrderId(orderId);
        for(OrderItem item : orderItem){
            Product product = productRepository.findById(item.getProductId());
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }
        orderItemRepo.deleteAll(orderItem);
        orderRepo.delete(order);

    }

    public void buyProduct(int productId, String username) {
        Users user = userRepository.findByUsername(username);
        Product product = productRepository.findById(productId);
        if(product.getStock() <= 0){
            throw new RuntimeException("Product out of stock");
        }
        int userId = user.getId();
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setAmount(product.getPrice());
        order.setStatus("PENDING");
        order.setRazorpayOrderID(null);
        order.setPaymentId(null);
        orderRepo.save(order);

        OrderItem item = new OrderItem();
        item.setProductId(product.getId());
        item.setQuantity(1);
        item.setPrice(product.getPrice());
        item.setOrder(order);

        orderItemRepo.save(item);

//        product.setStock(product.getStock()-1);
//        productRepository.save(product);
    }
}
