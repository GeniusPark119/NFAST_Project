package com.nft.nfast.repository;

import com.nft.nfast.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserWallet(String userWallet);
}
