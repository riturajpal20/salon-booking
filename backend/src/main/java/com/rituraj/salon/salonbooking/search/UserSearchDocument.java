// package com.rituraj.salon.salonbooking.search;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.elasticsearch.annotations.Document;
// import org.springframework.data.elasticsearch.annotations.Field;
// import org.springframework.data.elasticsearch.annotations.FieldType;

// @Document(indexName = "users_search")
// public class UserSearchDocument {

//     @Id
//     private String id;

//     @Field(type = FieldType.Text)
//     private String username;

//     @Field(type = FieldType.Keyword)
//     private String email;

//     @Field(type = FieldType.Keyword)
//     private String mobilenumber;

//     public UserSearchDocument() {}

//     public UserSearchDocument(String id, String username, String email, String mobilenumber) {
//         this.id = id;
//         this.username = username;
//         this.email = email;
//         this.mobilenumber = mobilenumber;
//     }

//     public String getId() { return id; }
//     public void setId(String id) { this.id = id; }

//     public String getUsername() { return username; }
//     public void setUsername(String username) { this.username = username; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getMobilenumber() { return mobilenumber; }
//     public void setMobilenumber(String mobilenumber) { this.mobilenumber = mobilenumber; }
// }
