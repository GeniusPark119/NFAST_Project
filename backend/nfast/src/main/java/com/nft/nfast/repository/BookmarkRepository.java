package com.nft.nfast.repository;

import com.nft.nfast.entity.user.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark,Long> {
    Optional<Bookmark> findByStoreSequenceAndUserSequence(long storeSequence,long userSequence);
    void deleteByStoreSequenceAndUserSequence(long storeSequence, long userSequence);
    List<Bookmark> findAllByUserSequence(long userSequence);
}
