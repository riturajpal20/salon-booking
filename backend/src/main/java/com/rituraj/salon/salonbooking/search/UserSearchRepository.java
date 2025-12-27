// package com.rituraj.salon.salonbooking.search;

// import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
// import java.util.List;

// public interface UserSearchRepository extends ElasticsearchRepository<UserSearchDocument, String> {

//     // Search by username (partial match)
//     List<UserSearchDocument> findByUsernameContainingIgnoreCase(String username);

//     // Search by email exact match
//     List<UserSearchDocument> findByEmail(String email);

//     // Search by mobile exact match
//     List<UserSearchDocument> findByMobilenumber(String mobilenumber);
// }
