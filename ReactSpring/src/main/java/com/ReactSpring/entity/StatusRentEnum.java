package com.ReactSpring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum StatusRentEnum {
    PENDING("Chờ xác nhận"),
    RENTING("Đang thuê"),
    DONE("Hoàn thành");

    private String statusName;


}
