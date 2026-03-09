package com.srk.ecommerce_backend.dto;


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

    public UserProfileDto(String username,String name,String email,Long phone,String address){
        this.username = username;
        this.name = name;
        this.email= email;
        this.phone = phone;
        this.address = address;
    }


}
