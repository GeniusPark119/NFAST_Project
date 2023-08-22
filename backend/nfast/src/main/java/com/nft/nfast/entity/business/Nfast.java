package com.nft.nfast.entity.business;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nft.nfast.model.dto.business.NfastDto;
import com.nft.nfast.model.dto.business.NfastGetDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "nfast")
public class Nfast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long nfastSequence;

    @Column(nullable = false)
    private Byte nfastMealType;

    @Column(nullable = false)
    private BigDecimal nfastPrice;

    @Column(nullable = false)
    private String nfastEigenvalue;

    @Column(nullable = false)
    private String nfastHash;

    @Column(nullable = false)
    private Date nfastDate;

    @Column(nullable = false, length = 20)
    private String nfastStartTime;

    @Column(nullable = false, length = 20)
    private String nfastEndTime;

    @Column
    @ColumnDefault("0")
    private Byte nfastUseState;

    @Column
    @ColumnDefault("0")
    private Byte nfastSaleState;

    @Column
    @ColumnDefault("0")
    private long nfastTransactionCount;

    @Column(nullable = false)
    private BigDecimal nfastDefaultPrice;

    @Column(nullable = false)
    private String nfastQr;

    @Column(nullable = false)
    private String nfastRefundQr;

    @Column(nullable=false)
    private BigDecimal nfastHopePrice;

    @Column
    private long userSequence;

    @ManyToOne
    @JoinColumn(name="store_sequence", referencedColumnName = "storeSequence", nullable = false)
    private Store storeSequence;

    @Builder
    public Nfast(long nfastSequence, Byte nfastMealType, BigDecimal nfastPrice, String nfastEigenvalue, String nfastHash, Date nfastDate, String nfastStartTime, String nfastEndTime, Byte nfastUseState, Byte nfastSaleState, long nfastTransactionCount, BigDecimal nfastDefaultPrice, String nfastQr, String nfastRefundQr, BigDecimal nfastHopePrice, long userSequence, Store storeSequence) {

        this.nfastSequence = nfastSequence;
        this.nfastMealType = nfastMealType;
        this.nfastPrice = nfastPrice;
        this.nfastEigenvalue = nfastEigenvalue;
        this.nfastHash=nfastHash;
        this.nfastDate = nfastDate;
        this.nfastStartTime = nfastStartTime;
        this.nfastEndTime = nfastEndTime;
        this.nfastUseState = nfastUseState;
        this.nfastSaleState = nfastSaleState;
        this.nfastTransactionCount = nfastTransactionCount;
        this.nfastDefaultPrice = nfastDefaultPrice;
        this.nfastQr = nfastQr;
        this.nfastRefundQr = nfastRefundQr;
        this.nfastHopePrice = nfastHopePrice;
        this.userSequence = userSequence;
        this.storeSequence = storeSequence;
    }

    public NfastDto toDto(){
        NfastDto nfastDto = NfastDto.builder()
                .nfastSequence(nfastSequence)
                .nfastPrice(nfastPrice)
                .nfastEigenvalue(nfastEigenvalue)
                .nfastHash(nfastHash)
                .nfastDate(nfastDate)
                .nfastMealType(nfastMealType)
                .nfastUseState(nfastUseState)
                .nfastSaleState(nfastSaleState)
                .nfastTransactionCount(nfastTransactionCount)
                .nfastDefaultPrice(nfastDefaultPrice)
                .nfastQr(nfastQr)
                .nfastHopePrice(nfastHopePrice)
                .storeSequence(storeSequence)
                .userSequence(userSequence)
                .nfastStartTime(nfastStartTime)
                .nfastEndTime(nfastEndTime)
                .nfastRefundQr(nfastRefundQr)
                .build();
        return nfastDto;
    }

    public NfastGetDto toGetDto(){
        NfastGetDto nfastGetDto = NfastGetDto.builder()
                .nfastSequence(nfastSequence)
                .nfastPrice(nfastPrice)
                .nfastEigenvalue(nfastEigenvalue)
                .nfastHash(nfastHash)
                .nfastDate(nfastDate)
                .nfastQr(nfastQr)
                .storeName(storeSequence.getStoreName())
                .nfastRefundQr(nfastRefundQr)
                .nfastStartTime(nfastStartTime)
                .nfastRefundQr(nfastRefundQr)
                .nfastMealType(nfastMealType)
                .nfastSaleState(nfastSaleState)
                .build();
        return nfastGetDto;
    }
}
