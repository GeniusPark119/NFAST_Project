package com.nft.nfast.controller.user;

import com.nft.nfast.model.dto.business.NfastDetailDto;
import com.nft.nfast.model.dto.business.NfastDto;
import com.nft.nfast.model.dto.business.NfastPurchaseDto;
import com.nft.nfast.model.dto.business.NfastTradeDoneDto;
import com.nft.nfast.model.service.user.UserMainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/store")
@CrossOrigin(origins = "*")
public class StoreMainRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserMainService userMainService;

    //구매 가능한 NFast 리스트 출력
    @GetMapping("/{store_sequence}/purchase")
    public ResponseEntity<Map<String,Object>> availableNftList(@PathVariable long store_sequence){
        List<NfastPurchaseDto> nfastPurchaseDtoList = userMainService.findPurchaseNfast(store_sequence);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts",nfastPurchaseDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //구매할 날짜 nft 상세 정보 출력
    @PostMapping("/{storeSequence}/purchase/detail")
    public ResponseEntity<Map<String,Object>> availableNftDateList(@PathVariable("storeSequence") long storeSequence, @RequestBody NfastDetailDto nfast){
        List<NfastPurchaseDto> nfastPurchaseDtoList = userMainService.findAllByNfastDate(storeSequence,nfast);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts",nfastPurchaseDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //구매할 금액 nft 개수 입력 후 구매 확정
    @PostMapping("/{storeSequence}/{userSequence}/purchase/detail/confirm")
    public ResponseEntity<Map<String,Object>> confirmPurchaseNft(@PathVariable("storeSequence") long storeSequence,@PathVariable("userSequence") long userSequence, @RequestBody NfastPurchaseDto nfast){
        List<NfastDto> nfastDtoList = userMainService.savePurchaseNfast(storeSequence,userSequence,nfast);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts", nfastDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //판매 등록
    @PostMapping("/{storeSequence}/sale")
    public ResponseEntity<Map<String,Object>> tradeDone(@PathVariable("storeSequence") long storeSequence, @RequestBody NfastTradeDoneDto nfastTradeDoneDto){
        NfastDto nfastDto = userMainService.saveTradeNfast(nfastTradeDoneDto);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfast",nfastDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //북마크 등록
    @PostMapping("/{storeSequence}/bookmark/{userSequence}")
    public ResponseEntity<Map<String,Object>> bookmarkCheck(@PathVariable("storeSequence") long storeSequence, @PathVariable("userSequence") long userSequence){
        userMainService.saveBookmark(storeSequence,userSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //북마크 해제
    @DeleteMapping("/{storeSequence}/bookmark/{userSequence}")
    public ResponseEntity<Map<String,Object>> bookmarkUnCheck(@PathVariable("storeSequence") long storeSequence, @PathVariable("userSequence") long userSequence){
        userMainService.deleteBookmark(storeSequence,userSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 북마크 조회
    @GetMapping("/{storeSequence}/bookmark/{userSequence}")
    public ResponseEntity<Map<String, Object>> bookmarkIsMine(@PathVariable("storeSequence") long storeSequence, @PathVariable("userSequence") long userSequence){
        // 해당 유저로 북마크 존재하면 0, 존재하지 않으면 1
        Byte isMine = userMainService.isMyBookmark(storeSequence, userSequence);
        Map<String, Object> resultMap=new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("bookmark", isMine);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
    //판매 차익 계산
    @GetMapping("/{nfastSequence}/sale")
    public ResponseEntity<Map<String,Object>> tradeBenefit(@PathVariable("nfastSequence") long nfastSequence){
        BigDecimal nfastPrice = userMainService.findNfastPrice(nfastSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfastPrice",nfastPrice);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
}
