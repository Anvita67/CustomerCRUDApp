package com.example.demo.Service;



import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.model.Customer;
import com.example.demo.model.User;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public User findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = CustomerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return UserService.create(customer);
    }

	private static UserDetails create(Customer customer) {
		// TODO Auto-generated method stub
		return null;
	}
}



