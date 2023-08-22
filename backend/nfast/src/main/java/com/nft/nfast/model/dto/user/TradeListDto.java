package com.nft.nfast.model.dto.user;

import com.nft.nfast.entity.user.TradeList;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TradeListDto {
    private long tradeListSequence;
    private String tradeListTransaction;
    private BigDecimal tradeListPrice;
    private Date tradeListDate;
    private Byte tradeListType;
    private long userSequence;
    private long storeSequence;

    public TradeList toEntity(){
        TradeList tradeList = TradeList.builder()
                .tradeListSequence(tradeListSequence)
                .tradeListTransaction(tradeListTransaction)
                .tradeListPrice(tradeListPrice)
                .tradeListDate(tradeListDate)
                .tradeListType(tradeListType)
                .userSequence(userSequence)
                .storeSequence(storeSequence)
                .build();
        return tradeList;
    }
}
