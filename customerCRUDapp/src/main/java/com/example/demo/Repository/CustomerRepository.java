package com.example.demo.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    static Optional<Customer> findByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	Page<Customer> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String search, String search2,
			Pageable pageable);
}








