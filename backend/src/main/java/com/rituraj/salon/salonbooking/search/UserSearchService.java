// package com.rituraj.salon.salonbooking.search;

// import com.rituraj.salon.salonbooking.model.UserEntity;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class UserSearchService {

//     private final UserSearchRepository repository;

//     public UserSearchService(UserSearchRepository repository) {
//         this.repository = repository;
//     }

//     // Index a single user into Elasticsearch
//     public void indexUser(UserEntity user) {
//         UserSearchDocument doc = new UserSearchDocument(
//                 user.getId(),
//                 user.getUsername(),
//                 user.getEmail(),
//                 user.getMobilenumber()
//         );
//         repository.save(doc);
//     }

//     // Bulk index
//     public void indexUsers(List<UserEntity> users) {
//         users.forEach(this::indexUser);
//     }

//     // Search by username (partial match)
//     public List<UserSearchDocument> searchUsers(String query) {
//         return repository.findByUsernameContainingIgnoreCase(query);
//     }
// }
