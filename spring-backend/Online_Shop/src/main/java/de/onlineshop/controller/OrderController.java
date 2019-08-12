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
    public ResponseEntity<String> completedTransaction(@RequestBody String body) {
        System.out.println("body: "+body);
        String orderID = orderService.verifyOrder(body);
        orderService.captureOrderData(body);
        return ResponseEntity.status(HttpStatus.OK).body(orderService.checkTransaction(orderID));
    }

    @GetMapping("/check-transaction/{id}")
    public ResponseEntity<String> checkTransactions(@PathVariable(value = "id") String id) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.checkTransaction(id));
    }

}
