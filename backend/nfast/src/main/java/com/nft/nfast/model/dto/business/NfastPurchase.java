package com.nft.nfast.model.dto.business;

import java.math.BigDecimal;
import java.util.Date;

public interface NfastPurchase {
    BigDecimal getPrice();
    BigDecimal getHopePrice();
    Date getNfastDate();
    int getAmount();
    Byte getNfastMealType();

}
