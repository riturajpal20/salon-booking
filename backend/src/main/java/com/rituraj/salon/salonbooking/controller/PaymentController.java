package com.rituraj.salon.salonbooking.controller;

import com.rituraj.salon.salonbooking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestParam float amount) throws Exception {
        return paymentService.createOrder(amount);
    }
}
