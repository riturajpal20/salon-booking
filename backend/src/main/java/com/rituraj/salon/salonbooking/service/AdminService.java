package com.rituraj.salon.salonbooking.service;

import com.rituraj.salon.salonbooking.model.AdminEntity;
import com.rituraj.salon.salonbooking.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    private List<String> deletedSchedule = new ArrayList<>();

    @Autowired
    private AdminRepository adminRepository;

    public AdminEntity addSalon(AdminEntity adminEntity) {
        String num = adminEntity.getNumber();
        if (!num.startsWith("+91 ")) {
            throw new IllegalArgumentException("Number must start with '+91 '");
        }

        String remaining = num.substring(4);
        if (remaining.length() != 10 || !remaining.matches("\\d{10}")) {
            throw new IllegalArgumentException("Number must be exactly 10 digits after '+91 '");
        }

        List<String> ss = adminEntity.getSchedule();
        List<String> newSchedule = new ArrayList<>();
        for (String s : ss) {
            newSchedule.add(s.trim());
        }
        adminEntity.setSchedule(newSchedule);

        return adminRepository.save(adminEntity);
    }

    public List<AdminEntity> getAllSalons(AdminEntity req) {
        List<AdminEntity> allSalons = adminRepository.findAll();
        List<AdminEntity> filteredSalons = new ArrayList<>();

        String requestedDate = req.getDate();
        String requestedTimeRange = req.getTimeRange();

        DateTimeFormatter[] possibleFormats = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("h:mm a"),
            DateTimeFormatter.ofPattern("hh:mm a")
        };

        for (AdminEntity salon : allSalons) {
            boolean match = true;

            // Filter by date
            if (requestedDate != null && !requestedDate.isEmpty()) {
                if (salon.getDate() == null || !salon.getDate().equals(requestedDate)) {
                    match = false;
                }
            }

            // Filter by time range
            if (match && requestedTimeRange != null && !requestedTimeRange.isEmpty()) {
                match = false;
                String normalizedReqRange = requestedTimeRange.replace("–", "-").replace("to", "-").replace("TO", "-").trim();
                String[] reqRange = normalizedReqRange.split("-");
                if (reqRange.length == 2) {
                    LocalTime reqStart = parseFlexibleTime(reqRange[0].trim(), possibleFormats);
                    LocalTime reqEnd = parseFlexibleTime(reqRange[1].trim(), possibleFormats);

                    if (reqStart != null && reqEnd != null && salon.getSchedule() != null) {
                        for (String slot : salon.getSchedule()) {
                            if (slot == null || slot.isEmpty()) continue;

                            String normalizedSlot = slot.replace("–", "-").replace("to", "-").replace("TO", "-").trim();
                            String[] salonRange = normalizedSlot.split("-");
                            if (salonRange.length == 2) {
                                LocalTime salonStart = parseFlexibleTime(salonRange[0].trim(), possibleFormats);
                                LocalTime salonEnd = parseFlexibleTime(salonRange[1].trim(), possibleFormats);

                                if (salonStart != null && salonEnd != null) {
                                    boolean overlap = salonStart.isBefore(reqEnd) && salonEnd.isAfter(reqStart);
                                    if (overlap) {
                                        match = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (match) filteredSalons.add(salon);
        }

        return filteredSalons;
    }

    private LocalTime parseFlexibleTime(String timeStr, DateTimeFormatter[] formats) {
        String cleanTime = timeStr.trim().toUpperCase();
        if (!cleanTime.contains("AM") && !cleanTime.contains("PM")) {
            cleanTime += " AM";
        }
        for (DateTimeFormatter f : formats) {
            try {
                return LocalTime.parse(cleanTime, f);
            } catch (Exception ignored) {}
        }
        return null;
    }

    // Delete slot with normalization
    public boolean deleteSlot(String id, String slot) {
        AdminEntity salon = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found"));

        List<String> existingschedule = salon.getSchedule();
        if (existingschedule != null) {
            String normalizedSlot = normalizeSlot(slot);
            for (String s : new ArrayList<>(existingschedule)) {
                if (normalizeSlot(s).equalsIgnoreCase(normalizedSlot)) {
                    existingschedule.remove(s);
                    deletedSchedule.add(s);
                    salon.setSchedule(existingschedule);
                    adminRepository.save(salon);
                    return true;
                }
            }
        }
        return false;
    }

    // Restore slot
    public boolean restoreSlot(String id, String slot) {
        AdminEntity salon = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found"));

        List<String> existingschedule = salon.getSchedule();
        if (deletedSchedule != null) {
            String normalizedSlot = normalizeSlot(slot);
            for (String s : new ArrayList<>(deletedSchedule)) {
                if (normalizeSlot(s).equalsIgnoreCase(normalizedSlot)) {
                    existingschedule.add(s);
                    salon.setSchedule(existingschedule);
                    adminRepository.save(salon);
                    deletedSchedule.remove(s);
                    return true;
                }
            }
        }
        return false;
    }

    private String normalizeSlot(String slot) {
        return slot.replace("–", "-").replace("to", "-").replace("TO", "-").trim();
    }

    public void deleteSalon(String id) {
        adminRepository.deleteById(id);
    }
}
