package de.onlineshop.model.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoDao {
    private Long id;
    private String title;
    private String description;
    private float price;
    private Integer stock;

}
