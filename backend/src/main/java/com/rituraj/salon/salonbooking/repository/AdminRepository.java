package com.rituraj.salon.salonbooking.repository;

import com.rituraj.salon.salonbooking.model.AdminEntity; 
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<AdminEntity, String> {
}
