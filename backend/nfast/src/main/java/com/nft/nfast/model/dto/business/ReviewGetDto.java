package com.nft.nfast.model.dto.business;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewGetDto {
    private long nfastSequence;
    private long userSequence;
    private ReviewFindDto reviews;
}
