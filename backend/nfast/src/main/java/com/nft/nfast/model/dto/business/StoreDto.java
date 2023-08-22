package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Store;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreDto {
    private long storeSequence;
    private String storeWallet;
    private String storeName;
    private String storeCategory;
    private String storeAddress;
    private String storePhone;
    private String storeInformation;
    private String storeImage;
    private String storeDetail;
    private Date storeDate;
    private String storeLat;
    private String storeLng;
    private String storeLunchStart;
    private String storeLunchEnd;
    private String storeDinnerStart;
    private String storeDinnerEnd;
    private long storeCount;

    public Store toEntity(){
        Store owner = Store.builder()
                .storeSequence(storeSequence)
                .storeWallet(storeWallet)
                .storeName(storeName)
                .storeCategory(storeCategory)
                .storeAddress(storeAddress)
                .storePhone(storePhone)
                .storeImage(storeImage)
                .storeDetail(storeDetail)
                .storeDate(storeDate)
                .storeLat(storeLat)
                .storeLng(storeLng)
                .storeInformation(storeInformation)
                .storeLunchStart(storeLunchStart)
                .storeLunchEnd(storeLunchEnd)
                .storeDinnerStart(storeDinnerStart)
                .storeDinnerEnd(storeDinnerEnd)
                .storeCount(storeCount)
                .build();
        return owner;
    }
}
