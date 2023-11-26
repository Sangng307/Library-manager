package com.ReactSpring.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
public class AuthCredentialsRequest {
    @NotBlank(message = "khong duoc de trong")
    private String username;
    @NotBlank(message = "password trong kia")
    private String password;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
