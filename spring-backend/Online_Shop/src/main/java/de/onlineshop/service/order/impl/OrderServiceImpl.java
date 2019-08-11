package de.onlineshop.service.order.impl;


import de.onlineshop.exeption.exeptions.ResourceNotFoundException;
import de.onlineshop.model.order.OrderData;
import de.onlineshop.model.order.OrderPaypal;
import de.onlineshop.model.product.Product;
import de.onlineshop.paypal.GetOrder;
import de.onlineshop.repository.OrderDataRepository;
import de.onlineshop.repository.OrderPaypalRepository;
import de.onlineshop.repository.ProductRepository;
import de.onlineshop.service.order.OrderService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {


    @Autowired
    OrderPaypalRepository orderPaypalRepository;

    @Autowired
    OrderDataRepository orderDataRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public String verifyOrder(String orderIDJsonStr) {
        JSONObject orderIDJson = null;
        try {
            orderIDJson = new JSONObject(orderIDJsonStr);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String orderID = orderIDJson.getString("orderID");
        JSONObject order = null;
        try {
            order = new GetOrder().getOrder(orderID);
        } catch (IOException e) {
            e.printStackTrace();
        }

        OrderPaypal orderPaypal = orderToOrderPaypal(order);
        orderPaypalRepository.save(orderPaypal);

        return orderID;

    }

    @Override
    public String checkTransaction(String id) {
        List<OrderPaypal> orderPaypalList = orderPaypalRepository.findById(id);
        if(orderPaypalList.isEmpty()) {
            throw new ResourceNotFoundException("Not found", "orderPaypal", id);
        }
        return orderPaypalList.get(0).getStatus();
    }

    @Override
    public void captureOrderData(String orderDataJsonStr) {
        JSONObject orderDataJson = null;
        try {
            orderDataJson = new JSONObject(orderDataJsonStr);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        OrderData orderData = new OrderData();

        List<OrderPaypal> orderPaypalList = orderPaypalRepository.findById(orderDataJson.getString("orderID"));
        if(orderPaypalList.isEmpty()) {
            throw new ResourceNotFoundException("Not found", "orderPaypal", orderDataJson.getString("orderID"));
        }

        orderData.setPaypalOrderId(orderPaypalList.get(0).getOrderID());
        orderData.setOrderedCart(orderDataJson.getJSONObject("orderedCart").toString());
        orderData.setAddress(orderDataJson.getJSONObject("address").toString());

        orderDataRepository.save(orderData);

        JSONObject orderedCart = orderDataJson.getJSONObject("orderedCart");
        handleOrderedProducts(orderedCart);
    }

    public void handleOrderedProducts(JSONObject orderedCart) {
        Iterator<String> keysItr = orderedCart.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            Integer value = (Integer) orderedCart.get(key);
            Product product = productRepository.getOne(Long.parseLong(key));
            Integer currentStock = product.getStock();
            product.setStock(currentStock-value);
            productRepository.save(product);
        }

    }

    public OrderPaypal orderToOrderPaypal(JSONObject order) {
        OrderPaypal orderPaypal = new OrderPaypal();

        orderPaypal.setCreateTime(order.getString("create_time"));
        orderPaypal.setId(order.getString("id"));
        orderPaypal.setStatus(order.getString("status"));

        JSONObject purchasedUnit = order.getJSONArray("purchase_units").getJSONObject(0);

        orderPaypal.setReferenceID(purchasedUnit.getString("reference_id"));
        orderPaypal.setAmountValue(purchasedUnit.getJSONObject("amount").getFloat("value"));
        orderPaypal.setCurrencyCode(purchasedUnit.getJSONObject("amount").getString("currency_code"));

        JSONObject payer = order.getJSONObject("payer");
        orderPaypal.setPayerID(payer.getString("payer_id"));
        orderPaypal.setPayerEmail(payer.getString("email_address"));
        orderPaypal.setPayerSurname(payer.getJSONObject("name").getString("surname"));
        orderPaypal.setPayerGivenName(payer.getJSONObject("name").getString("given_name"));
        orderPaypal.setCountryCode(payer.getJSONObject("address").getString("country_code"));

        orderPaypal.setJsonAddress((purchasedUnit.getJSONObject("shipping").toString()));
        orderPaypal.setJsonData(order.toString());

        return orderPaypal;
    }
}
