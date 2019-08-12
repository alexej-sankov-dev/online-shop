package de.onlineshop.service.order;


public interface OrderService {

    String verifyOrder(String orderIDJsonStr);

    String checkTransaction(String id);

    void captureOrderData(String orderDataJsonStr);

}
