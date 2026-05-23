package com.srk.ecommerce_backend.dto;

import com.srk.ecommerce_backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoForAdmin {
    private String name;
    private String email;
    private Long phone;
    private String address;
    private Role role;
}
