package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Store;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfastMintDto {
    private Long storeSequence;
    private Date nfastDate;
    private BigDecimal nfastDefaultPrice;
    private String nfastStartTime;
    private String nfastEndTime;
    private int nfastSupply;
    private String nfastEigenvalue;
    private List<String> nfastHash;
//    private List<String> nfastTokenId;
    private List<String> nfastQr;
    private List<String> nfastRefundQr;
    private Byte nfastMealType;
    private Byte nfastUseState;
    private Byte nfastSaleState;


    public Nfast toMintEntity(Store store,String nfastHash,String nfastQr, String nfastRefundQr){
        Nfast nfast = Nfast.builder()
                .nfastPrice(nfastDefaultPrice)
                .nfastDefaultPrice(nfastDefaultPrice)
                .nfastHopePrice(nfastDefaultPrice)
                .nfastDate(nfastDate)
                .nfastQr(nfastQr)
                .nfastRefundQr(nfastRefundQr)
                .nfastEigenvalue(nfastEigenvalue)
                .nfastHash(nfastHash)
                .storeSequence(store)
                .nfastMealType(nfastMealType)
                .nfastStartTime(nfastStartTime)
                .nfastEndTime(nfastEndTime)
                .nfastUseState(nfastUseState)
                .nfastSaleState(nfastSaleState)
                .nfastHash(nfastHash)
                .build();
        return nfast;
    }
}