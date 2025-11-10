package com.rituraj.salon.salonbooking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "SlotBooking")
public class SlotBooking {

    @Id
    private String id;
    private String slot;
    private String services;
    private String salonName;
   private String email;
   private String salonId;
   private String name;
   
    public SlotBooking() {}
    public SlotBooking(String slot,String services,String salonName,String email,String salonId,String name) {
        this.slot = slot;
        this.services = services;
        this.salonName = salonName;
        this.email = email;
        this.salonId = salonId;
        this.name = name;

    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSlot() { return slot; }
    public void setSlot(String slot) { this.slot = slot; }
    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
    public String getSalonName() { return salonName; }
    public void setSalonName(String salonName) { this.salonName = salonName;}
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
     
   
}
