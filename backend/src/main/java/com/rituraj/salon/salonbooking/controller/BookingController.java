package com.rituraj.salon.salonbooking.controller;

import com.rituraj.salon.salonbooking.model.SlotBooking;
import com.rituraj.salon.salonbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<SlotBooking> createBooking(@RequestBody SlotBooking slotBooking) {

        SlotBooking savedBooking = bookingService.createBooking(slotBooking);

        return ResponseEntity.ok(savedBooking);
    }

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody SlotBooking slotBooking) {
        if (slotBooking.getEmail() != null && !slotBooking.getEmail().isEmpty()
                && slotBooking.getId() != null) {
            System.out.println("heloo from contorller --->>");
            bookingService.sendBookingEmail(slotBooking.getEmail(), slotBooking.getId());
        }

    }

    @GetMapping("/all")
    public ResponseEntity<List<SlotBooking>> getAllBookings() {
        List<SlotBooking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/allbooking")
    public ResponseEntity<List<SlotBooking>> getAllBooking() {
        List<SlotBooking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/getsalonid/{id}")
    public String getSalonid(@PathVariable String id) {
        String salonId = bookingService.getSalonid(id);
        return salonId;
    }

    @DeleteMapping("/cancel/{bookingId}/{slot}/{salonId}")
    public ResponseEntity<String> cancelBooking(
            @PathVariable String bookingId,
            @PathVariable String slot,
            @PathVariable String salonId
    ) {
        try {
            bookingService.cancelBooking(bookingId, slot, salonId);
            return ResponseEntity.ok("Booking cancelled successfully and slot re-added!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error cancelling booking: " + e.getMessage());
        }
    }

}
