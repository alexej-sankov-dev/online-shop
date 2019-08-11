package de.onlineshop.paypal;

import java.io.IOException;

import org.json.JSONObject;

import com.braintreepayments.http.HttpResponse;
import com.braintreepayments.http.serializer.Json;
import com.paypal.orders.Order;
import com.paypal.orders.OrdersGetRequest;


public class GetOrder {
    public JSONObject getOrder(String orderId) throws IOException {
        OrdersGetRequest request = new OrdersGetRequest(orderId);
        HttpResponse<Order> response = new PaypalClient().client().execute(request);
        return new JSONObject(new Json().serialize(response.result()));
    }
}
