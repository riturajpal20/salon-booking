// package com.rituraj.salon.salonbooking.search;

// import com.rituraj.salon.salonbooking.model.UserEntity;
// import com.rituraj.salon.salonbooking.repository.UserRepository;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/search")
// public class UserSearchController {

//     private final UserSearchService searchService;
//     private final UserRepository userRepository;

//     public UserSearchController(UserSearchService searchService, UserRepository userRepository) {
//         this.searchService = searchService;
//         this.userRepository = userRepository;
//     }

 
//     @GetMapping("/users")
//     public List<UserSearchDocument> searchUsers(@RequestParam String query) {
//         return searchService.searchUsers(query);
//     }

   
//     @PostMapping("/index/{userId}")
//     public String indexSingleUser(@PathVariable String userId) {
//         UserEntity user = userRepository.findById(userId).orElse(null);

//         if (user == null) {
//             return "User not found";
//         }

//         searchService.indexUser(user);
//         return "User indexed successfully";
//     }

   
//     @PostMapping("/index-all")
//     public String indexAllUsers() {
//         List<UserEntity> allUsers = userRepository.findAll();
//         searchService.indexUsers(allUsers);
//         return "All users indexed successfully";
//     }
// }
