package com.nft.nfast.model.dto.business;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreDetailDto{
    private StoreDto store;
    private List<Object> storeNfastPriceMax;
    private List<Object> storeNfastPriceMin;
    private ReviewFindDto review;
}
