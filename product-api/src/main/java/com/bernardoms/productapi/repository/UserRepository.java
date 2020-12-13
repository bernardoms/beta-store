package com.bernardoms.productapi.repository;

import com.bernardoms.productapi.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);
}
