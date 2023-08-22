package com.nft.nfast.repository;

import com.nft.nfast.entity.business.Review;
import com.nft.nfast.model.dto.business.ReviewFind;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    @Query(value = "SELECT ANY_VALUE(temp.reviewTopic) as reviewTopic, ANY_VALUE(temp.reviewSubTopic) as reviewSubTopic, MAX(cnt) as cnt FROM review review JOIN (SELECT review_topic as reviewTopic, review_sub_topic as reviewSubTopic, COUNT(*) as cnt FROM review WHERE store_sequence=?1 GROUP BY review_topic, review_sub_topic) temp ON review.review_topic = temp.reviewTopic AND review.review_sub_topic = temp.reviewSubTopic WHERE review.store_sequence=?1 GROUP BY review_topic ORDER BY review_topic;", nativeQuery = true)
    List<ReviewFind> findByStoreSequence(long storeSequence);

    //사용한 NFast 리스트
    List<Review> findAllByUserSequenceAndStoreSequence(long userSequence, long storeSequence);
}
