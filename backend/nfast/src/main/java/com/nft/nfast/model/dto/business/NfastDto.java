package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Store;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastDto {
    private long nfastSequence;
    private Byte nfastMealType;
    private BigDecimal nfastPrice;
    private String nfastEigenvalue;
    private String nfastHash;
    private Date nfastDate;
    private String nfastStartTime;
    private String nfastEndTime;
    private Byte nfastUseState;
    private Byte nfastSaleState;
    private long nfastTransactionCount;
    private BigDecimal nfastDefaultPrice;
    private String nfastQr;
    private String nfastRefundQr;
    private BigDecimal nfastHopePrice;
    private long userSequence;
    private Store storeSequence;

    public Nfast toEntity() {
        Nfast nfast = Nfast.builder()
                .nfastSequence(nfastSequence)
                .nfastPrice(nfastPrice)
                .nfastHopePrice(nfastHopePrice)
                .nfastEigenvalue(nfastEigenvalue)
                .nfastHash(nfastHash)
                .nfastDate(nfastDate)
                .nfastUseState(nfastUseState)
                .nfastSaleState(nfastSaleState)
                .nfastTransactionCount(nfastTransactionCount)
                .nfastDefaultPrice(nfastDefaultPrice)
                .nfastQr(nfastQr)
                .nfastMealType(nfastMealType)
                .storeSequence(storeSequence)
                .userSequence(userSequence)
                .nfastStartTime(nfastStartTime)
                .nfastEndTime(nfastEndTime)
                .nfastRefundQr(nfastRefundQr)
                .build();
        return nfast;
    }
}
