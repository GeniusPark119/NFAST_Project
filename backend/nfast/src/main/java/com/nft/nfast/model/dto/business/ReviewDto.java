package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Review;
import lombok.*;

import java.math.BigInteger;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private long reviewSequence;
    private int reviewTopic;
    private int reviewSubTopic;
    private long storeSequence;
    private long userSequence;

    public Review toEntity(){
        Review review = Review.builder()
                .reviewSequence(reviewSequence)
                .reviewTopic(reviewTopic)
                .reviewSubTopic(reviewSubTopic)
                .storeSequence(storeSequence)
                .userSequence(userSequence)
                .build();
        return review;
    }
}
