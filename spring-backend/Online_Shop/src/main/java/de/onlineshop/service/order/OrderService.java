package de.onlineshop.service.order;

import org.json.JSONObject;

public interface OrderService {

    String verifyOrder(String orderIDJsonStr);

    String checkTransaction(String id);

    void captureOrderData(String orderDataJsonStr);

}
