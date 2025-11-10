package com.rituraj.salon.salonbooking.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.rituraj.salon.salonbooking.model.UserEntity;
import com.rituraj.salon.salonbooking.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.Optional;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Map;
import java.util.HashMap;



@Service
public class UserService {

    private final UserRepository userRepository;
    private final GoogleAuthService googleAuthService;
   private final Key JWT_SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Autowired
    public UserService(UserRepository userRepository, GoogleAuthService googleAuthService) {
        this.userRepository = userRepository;
        this.googleAuthService = googleAuthService;
    }

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity loginUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(password)) throw new RuntimeException("Invalid password");
        return user;
    }

   public Map<String, Object> loginWithGoogle(String idTokenString) {
            try {
                GoogleIdToken.Payload payload = googleAuthService.verifyToken(idTokenString);
                String email = payload.getEmail();
                String name = (String) payload.get("name");

            
                Optional<UserEntity> existingUser = userRepository.findByEmail(email);
                UserEntity user;

                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                 
                    user = new UserEntity();
                    user.setEmail(email);
                    user.setUsername(name);
                    user.setPassword(""); 
                    user = userRepository.save(user);
                }

               
                String token = generateJwt(user);

                Map<String, Object> response = new HashMap<>();
                response.put("user", user);
                response.put("token", token);
                return response;

            } catch (Exception e) {
                throw new RuntimeException("Google login failed: " + e.getMessage(), e);
            }
    }


    // Optional: generate JWT for frontend
   public String generateJwt(UserEntity user) {
    long now = System.currentTimeMillis();
    return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("name", user.getUsername())
            .setIssuedAt(new Date(now))
            .setExpiration(new Date(now + 86400000)) // 1 day
            .signWith(JWT_SECRET_KEY)
            .compact();
}
}
