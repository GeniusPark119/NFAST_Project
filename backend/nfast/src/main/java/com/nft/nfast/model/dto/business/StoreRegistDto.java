package com.nft.nfast.model.dto.business;

import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Store;
import com.nft.nfast.entity.user.Token;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreRegistDto {
    // 사업자 등록번호
    private String storeInfoNumber;
    
    // 주소
    private String storeAddress;
    
    // 사장님 지갑 주소
    private String storeWallet;
    private String storeName;
    private String storeLunchStart;
    private String storeLunchEnd;
    private String storeDinnerStart;
    private String storeDinnerEnd;
    private String storePhone;
    private String storeInformation;
    private String storeImage;
    private String storeDetail;

//    public StoreRegistDto toEntity(){
//        StoreRegistDto storeRegistDto = StoreRegistDto.builder()
//                .storeName(this.getStoreName())
//                .storeInformation(this.getStoreInformation())
//                .storeWallet(this.getStoreWallet())
//                .storeAddress(this.getStoreAddress())
//                .storePhone(this.getStorePhone())
//                .storeImage(this.getStoreImage())
//                .storeLunchStart(this.getStoreLunchStart())
//                .storeLunchEnd(this.getStoreLunchEnd())
//                .storeDinnerStart(this.getStoreDinnerStart())
//                .storeDinnerEnd(this.getStoreDinnerEnd())
//                .build();
//        return storeRegistDto;
//    }
}
