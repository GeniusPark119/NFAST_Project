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
public class IncomeFindDto {
//    private Long incomeListSequence;
    private String incomeListTransaction;
    private BigDecimal incomeListPrice;
    private Date incomeListDate;
    private Byte incomeListType;

}
