package com.nft.nfast.model.dto.business;

import java.math.BigDecimal;
import java.util.Date;

public interface NfastMinted {
    Date getNfastDate();
    BigDecimal getNfastDefaultPrice();
    int getNfastSaleCount();
    int getNfastTotalCount();
}
