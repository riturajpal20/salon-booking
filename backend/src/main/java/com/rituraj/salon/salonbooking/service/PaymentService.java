package com.rituraj.salon.salonbooking.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    public Map<String, Object> createOrder(double amount) throws Exception {
       
        RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);

       
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); 
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1); 

        Order order = razorpay.orders.create(orderRequest);

        // Prepare response map
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("receipt", order.get("receipt"));
        response.put("status", order.get("status"));

        return response;
    }
}
