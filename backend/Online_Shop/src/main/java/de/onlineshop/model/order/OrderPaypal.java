package de.onlineshop.model.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ORDER_PAYPAL")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderPaypal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID")
    private Long orderID;

    @Column(name = "CREATE_TIME", nullable = false, length = 50)
    private String createTime;

    @Column(name = "ID", nullable = false, length = 50)
    private String id;

    @Column(name = "STATUS", nullable = false, length = 50)
    private String status;

    @Column(name = "REFERENCE_ID", nullable = false, length = 50)
    private String referenceID;

    @Column(name = "AMOUNT_VALUE", nullable = false, length = 50)
    private float amountValue;

    @Column(name = "CURRENCY_CODE", nullable = false, length = 50)
    private String currencyCode;

    @Column(name = "PAYER_ID", nullable = false, length = 50)
    private String payerID;

    @Column(name = "PAYER_EMAIL", nullable = false, length = 100)
    private String payerEmail;

    @Column(name = "PAYER_SURNAME", nullable = false, length = 50)
    private String payerSurname;

    @Column(name = "PAYER_GIVEN_NAME", nullable = false, length = 50)
    private String payerGivenName;

    @Column(name = "COUNTRY_CODE", nullable = false, length = 5)
    private String countryCode;

    @Column(name = "ADDRESS", nullable = false, length = 500)
    private String jsonAddress;

    @Column(name = "DATA", nullable = false, length = 5000)
    private String jsonData;

}
