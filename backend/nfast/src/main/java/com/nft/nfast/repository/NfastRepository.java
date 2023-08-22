package com.nft.nfast.repository;

import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Review;
import com.nft.nfast.model.dto.business.NfastMinted;
import com.nft.nfast.model.dto.business.NfastMintedDto;
import com.nft.nfast.model.dto.business.NfastPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface NfastRepository extends JpaRepository<Nfast,Long> {
    //거래 내역 리스트
    List<Nfast> findAllByUserSequence(long userSequence);

    //미사용 NFasT 리스트
    @Query(value="select * from nfast where user_sequence=?1 and nfast_use_state=0 order by nfast_date", nativeQuery = true)
    List<Nfast> findUnUsedByUserSequence(long userSequence);

    //구매 가능한 NFast 리스트 출력
    @Query(value="select nfast_date as nfastDate,count(*) as amount, min(nfast_hope_price) as price, nfast_meal_type as nfastMealType from nfast where store_sequence=?1 and nfast_sale_state!=1 group by nfast_date, nfast_meal_type order by nfast_date",nativeQuery = true)
    List<NfastPurchase> findAllByStoreSequenceOrderByNfastDateDesc(long storeSequence);

    //구매할 날짜 nft 상세 정보 출력
    @Query(value="select nfast_date as nfastDate, count(*) as amount, nfast_hope_price as hopePrice, nfast_meal_type as nfastMealType from nfast where store_sequence=?1 and nfast_date=?2 and nfast_meal_type=?3 and nfast_sale_state!=1 group by nfast_hope_price order by nfast_hope_price", nativeQuery = true)
    List<NfastPurchase> findAllByNfastDate(long storeSequence, String nfastDate, Byte nfastMealType);

    // 발행한 NFT 보기 (날짜별 가격, 판매 현황)
    @Query(value=
            "select nfast_date as nfastDate, count(case when nfast_sale_state!=0 then 1 end) as nfastSaleCount, count(*) as nfastTotalCount from nfast where store_sequence=:store group by nfast_date order by nfast_date desc", nativeQuery = true)
    List<NfastMinted> findUsedByNfastDate(@Param("store") Long store);

    //구매할 금액 nft 개수 입력 후 구매 확정
    @Query(value="select * from nfast where store_sequence=?1 and nfast_date=?2 and nfast_meal_type=?3 and nfast_sale_state!=1 order by nfast_hope_price limit ?4", nativeQuery = true)
    List<Nfast> findTopAmountNfastByParam(long storeSequence, String nfastDate, Byte nfastMealType, int amount);

    // 발행한 NFT 보기 (해당 날짜에 발행된 초기 비용)
    @Query(value = "select max(nfast_default_price) as nfastDefaultPrice from nfast where nfast_date=:mintedDate", nativeQuery = true)
    BigDecimal findDefaultPriceByNfastDate(@Param("mintedDate") Date mintedDate);

    //가게명 검색(일주일치 최고 가격)
    @Query(value="SELECT MAX(nfast_price) as nfastPrice FROM nfast WHERE store_sequence=:storeSequence GROUP BY nfast_date HAVING nfast_date BETWEEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (WEEKDAY(NOW()) + 7) DAY), '%Y-%m-%d') AND DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (WEEKDAY(NOW()) + 1) DAY), '%Y-%m-%d');", nativeQuery = true)
    List<Object> findMaxNfastPriceGroupByNfastDate(@Param("storeSequence") long storeSequence);

    //가게명 검색(일주일치 최저 가격)
    @Query(value="SELECT MIN(nfast_price) as nfast_price FROM nfast WHERE store_sequence=:storeSequence GROUP BY nfast_date HAVING nfast_date BETWEEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (WEEKDAY(NOW()) + 7) DAY), '%Y-%m-%d') AND DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (WEEKDAY(NOW()) + 1) DAY), '%Y-%m-%d');", nativeQuery = true)
    List<Object> findMinNfastPriceGroupByNfastDate(@Param("storeSequence") long storeSequence);

    //NFT 사용 완료 확인
    Optional<Nfast> findByUserSequenceAndNfastSequence(long userSequence, long nfastSequence);

    //사용한 NFast 리스트
    @Query(value = "select * from nfast where user_sequence=?1 and nfast_use_state=1 order by nfast_date",nativeQuery = true)
    List<Nfast> findAllNfastByUserSequenceAndNfastUseState(long userSequence);

    @Query(value="select * from nfast where nfast_use_state=0 and nfast_sale_state=1 and user_sequence=:userSequence order by nfast_date LIMIT 1", nativeQuery = true)
    Optional<Nfast> findOneByUser(@Param("userSequence") long userSequence);

    @Query(value = "select * from nfast where nfast_sequence=:nfastSequence", nativeQuery = true)
    Nfast findAllByNfastSequence(long nfastSequence);

    @Modifying
    @Query(value = "update nfast set nfast_use_state=?1 where nfast_sequence=?2", nativeQuery = true)
    void changeUseState(int i, long nfastSequence);
}

