package com.nft.nfast.repository;

import com.nft.nfast.entity.user.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Long> {
    Optional<Token> findByTokenWallet(String wallet);
    Optional<Token> findByTokenUserSequence(long tokenUserSequence);
}
