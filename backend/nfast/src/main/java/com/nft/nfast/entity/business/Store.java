package com.nft.nfast.entity.business;

import com.nft.nfast.model.dto.business.StoreDto;
import com.nft.nfast.model.dto.business.StoreFindDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name="store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long storeSequence;

    @Column(nullable = false)
    private String storeWallet;

    @Column(nullable = false, length = 50)
    private String storeName;

    @Column(nullable = false, length = 20)
    private String storeCategory;

    @Column(nullable = false)
    private String storeAddress;

    @Column(nullable = false, length = 20)
    private String storePhone;

    @Column
    private String storeInformation;

    @Column
    private String storeImage;

    @Column
    private String storeDetail;

    @Column(nullable = false)
    private Date storeDate;

    @Column(nullable = false, length = 25)
    private String storeLat;

    @Column(nullable = false, length = 25)
    private String storeLng;

    @Column(length = 20)
    private String storeLunchStart;

    @Column(length = 20)
    private String storeLunchEnd;

    @Column(length = 20)
    private String storeDinnerStart;

    @Column(length = 20)
    private String storeDinnerEnd;

    @Column(nullable = false)
    @ColumnDefault("0")
    private long storeCount;

    @Builder
    public Store(long storeSequence, String storeWallet, String storeName, String storeCategory, String storeAddress, String storePhone, String storeInformation, String storeImage, String storeDetail, Date storeDate, String storeLat, String storeLng, String storeLunchStart, String storeLunchEnd, String storeDinnerStart, String storeDinnerEnd, long storeCount) {
        this.storeSequence = storeSequence;
        this.storeWallet = storeWallet;
        this.storeName = storeName;
        this.storeCategory = storeCategory;
        this.storeAddress = storeAddress;
        this.storePhone = storePhone;
        this.storeInformation = storeInformation;
        this.storeImage = storeImage;
        this.storeDetail = storeDetail;
        this.storeDate = storeDate;
        this.storeLat = storeLat;
        this.storeLng = storeLng;
        this.storeLunchStart = storeLunchStart;
        this.storeLunchEnd = storeLunchEnd;
        this.storeDinnerStart = storeDinnerStart;
        this.storeDinnerEnd = storeDinnerEnd;
        this.storeCount = storeCount;
    }

    public StoreDto toDto(){
        StoreDto storeDto = StoreDto.builder()
                .storeSequence(storeSequence)
                .storeWallet(storeWallet)
                .storeName(storeName)
                .storeCategory(storeCategory)
                .storeAddress(storeAddress)
                .storePhone(storePhone)
                .storeImage(storeImage)
                .storeDetail(storeDetail)
                .storeLunchStart(storeLunchStart)
                .storeLunchEnd(storeLunchEnd)
                .storeDinnerStart(storeDinnerStart)
                .storeDinnerEnd(storeDinnerEnd)
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
        return storeDto;
    }

    public StoreFindDto toFindDto(){
        StoreFindDto storeFindDto = StoreFindDto.builder()
                .storeSequence(storeSequence)
                .storeName(storeName)
                .build();
        return storeFindDto;
    }

}
