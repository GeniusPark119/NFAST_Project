package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Store;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreFindDto {
    private long storeSequence;
    private String storeName;
}
