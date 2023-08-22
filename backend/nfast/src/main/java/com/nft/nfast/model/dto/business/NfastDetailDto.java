package com.nft.nfast.model.dto.business;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastDetailDto {
    private long storeSequence;
    private Byte nfastMealType;
    private Date nfastDate;
}
