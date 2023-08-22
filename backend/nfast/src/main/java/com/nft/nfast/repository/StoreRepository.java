package com.nft.nfast.repository;

import com.nft.nfast.entity.business.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store,Long> {
    List<Store> findAllByStoreNameContaining(String storeName);
    @Query(value = "select * from store", nativeQuery = true)
    List<Store> findAllStore();
    Optional<Store> findByStoreName(String storeName);
    Store findByStoreSequence(Long storeSequence);
    Optional<Store> findByStoreWallet(String storeWallet);
}
