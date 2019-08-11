package de.onlineshop.paypal;


import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Iterator;

public class PaypalClient {

    private PayPalEnvironment environment = new PayPalEnvironment.Sandbox(
            "AVvKJGXuLqTjy8Pa7mVltU5nHxDDabDQTlomTp2gC3Xvhg_RL4-1rNEHgHj_-C2xdta76HxmTzO4Ikys",
            "EFBo1TBrt5CvxKYd3ngtm6-PFnP36c15Ff_3djI8KOBt5eLUzklr-AjzDthx2rDg5RoIJYbhzGiXrPQf");
    PayPalHttpClient client = new PayPalHttpClient(environment);

    public PayPalHttpClient client() {
        return this.client;
    }
}

