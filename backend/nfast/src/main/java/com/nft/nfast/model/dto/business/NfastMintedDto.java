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
public class NfastMintedDto {
    private Date nfastDate;
    private BigDecimal nfastDefaultPrice;
    private int nfastSaleCount;
    private int nfastTotalCount;

}
