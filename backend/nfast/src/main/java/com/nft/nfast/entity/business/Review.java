package com.nft.nfast.entity.business;

import com.nft.nfast.model.dto.business.ReviewDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewSequence;

    @Column(nullable = false)
    private int reviewTopic;

    @Column
    private int reviewSubTopic;

    @Column(nullable = false)
    private long storeSequence;

    @Column(nullable = false)
    private long userSequence;

    @Builder
    public Review(long reviewSequence, int reviewTopic, int reviewSubTopic, long storeSequence, long userSequence) {
        this.reviewSequence = reviewSequence;
        this.reviewTopic = reviewTopic;
        this.reviewSubTopic = reviewSubTopic;
        this.storeSequence = storeSequence;
        this.userSequence = userSequence;
    }

    public ReviewDto toDto(){
        ReviewDto reviewDto = ReviewDto.builder()
                .reviewSequence(reviewSequence)
                .reviewTopic(reviewTopic)
                .reviewSubTopic(reviewSubTopic)
                .storeSequence(storeSequence)
                .userSequence(userSequence)
                .build();
        return reviewDto;
    }
}
