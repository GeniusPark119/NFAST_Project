package com.nft.nfast.controller.user;

import com.amazonaws.Response;
import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.model.dto.business.*;
import com.nft.nfast.model.dto.user.TokenDto;
import com.nft.nfast.model.dto.user.TradeFindDto;
import com.nft.nfast.model.dto.user.UserDto;
import com.nft.nfast.model.service.S3FileUploadService;
import com.nft.nfast.model.service.user.UserMainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserMainRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserMainService userMainService;

    @Autowired
    private S3FileUploadService s3FileUploadService;

    //검색 시 가게 리스트 출력
    @GetMapping("/main/search-list/")
    public ResponseEntity<Map<String, Object>> storeList(){
        List<StoreFindDto> storeDtoList = userMainService.findAllStore();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("stores",storeDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //가게명 검색
    @GetMapping("/main/search-list/store/{storeSequence}")
    public ResponseEntity<Map<String, Object>> storeSearch(@PathVariable("storeSequence") long storeSequence){
        StoreDetailDto storeDetailDto = userMainService.findStoreDetail(storeSequence);
        System.out.println("StoreDetail "+storeDetailDto);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("detail",storeDetailDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //사용 가능 NFasT 리스트
    @GetMapping("/available-NFasT/{userSequence}")
    public ResponseEntity<Map<String, Object>> nftList(@PathVariable long userSequence){
        List<NfastGetDto> nfastGetDtoList = userMainService.findAvailableNfast(userSequence);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts",nfastGetDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // storeSequence 조회
    @GetMapping("/findStoreSequence/{nfastSequence}")
    public ResponseEntity<Map<String, Object>> nftStore(@PathVariable long nfastSequence){
        Nfast nfast=userMainService.findStoreSequence(nfastSequence);
        long storeSequence=nfast.getStoreSequence().getStoreSequence();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("storeSequence",storeSequence);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }


    //거래 내역 리스트
    @GetMapping("/transaction-list/{userSequence}")
    public ResponseEntity<Map<String,Object>> tradeList(@PathVariable("userSequence") long userSequence) throws ParseException {
        List<TradeFindDto> tradeFindDtoList = userMainService.findAllTrade(userSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts",tradeFindDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }


    //리뷰 작성
    @PostMapping("/review-count/{nfastSequence}")
    public ResponseEntity<Map<String,Object>> reviewList(@PathVariable("nfastSequence") long nfastSequence, @RequestBody ReviewGetDto reviewGetDto){
        userMainService.saveReview(reviewGetDto);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //NFT 사용 완료 확인
    @GetMapping("/floating-button/confirmation/{userSequence}/{nfastSequence}")
    public ResponseEntity<Map<String,Object>> nftState(@PathVariable("userSequence") long userSequence, @PathVariable("nfastSequence") long nfastSequence){
        Byte nfastUseState = userMainService.findNfastUseState(userSequence,nfastSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfastUseState",nfastUseState);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //북마크 리스트
    @GetMapping("/bookmark-list/{userSequence}")
    public ResponseEntity<Map<String,Object>> bookmarkList(@PathVariable("userSequence") long userSequence){
        List<StoreDto> storeDtoList = userMainService.findAllBookmarkStore(userSequence);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("stores",storeDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //사용한 NFasT 리스트
    @GetMapping("/unavailable-NFasT/{userSequence}")
    public ResponseEntity<Map<String, Object>> usedNftList(@PathVariable("userSequence") long userSequence){
        List<NfastUsedDto> nfastUsedDtoList = userMainService.findUnAvailableNfast(userSequence);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("nfasts",nfastUsedDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //거래순 추천 리스트
    @GetMapping("/main/transaction-recommendation-list")
    public ResponseEntity<Map<String, Object>> transactionRecommendationList(){
        List<StoreDto> storeDtoList = userMainService.findAllTransactionRecommendation();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("stores",storeDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //거리순 추천 리스트
    @PostMapping("/main/distance-recommendation-list")
    public ResponseEntity<Map<String, Object>> distanceRecommendationList(@RequestBody Map<String,String> location){
        String lat = location.get("lat");
        String lng = location.get("lng");
        List<StoreDto> storeDtoList = userMainService.findAllDistanceRecommendation(lat,lng);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("stores",storeDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> userLogin(@RequestBody Map<String,String> wallet) {
        Map<String, Object> resultMap = new HashMap<>();
        TokenDto tokenDto=userMainService.userLogin(wallet.get("wallet"));
        if(tokenDto!=null) {
            System.out.println("TOKEN TYTTTTTT " + tokenDto.getTokenType());
            resultMap.put("result", SUCCESS);
            resultMap.put("jwtAuthToken", tokenDto.getTokenAccess());
            resultMap.put("jwtRefreshToken", tokenDto.getTokenRefresh());
            resultMap.put("wallet", tokenDto.getTokenWallet());
            resultMap.put("sequence", tokenDto.getTokenUserSequence());
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }
        else{
            resultMap.put("result", FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
        }
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(@RequestBody Map<String,String> wallet) {
        Map<String, Object> resultMap = new HashMap<>();
        userMainService.logout(wallet.get("wallet"));
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }

    //내 정보 출력
    @GetMapping("/my-data/{userSequence}")
    public ResponseEntity<Map<String, Object>> userDetail(@PathVariable("userSequence") long userSequence) {
        Map<String, Object> resultMap = new HashMap<>();
        UserDto userDto = userMainService.userDetail(userSequence);
        resultMap.put("result", SUCCESS);
        resultMap.put("user",userDto);
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }

//    //내 정보 수정
//    @PatchMapping("/my-data/{userSequence}")
//    public ResponseEntity<Map<String, Object>> userModify(@PathVariable("userSequence") long userSequence, @RequestBody UserDto user) {
//        Map<String, Object> resultMap = new HashMap<>();
//        System.out.println("USER "+ user);
//        userMainService.userModify(user);
//        resultMap.put("result", SUCCESS);
//        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
//    }
    //내 정보 수정
    @PatchMapping("/my-data/{userSequence}")
    public ResponseEntity<Map<String, Object>> userModify(@RequestPart(value="user") UserDto user, @RequestPart(value = "userImage",required = false) MultipartFile multipartFile) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();
        if(multipartFile != null){
            user.setUserImage(s3FileUploadService.upload(multipartFile));
        }
        userMainService.userModify(user);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }

    //플로팅 버튼
    @GetMapping("floating-button/{userSequence}")
    public ResponseEntity<Map<String, Object>> floating(@PathVariable long userSequence){
        Map<String, Object> resultMap=new HashMap<>();
        NfastGetDto availabeNow = userMainService.findNowAvailableNfast(userSequence);
        resultMap.put("result",SUCCESS);
        resultMap.put("nfast", availabeNow);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);

    }
}
