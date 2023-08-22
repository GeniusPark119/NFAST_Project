package com.nft.nfast.model.dto.user;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TradeFindDto {
    private String tradeListTransaction;
    private BigDecimal tradeListPrice;
    private Date tradeListDate;
    private Byte tradeListType;
    private String storeName;
}

