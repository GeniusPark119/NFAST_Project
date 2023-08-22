package com.nft.nfast.repository;

import com.nft.nfast.entity.business.IncomeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeListRepository extends JpaRepository<IncomeList,Long> {
    List<IncomeList> findAllByStoreSequenceOrderByIncomeListDateDesc(Long storeSequence);

    // 전체 수익 중 민팅 수입
    @Query(value="select * from income_list where store_sequence=:storeSequence and month(income_list_date)=month(now()) and income_list_type=0", nativeQuery = true)
    List<IncomeList> findMintIncome(@Param("storeSequence") long storeSequence);

    // 전체 수익 중 리셀 수입
    @Query(value="select * from income_list where store_sequence=:storeSequence and month(income_list_date)=month(now()) and income_list_type=1", nativeQuery = true)
    List<IncomeList> findResellIncome(@Param("storeSequence") long storeSequence);
}
