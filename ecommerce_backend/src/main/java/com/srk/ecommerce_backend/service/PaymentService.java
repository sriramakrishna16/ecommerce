package com.srk.ecommerce_backend.service;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.srk.ecommerce_backend.dto.CartResponse;
import com.srk.ecommerce_backend.dto.PaymentResponse;
import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.OrderItem;
import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.CartRepository;
import com.srk.ecommerce_backend.repository.OrderRepository;
import com.srk.ecommerce_backend.repository.ProductRepository;
import com.srk.ecommerce_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private  OrderService orderService;

    @Autowired
    private  OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    public Map<String, Object> createOrder(String username) throws Exception{
        com.srk.ecommerce_backend.model.Order dbOrder = orderService.placeOrder(username);

        double totalAmount = dbOrder.getAmount();

        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

        JSONObject orderRequest = new JSONObject();

        orderRequest.put("amount", (int) totalAmount * 100);

        orderRequest.put("currency", "INR");

        orderRequest.put("receipt","txn_" + dbOrder.getOrderId());

        Order razorPayOrder = razorpayClient.orders.create(orderRequest);

        dbOrder.setRazorpayOrderID(razorPayOrder.get("id"));

        orderRepository.save(dbOrder);


        Map<String, Object> response = new HashMap<>();

        response.put("dbOrderId", dbOrder.getOrderId());
        response.put("razorPayOrderId", razorPayOrder.get("id"));

        response.put("amount", razorPayOrder.get("amount"));
        response.put("currency", razorPayOrder.get("currency"));
        response.put("key", keyId);

        return response;
    }

    @Transactional
    public void verifyPayment(PaymentResponse response, String username) {
        com.srk.ecommerce_backend.model.Order order = orderRepository.findByOrderId(response.getDbOrderId());
        if(!order.getRazorpayOrderID().equals(response.getRazorpayOrderId())){
            throw new RuntimeException("Invalid Razorpay Order");
        }else{
            order.setPaymentId(response.getRazorpayPaymentId());
            order.setStatus("SUCCESS");
            List<OrderItem> items = order.getItems();
            for(OrderItem item: items) {
                Product product = productRepository.findById(item.getProductId());
                if(product.getStock() < item.getQuantity()){
                    throw new RuntimeException(product.getName() + "Out Of Stock");
                }
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            }
            Users user = userRepository.findByUsername(username);
            List<CartItem> cartItems = cartRepository.findByUser(user);
            cartRepository.deleteAll(cartItems);
            orderRepository.save(order);
        }


    }

    public Map<String, Object> buyProduct(int productId, String username) throws Exception {
        Users user = userRepository.findByUsername(username);
        Product product = productRepository.findById(productId);

        Map<String, Object> response = new HashMap<>();
        if(product.getStock() <= 0){
            response.put("status", "OUT_OF_STOCK");
            return response;
        }
        com.srk.ecommerce_backend.model.Order order = new com.srk.ecommerce_backend.model.Order();
        order.setUserId(user.getId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        order.setAmount(product.getPrice());

        OrderItem item = new OrderItem();
        item.setProductId(product.getId());
        item.setQuantity(1);
        item.setPrice(product.getPrice());
        item.setOrder(order);

        order.setItems(List.of(item));
        orderRepository.save(order);

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject req = new JSONObject();
        req.put("amount", (int) product.getPrice() * 100);
        req.put("currency", "INR");
        req.put("receipt", "txn_" + order.getOrderId());

        com.razorpay.Order razor = client.orders.create(req);
        String razorOrderId = razor.get("id");
        order.setRazorpayOrderID(razor.get("id"));
        orderRepository.save(order);

        response.put("status", "OK");
        response.put("dbOrderId", order.getOrderId());
        response.put("razorPayOrderId", razorOrderId);
        response.put("amount", razor.get("amount"));
        response.put("currency", razor.get("currency"));
        response.put("key", keyId);

        return response;
    }
}
