package com.nft.nfast.entity.user;

import com.nft.nfast.model.dto.user.TokenDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Builder
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tokenSequence;
    @Column
    private String tokenAccess;
    @Column
    private String tokenRefresh;
    @Column(nullable = false)
    private long tokenUserSequence;
    @Column(nullable = false)
    private Byte tokenType;
    @Column(nullable = false)
    private String tokenWallet;

    @Builder
    public Token(long tokenSequence, String tokenAccess, String tokenRefresh, long tokenUserSequence, Byte tokenType, String tokenWallet) {
        this.tokenSequence = tokenSequence;
        this.tokenAccess = tokenAccess;
        this.tokenRefresh = tokenRefresh;
        this.tokenUserSequence = tokenUserSequence;
        this.tokenType = tokenType;
        this.tokenWallet = tokenWallet;
    }

    public TokenDto toDto(){
        TokenDto tokenDto = TokenDto.builder()
                .tokenSequence(tokenSequence)
                .tokenAccess(tokenAccess)
                .tokenRefresh(tokenRefresh)
                .tokenUserSequence(tokenUserSequence)
                .tokenType(tokenType)
                .tokenWallet(tokenWallet)
                .build();
        return tokenDto;
    }
}
