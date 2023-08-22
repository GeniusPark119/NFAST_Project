package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.IncomeList;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncomeListDto {
    private long incomeListSequence;

    private String incomeListTransaction;
    private BigDecimal incomeListPrice;
    private Date incomeListDate;
    private Byte incomeListType;
    private long storeSequence;

    public IncomeList toEntity(){
        IncomeList incomeList = IncomeList.builder()

                .incomeListSequence(incomeListSequence)
                .incomeListTransaction(incomeListTransaction)
                .incomeListPrice(incomeListPrice)
                .incomeListDate(incomeListDate)
                .incomeListType(incomeListType)
                .storeSequence(storeSequence)
                .build();
        return incomeList;
    }
}
