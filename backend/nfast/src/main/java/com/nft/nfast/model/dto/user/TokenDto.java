package com.nft.nfast.model.dto.user;

import com.nft.nfast.entity.user.Token;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private long tokenSequence;
    private String tokenAccess;
    private String tokenRefresh;
    private long tokenUserSequence;
    private Byte tokenType;
    private String tokenWallet;

    public Token toEntity(){
        Token token = Token.builder()
                .tokenSequence(tokenSequence)
                .tokenAccess(tokenAccess)
                .tokenRefresh(tokenRefresh)
                .tokenUserSequence(tokenUserSequence)
                .tokenType(tokenType)
                .tokenWallet(tokenWallet)
                .build();
        return token;
    }
}
