package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Nfast;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastGetDto {
    private long nfastSequence;
    private BigDecimal nfastPrice;
    private String nfastEigenvalue;
    private String nfastHash;
    private Date nfastDate;
    private String nfastQr;
    private String storeName;
    // 0326 추가
    private String nfastRefundQr;
    private String nfastStartTime;
    private String nfastEndTime;
    private Byte nfastMealType;
    private Byte nfastSaleState;
}
