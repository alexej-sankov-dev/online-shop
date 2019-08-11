package de.onlineshop.model.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductWebDto {

    @NotBlank
    @Length(min = 3, max = 50)
    private String title;

    @NotBlank
    @Length(min = 5, max = 500)
    private String description;

    @NotNull
    @Min(value = 5)
    @Max(value= 10000)
    private float price;

    @NotNull
    @Min(value = 0)
    private Integer stock;

}
