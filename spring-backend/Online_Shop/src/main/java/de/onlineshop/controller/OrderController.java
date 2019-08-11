package de.onlineshop.controller;

import de.onlineshop.service.order.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/paypal-transaction-complete")
    public ResponseEntity<Void> getOrderID(@RequestBody String body) {
        orderService.verifyOrder(body);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check-transaction/{id}")
    public ResponseEntity<String> checkTransactions(@PathVariable(value = "id") String id) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.checkTransaction(id));
    }

    @PostMapping("/capture-order-data")
    public ResponseEntity<Void> captureOrderData(@RequestBody String body) {
        orderService.captureOrderData(body);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
