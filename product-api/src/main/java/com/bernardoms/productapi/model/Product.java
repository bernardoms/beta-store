package com.bernardoms.productapi.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    @NotNull
    private BigDecimal price;
    @NotBlank
    private String name;
    private String description;
    private String image;
    @Id
    @NotBlank
    private String sku;
    private int quantity;
}
