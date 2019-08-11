package de.onlineshop.model.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ORDER_DATA")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID")
    private Long orderID;

    @Column(name = "PAYPAL_ORDER_ID", nullable = false, length = 50)
    private Long paypalOrderId;

    @Column(name = "ORDERED_CART", nullable = false, length = 500)
    private String orderedCart;

    @Column(name = "ADDRESS", nullable = false, length = 1000)
    private String address;


}
