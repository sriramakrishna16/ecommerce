package com.srk.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileUpdateDto {
    private String name;
    private String email;
    private Long phone;
    private String address;
}
