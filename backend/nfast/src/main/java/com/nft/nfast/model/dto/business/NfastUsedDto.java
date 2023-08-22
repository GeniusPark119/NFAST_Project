package com.nft.nfast.model.dto.business;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastUsedDto {
    private NfastGetDto nfast;
    private ReviewFindDto review;
}
