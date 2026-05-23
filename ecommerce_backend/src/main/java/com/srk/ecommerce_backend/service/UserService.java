package com.srk.ecommerce_backend.service;


import com.srk.ecommerce_backend.dto.UserDtoForAdmin;
import com.srk.ecommerce_backend.dto.UserProfileDto;
import com.srk.ecommerce_backend.dto.UserProfileUpdateDto;
import com.srk.ecommerce_backend.enums.Role;
import com.srk.ecommerce_backend.model.CartItem;
import com.srk.ecommerce_backend.model.Order;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.CartRepository;
import com.srk.ecommerce_backend.repository.OrderItemRepository;
import com.srk.ecommerce_backend.repository.OrderRepository;
import com.srk.ecommerce_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users saveUser(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        return userRepo.save(user);
    }

    public UserProfileDto getDetails(String username){
        Users user = userRepo.findByUsername(username);

        return new UserProfileDto (user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getRole());
    }

    public void updateProfile(String username , UserProfileUpdateDto dto) throws Exception{
        Users user = userRepo.findByUsername(username);
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());

        userRepo.save(user);

    }

    public Users findUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public List<UserProfileDto> getUsers(){
        List<Users> users = userRepo.findALlByOrderByNameAsc();
        return users.stream()
                .map(user -> new UserProfileDto(
                        user.getUsername(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getAddress(),
                        user.getRole()
                ))
                .toList();
    }

    public void updateUser(String username, UserDtoForAdmin request) {
        Users user = userRepo.findByUsername(username);
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());
        userRepo.save(user);
    }

    @Transactional
    public void deleteUser(String username) {
        Users user = userRepo.findByUsername(username);

        if(user == null){
            throw new RuntimeException("User not found");
        }
        List<Order> orders = orderRepo.findByUserId(user.getId());
        for(Order order : orders){
            orderItemRepo.deleteByOrderId(order.getOrderId());
        }
        orderRepo.deleteByUserId(user.getId());
        cartRepo.deleteByUserId(user.getId());

        userRepo.delete(user);
    }
}
