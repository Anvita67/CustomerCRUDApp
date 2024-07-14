package com.example.demo.Security;

import com.example.demo.model.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.beans.JavaBean;
import java.util.Collection;
import java.util.Collections;

@JavaBean
public class JWTUserDetails implements UserDetails {

    private final String email;
    private final String password;
     public JWTUserDetails(String email, String password) {
        this.email = email;
        this.password = password;
    }
  
    public static JWTUserDetails create(Customer customer) {
        return new JWTUserDetails(
                customer.getEmail(),
                customer.getPassword()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Return roles if you have them
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
