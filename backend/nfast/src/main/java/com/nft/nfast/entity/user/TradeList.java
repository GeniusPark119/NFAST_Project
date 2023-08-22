package com.nft.nfast.entity.user;

import com.nft.nfast.model.dto.user.TradeFindDto;
import com.nft.nfast.model.dto.user.TradeListDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Getter
@Entity
@NoArgsConstructor
@Builder
public class TradeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tradeListSequence;

    @Column(nullable = false)
    private String tradeListTransaction;

    @Column(nullable = false)
    private BigDecimal tradeListPrice;

    @Column(nullable = false)
    private Date tradeListDate;

    @Column(nullable = false)
    private Byte tradeListType;

    @Column(nullable = false)
    private long storeSequence;

    @Column(nullable = false)
    private long userSequence;

    @Builder
    public TradeList(long tradeListSequence, String tradeListTransaction, BigDecimal tradeListPrice, Date tradeListDate, Byte tradeListType, long storeSequence, long userSequence) {
        this.tradeListSequence = tradeListSequence;
        this.tradeListTransaction = tradeListTransaction;
        this.tradeListPrice = tradeListPrice;
        this.tradeListDate = tradeListDate;
        this.tradeListType = tradeListType;
        this.userSequence = userSequence;
        this.storeSequence = storeSequence;
    }

    public TradeListDto toDto(){
        TradeListDto tradeListDto = TradeListDto.builder()
                .tradeListSequence(tradeListSequence)
                .tradeListTransaction(tradeListTransaction)
                .tradeListPrice(tradeListPrice)
                .tradeListDate(tradeListDate)
                .tradeListType(tradeListType)
                .storeSequence(storeSequence)
                .userSequence(userSequence)
                .build();
        return tradeListDto;
    }

    public TradeFindDto toFindDto() throws ParseException {
        SimpleDateFormat tranSimpleFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
        TradeFindDto tradeFindDto = TradeFindDto.builder()
                .tradeListTransaction(tradeListTransaction)
                .tradeListPrice(tradeListPrice)
                .tradeListDate(tradeListDate)
                .tradeListType(tradeListType)
                .build();
        return tradeFindDto;
    }
}
