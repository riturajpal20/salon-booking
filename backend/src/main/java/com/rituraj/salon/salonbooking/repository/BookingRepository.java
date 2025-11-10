package com.rituraj.salon.salonbooking.repository;

import com.rituraj.salon.salonbooking.model.SlotBooking; 
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<SlotBooking, String> {
}
