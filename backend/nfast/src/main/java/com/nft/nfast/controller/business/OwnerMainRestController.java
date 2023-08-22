package com.nft.nfast.controller.business;

import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Store;
import com.nft.nfast.model.dto.business.*;
import com.nft.nfast.model.dto.user.TokenDto;
import com.nft.nfast.model.service.store.StoreMainService;
import com.nft.nfast.repository.NfastRepository;
import com.nft.nfast.repository.StoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "*")
public class OwnerMainRestController {
    @Autowired
    private NfastRepository nfastRepository;
    @Autowired
    private StoreRepository storeRepository;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    StoreMainService storeMainService;

    // 가게 NFast 발행
    @PostMapping("/{storeSequence}/mint")
    public ResponseEntity<String> mintNfast(@RequestBody NfastMintDto mintDto, @PathVariable Long storeSequence){
        System.out.println("Controller "+mintDto);
        storeMainService.saveNfast(mintDto);
        String result=SUCCESS;
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    // 전체 수입 내역 출력
    @GetMapping("{storeSequence}/incomes")
    public ResponseEntity<Map<String, Object>> incomeList(@PathVariable long storeSequence){
        Map<String, Object> resultMap = new HashMap<>();
        List<IncomeFindDto> incomeGetDtoList=storeMainService.findAllIncomes(storeSequence);

        resultMap.put("result", SUCCESS);
        resultMap.put("incomes", incomeGetDtoList);
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }

    // 월별 발행 수익 출력
    @GetMapping("{storeSequence}/monthly-mint-income")
    public ResponseEntity<Map<String, Object>> mintIncome(@PathVariable long storeSequence){
        Map<String, Object> resultMap = new HashMap<>();
        BigDecimal mintIncome = storeMainService.findMintIncome(storeSequence);

        resultMap.put("result", SUCCESS);
        resultMap.put("monthlyMintIncome", mintIncome);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 월별 리셀 수익 출력
    @GetMapping("{storeSequence}/monthly-resell-income")
    public ResponseEntity<Map<String, Object>> resellIncome(@PathVariable long storeSequence){
        Map<String, Object> resultMap = new HashMap<>();
        BigDecimal resellIncome = storeMainService.findResellIncome(storeSequence);

        resultMap.put("result", SUCCESS);
        resultMap.put("monthlyResellIncome", resellIncome);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 발행한 NFasT 목록
    @GetMapping("{storeSequence}/nfts")
    public ResponseEntity<Map<String, Object>> mintedNfast(@PathVariable Long storeSequence) throws Exception{
        Map<String, Object> resultMap=new HashMap<>();
        List<NfastMintedDto> mintedNfastList=storeMainService.findMintedNfast(storeSequence);
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts", mintedNfastList);

        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 가게 등록
    @PostMapping("/introduction-store/application")
    public ResponseEntity<Map<String,Object>> applyStore(@RequestBody StoreRegistDto store) throws URISyntaxException, ParseException {
        Map<String, Object> resultMap=new HashMap<>();
        String wallet = store.getStoreWallet();
        Optional<Store> storedWallet = storeRepository.findByStoreWallet(wallet);
        // DB에 가게가 존재하지 않으면 저장해준다
        if (!storedWallet.isPresent()){
            storeMainService.saveStore(store);
        }
        TokenDto tokenDto=storeMainService.storeLogin(store.getStoreWallet());
        System.out.println("TOKENDTO "+tokenDto);
        resultMap.put("result", SUCCESS);
        resultMap.put("jwt-auth-token", tokenDto.getTokenAccess());
        resultMap.put("jwt-refresh-token", tokenDto.getTokenRefresh());
        resultMap.put("wallet", tokenDto.getTokenWallet());
        resultMap.put("sequence", tokenDto.getTokenUserSequence());
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> storeLogin(@RequestBody Map<String,String> wallet) {
        Map<String, Object> resultMap = new HashMap<>();
        TokenDto tokenDto=storeMainService.storeLogin(wallet.get("wallet"));
        if(tokenDto==null){
            resultMap.put("result",FAIL);
            return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
        }
        else if(tokenDto.getTokenType()==2){
            resultMap.put("result", "check");
            return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
        }
        else{
            resultMap.put("result", SUCCESS);
            resultMap.put("jwtAuthToken", tokenDto.getTokenAccess());
            resultMap.put("jwtRefreshToken", tokenDto.getTokenRefresh());
            resultMap.put("wallet", tokenDto.getTokenWallet());
            resultMap.put("sequence",tokenDto.getTokenUserSequence());
            return new ResponseEntity<>(resultMap,HttpStatus.OK);
        }
    }

    // nft 발행 페이지
    @GetMapping("/{storeSequence}/mint")
    public ResponseEntity<Map<String, Object>> showMint(@PathVariable long storeSequence ){
        Store store = storeMainService.getStore(storeSequence);
        String storeName=store.getStoreName();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("storeName",storeName);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 가게 정보 출력
    @GetMapping("/my-data/{storeSequence}")
    public ResponseEntity<Map<String, Object>> ownerDetail(@PathVariable long storeSequence){
        StoreRegistDto storeRegistDto = storeMainService.getStoreInfo(storeSequence);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("store",storeRegistDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);

    }

    // 가게 정보 수정
    @PatchMapping("/my-data/{storeSequence}")
    public ResponseEntity<Map<String, Object>> ownerModify(@PathVariable long storeSequence, @RequestBody StoreDto storeDto){
        Map<String, Object> resultMap = new HashMap<>();
        System.out.println("THIS IS STOREDTO"+storeDto);
        storeMainService.userModify(storeSequence, storeDto);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }

    // QR 사용
    @PatchMapping("/qr/{storeSequence}/{type}/{nfastSequence}")
    public ResponseEntity<Map<String, Object>> useQr(@PathVariable long storeSequence, @PathVariable byte type, @PathVariable long nfastSequence){
        Map<String, Object> resultMap=new HashMap<>();
        boolean updateRes = storeMainService.updateNfast(type, nfastSequence, storeSequence);
        if (updateRes){
            resultMap.put("result", SUCCESS);
        }
        else{
            resultMap.put("result", "이미 사용된 NFasT입니다.");
        }

        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

//    // 환불 QR 사용
//    @PatchMapping("/qr/refund/{nfastSequence}")
//    public ResponseEntity<Map<String, Object>> refundQr(@PathVariable long nfastSequence){
//        Map<String, Object> resultMap=new HashMap<>();
//        boolean updateRes = storeMainService.updateNfast((byte) 2, nfastSequence);
//        if (updateRes){
//            resultMap.put("result", SUCCESS);
//        }
//        else{
//            resultMap.put("result", "환불이 불가능한 NFasT입니다.");
//        }
//
//        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
//    }
}
