package com.nft.nfast.entity.user;

import com.nft.nfast.model.dto.user.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigInteger;

@Getter
@Entity
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userSequence;

    @Column(nullable = false)
    private String userWallet;

    @Column
    private String userImage;

    @Column(length = 50)
    @ColumnDefault("unnamed")
    private String userNickname;

    @Builder
    public User(long userSequence, String userWallet, String userImage, String userNickname) {
        this.userSequence = userSequence;
        this.userWallet = userWallet;
        this.userImage = userImage;
        this.userNickname = userNickname;
    }

    public UserDto toDto(){
        UserDto userDto = UserDto.builder()
                .userSequence(userSequence)
                .userWallet(userWallet)
                .userImage(userImage)
                .userNickname(userNickname)
                .build();
        return userDto;
    }
}
