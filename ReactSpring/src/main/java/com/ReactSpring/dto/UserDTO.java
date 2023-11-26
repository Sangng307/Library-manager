package com.ReactSpring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    @NotBlank(message = "trong username")
    private String username;
    @NotBlank(message = "trong pass")
    private String password;
    @NotBlank(message = "trong email")
    private String email;


}
