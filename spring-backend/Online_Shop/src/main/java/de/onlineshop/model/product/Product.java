package de.onlineshop.model.product;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCT")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE", nullable = false, length = 50)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false, length = 500)
    private String description;

    @Column(name = "PRICE", nullable = false, length = 50)
    private float price;

    @Column(name = "STOCK", nullable = false,  length = 50)
    private Integer stock;
}
