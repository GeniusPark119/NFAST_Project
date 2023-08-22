package com.nft.nfast.model.dto.business;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastPurchaseDto {
    private BigDecimal nfastPrice;
    private BigDecimal nfastHopePrice;
    private Byte nfastMealType;
    private String nfastDate;
    private int amount;
}
