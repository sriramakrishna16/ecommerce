package com.srk.ecommerce_backend.dto;


import com.srk.ecommerce_backend.enums.Role;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
public class UserProfileDto {

    private String username;
    private String name;
    private String email;
    private Long phone;
    private String address;
    private Role role;

    public UserProfileDto(String username,String name,String email,Long phone,String address, Role role){
        this.username = username;
        this.name = name;
        this.email= email;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }


}
