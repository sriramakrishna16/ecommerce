package com.srk.ecommerce_backend.service;


import com.srk.ecommerce_backend.dto.UserProfileDto;
import com.srk.ecommerce_backend.dto.UserProfileUpdateDto;
import com.srk.ecommerce_backend.enums.Role;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;

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
                user.getAddress());
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
}
