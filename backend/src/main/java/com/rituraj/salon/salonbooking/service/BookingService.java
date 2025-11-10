package com.rituraj.salon.salonbooking.service;
import com.rituraj.salon.salonbooking.model.AdminEntity;
import com.rituraj.salon.salonbooking.model.SlotBooking;
import com.rituraj.salon.salonbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.rituraj.salon.salonbooking.repository.AdminRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

  @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JavaMailSender mailSender;

   
    public SlotBooking createBooking(SlotBooking slotBooking) {
        System.out.println("Creating booking:-->> " + slotBooking);
        return bookingRepository.save(slotBooking);
    }

   
    public List<SlotBooking> getAllBookings() {
        return bookingRepository.findAll();
    }
    //getSalonid
  public String getSalonid(String id) {
    Optional<SlotBooking> optionalBooking = bookingRepository.findById(id);
    if (optionalBooking.isPresent()) {
        SlotBooking booking = optionalBooking.get();
        return booking.getSalonId(); 
    } 
        return null; 
    
}




    public void sendBookingEmail(String to, String bookingId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Booking Confirmation");
        message.setText("Dear Customer,\n\nThank you for your booking!\nYour Booking ID is: " 
                        + bookingId 
                        + "\n\nRegards,\nSalon Booking Team");
        mailSender.send(message);
    }
     public void cancelBooking(String bookingId, String slot, String salonId) {
       
        Optional<SlotBooking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            throw new RuntimeException("Booking not found with ID: " + bookingId);
        }

        bookingRepository.deleteById(bookingId);
        System.out.println("Deleted booking with ID: " + bookingId);

        Optional<AdminEntity> salonOpt = adminRepository.findById(salonId);
        if (salonOpt.isEmpty()) {
            throw new RuntimeException("Salon not found with ID: " + salonId);
        }

        AdminEntity salon = salonOpt.get();
        List<String> schedule = salon.getSchedule();
        if (!schedule.contains(slot)) {
            schedule.add(slot);
            salon.setSchedule(schedule);
            adminRepository.save(salon);
            System.out.println("Slot re-added to salon: " + slot);
        } else {
            System.out.println("Slot already present in salon schedule.");
        }
    }
}
