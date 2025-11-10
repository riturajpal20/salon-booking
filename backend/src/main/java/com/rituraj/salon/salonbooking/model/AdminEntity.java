package com.rituraj.salon.salonbooking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "Admin")
public class AdminEntity {

    @Id
    private String id;
    private String salonName;
    private String location;
    private String date;
    private String number;
    private List<Map<String, String>> services;
    private List<String> schedule;
    private List<String> occasions;

   // not stored in db 
    @Transient
    private String timeRange;
    @Transient
    private String occasion;

    public AdminEntity() {}

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSalonName() { return salonName; }
    public void setSalonName(String salonName) { this.salonName = salonName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public List<Map<String, String>> getServices() { return services; }
    public void setServices(List<Map<String, String>> services) { this.services = services; }

    public List<String> getSchedule() { return schedule; }
    public void setSchedule(List<String> schedule) { this.schedule = schedule; }

    public List<String> getOccasions() { return occasions; }
    public void setOccasions(List<String> occasions) { this.occasions = occasions; }

    public String getTimeRange() { return timeRange; }
    public void setTimeRange(String timeRange) { this.timeRange = timeRange; }

    public String getOccasion() { return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }
}
