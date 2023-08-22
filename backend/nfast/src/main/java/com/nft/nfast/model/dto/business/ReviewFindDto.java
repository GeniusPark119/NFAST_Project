package com.nft.nfast.model.dto.business;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewFindDto {
    private String[] reviewTime;
    private String[] reviewConvenience;
    private String[] reviewService;
    private String[] reviewMood;
}
