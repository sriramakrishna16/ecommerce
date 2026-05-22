package com.srk.ecommerce_backend.model;

import com.srk.ecommerce_backend.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(nullable = false,unique = true)
    private String username;

    private String email;

    private Long phone;

    private String password;

    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

//    public Users(String username, String password) {
//        this.username = username;
//        this.password=password;
//    }
}
