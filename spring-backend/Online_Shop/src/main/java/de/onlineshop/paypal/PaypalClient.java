package de.onlineshop.paypal;


import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Iterator;

public class PaypalClient {

    private PayPalEnvironment environment = new PayPalEnvironment.Sandbox(
            "client_id",
            "client_secret");
    PayPalHttpClient client = new PayPalHttpClient(environment);

    public PayPalHttpClient client() {
        return this.client;
    }
}

