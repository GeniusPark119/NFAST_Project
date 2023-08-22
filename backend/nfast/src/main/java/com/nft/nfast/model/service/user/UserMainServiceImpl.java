package com.nft.nfast.model.service.user;

import com.nft.nfast.controller.JWTUtil;
import com.nft.nfast.entity.business.Nfast;
import com.nft.nfast.entity.business.Review;
import com.nft.nfast.entity.business.Store;
import com.nft.nfast.entity.user.Bookmark;
import com.nft.nfast.entity.user.Token;
import com.nft.nfast.entity.user.TradeList;
import com.nft.nfast.entity.user.User;
import com.nft.nfast.exception.Store.NFastNotExistException;
import com.nft.nfast.model.dto.business.*;
import com.nft.nfast.model.dto.user.*;
import com.nft.nfast.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserMainServiceImpl implements UserMainService {

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    NfastRepository nfastRepository;

    @Autowired
    IncomeListRepository incomeListRepository;

    @Autowired
    TradeListRepository tradeListRepository;

    @Autowired
    BookmarkRepository bookmarkRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    JWTUtil jwtUtil;

    @Override
    public List<StoreFindDto> findAllStore() {
        List<Store> stores = storeRepository.findAllStore();
        List<StoreFindDto> storeDtoList = new ArrayList<>();

        for (Store store : stores) {
            StoreFindDto dto = store.toFindDto();
            storeDtoList.add(dto);
        }
        return storeDtoList;
    }

    // 이용 가능한 nfast(미사용)
    @Override
    public List<NfastGetDto> findAvailableNfast(long userSequence) {
        List<Nfast> nfasts=nfastRepository.findUnUsedByUserSequence(userSequence);
//        List<Nfast> nfasts = nfastRepository.findAllByUserSequence(userSequence);
        List<NfastGetDto> nfastGetDtoList = new ArrayList<>();
        if (nfasts==null || nfasts.isEmpty()){
            System.out.println("비었어요웅");
        }
        else{
            for (Nfast nfast : nfasts) {
                NfastGetDto dto = nfast.toGetDto();
                nfastGetDtoList.add(dto);
            }
        }



        return nfastGetDtoList;
    }

    //구매 가능한 NFast 리스트 출력
    @Override
    public List<NfastPurchaseDto> findPurchaseNfast(long storeSequence) {
        List<NfastPurchase> nfasts = nfastRepository.findAllByStoreSequenceOrderByNfastDateDesc(storeSequence);
        List<NfastPurchaseDto> nfastPurchaseDtoList = new ArrayList<>();

        for (NfastPurchase nfast : nfasts) {
            nfastPurchaseDtoList.add(NfastPurchaseDto.builder()
                    .nfastDate(nfast.getNfastDate().toString())
                    .nfastPrice(nfast.getPrice())
                    .amount(nfast.getAmount())
                    .nfastMealType(nfast.getNfastMealType())
                    .build());
        }
        return nfastPurchaseDtoList;
    }

    //구매할 날짜 상세 정보 출력
    @Override
    public List<NfastPurchaseDto> findAllByNfastDate(long storeSequence, NfastDetailDto nfastDto) {
        SimpleDateFormat tranSimpleFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
        String nfastDate = tranSimpleFormat.format(nfastDto.getNfastDate());
        List<NfastPurchase> nfasts = nfastRepository.findAllByNfastDate(storeSequence, nfastDate, nfastDto.getNfastMealType());
        List<NfastPurchaseDto> nfastPurchaseDtoList = new ArrayList<>();
        for (NfastPurchase nfast : nfasts) {
            System.out.println("##########희망가 "+nfast.getHopePrice());
            nfastPurchaseDtoList.add(NfastPurchaseDto.builder()
                    .nfastDate(nfast.getNfastDate().toString())
//                    .nfastPrice(nfast.getPrice())
                    .nfastHopePrice(nfast.getHopePrice())
                    .amount(nfast.getAmount())
                    .nfastMealType(nfast.getNfastMealType())
                    .build());
        }
        return nfastPurchaseDtoList;
    }

    //구매할 금액 nft 개수 입력 후 구매 확정
    @Override
    public List<NfastDto> savePurchaseNfast(long storeSequence, long userSequence, NfastPurchaseDto nfastPurchaseDto) {
        String nfastDate = nfastPurchaseDto.getNfastDate().toString();
//        BigDecimal nfastHopePrice=nfastPurchaseDto.getNfastHopePrice();

        int amount = nfastPurchaseDto.getAmount();
        Byte nfastMealType = nfastPurchaseDto.getNfastMealType();
        List<NfastDto> nfastDtoList = new ArrayList<>();
        List<Nfast> nfasts = nfastRepository.findTopAmountNfastByParam(storeSequence, nfastDate, nfastMealType, amount);
        //1. 사장님이 판매하고 있는 nft 판단(nfast_price와 nfast_default_price 비교)

        for (Nfast nfast : nfasts) {
            long nfastSequence=nfast.getNfastSequence();
            nfast=nfastRepository.findAllByNfastSequence(nfastSequence);
            BigDecimal nfastPrice = nfast.getNfastPrice();
            System.out.println("PRICE "+nfast.getNfastPrice());
            System.out.println("HOPEPRICE "+nfast.getNfastHopePrice());
            if (nfast.getNfastSaleState() == 0) {
                //2-1. 사장님 -> income_list에 추가
                incomeListRepository.save(
                        IncomeListDto.builder()
                                .incomeListPrice(nfast.getNfastHopePrice())
                                .incomeListDate(new Date())
                                .incomeListType((byte) 0)   //직접 구매
                                .storeSequence(storeSequence)
                                .incomeListTransaction("TRANSACTION")
                                .build()
                                .toEntity()
                );
                tradeListRepository.save(
                        TradeListDto.builder()
                                .tradeListPrice(nfast.getNfastHopePrice())
                                .tradeListDate(new Date())
                                .tradeListType((byte) 0)    //구매
                                .userSequence(userSequence)
                                .storeSequence(storeSequence)
                                .tradeListTransaction("TRANSACTION")
                                .build()
                                .toEntity()
                );
                //3. price 만큼 지갑에서 차감(metamask)

            }
            //리셀
            else if (nfast.getNfastSaleState() == 2) {
                //2-2. 사용자 -> trade_list에 추가
                System.out.println("inputtttttttt");
                tradeListRepository.save(
                        TradeListDto.builder()
                                .tradeListPrice(nfast.getNfastHopePrice())
                                .tradeListDate(new Date())
                                .tradeListType((byte) 0)    //구매
                                .userSequence(userSequence)
                                .storeSequence(storeSequence)
                                .tradeListTransaction("RESELL_BUY")
                                .build()
                                .toEntity()
                );
                // 판매자 지갑에 돌아가는것 = (판매희망가 - 구매가)*0.8
                BigDecimal number1 = new BigDecimal("0.8");
                BigDecimal sellBenefit=nfast.getNfastHopePrice().subtract(nfastPrice).multiply(number1);
                tradeListRepository.save(
                        TradeListDto.builder()
                                .tradeListPrice(sellBenefit)
                                .tradeListDate(new Date())
                                .tradeListType((byte) 1)    //판매
                                .storeSequence(storeSequence)
                                .userSequence(nfast.getUserSequence())
                                .tradeListTransaction("RESELL_SELL")
                                .build()
                                .toEntity()
                );
                // 사장님 지갑에 들어가는 것 = (판매가 - 구매가)*0.2
                BigDecimal number2 = new BigDecimal("0.2");
                BigDecimal storeBenefit = nfast.getNfastHopePrice().subtract(nfastPrice).multiply(number2);
                incomeListRepository.save(
                        IncomeListDto.builder()
                                .incomeListPrice(storeBenefit)
                                .incomeListDate(new Date())
                                .incomeListType((byte) 1)   //리셀
                                .storeSequence(storeSequence)
                                .incomeListTransaction("RESELL")
                                .build()
                                .toEntity()
                );
                //3. price 만큼 지갑에서 차감(metamask)

            }
            //4. nfast의 nfast_sale_state 1로 변경, 거래횟수 +1, 판매희망가->금액
            nfast.setNfastSaleState((byte) 1);
            nfast.setNfastTransactionCount(nfast.getNfastTransactionCount() + 1);
            nfast.setNfastPrice(nfast.getNfastHopePrice());
            nfast.setUserSequence(userSequence);
            nfastRepository.save(nfast);
            nfastDtoList.add(nfast.toDto());

            //가게 거래횟수+1
            Optional<Store> storeWrapper = storeRepository.findById(storeSequence);
            if(storeWrapper.isPresent()){
                Store store = storeWrapper.get();
                store.setStoreCount(store.getStoreCount()+1);
                storeRepository.save(store);
            }
        }

        return nfastDtoList;
    }

    //거래 내역 리스트
    @Override
    public List<TradeFindDto> findAllTrade(long userSequence) throws ParseException {
        SimpleDateFormat tranSimpleFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
        List<TradeList> tradeLists = tradeListRepository.findAllByUserSequence(userSequence);
        System.out.println("USERSEQUENCE "+ userSequence);
        List<TradeFindDto> tradeDtoList = new ArrayList<>();

        for (TradeList tradeList : tradeLists) {
            Optional<Store> storeWrapper =  storeRepository.findById(tradeList.getStoreSequence());
            if(storeWrapper.isPresent()){
                Store store = storeWrapper.get();
                TradeFindDto dto = tradeList.toFindDto();
                dto.setStoreName(store.getStoreName());
                tradeDtoList.add(dto);
            }
        }
        return tradeDtoList;
    }

    //판매 등록
    @Override
    @Transactional
    public NfastDto saveTradeNfast(NfastTradeDoneDto nfastTradeDoneDto) {
        long nfastSequence = nfastTradeDoneDto.getNfastSequence();
        BigDecimal nfastHopePrice = nfastTradeDoneDto.getNfastHopePrice();
        Optional<Nfast> nfastWrapper = nfastRepository.findById(nfastSequence);
        NfastDto dto = null;
        if (nfastWrapper.isPresent()) {
            Nfast nfast = nfastWrapper.get();
            dto = nfast.toDto();
            dto.setNfastHopePrice(nfastHopePrice);
            dto.setNfastSaleState((byte) 2);
            nfastRepository.save(dto.toEntity());
        }
        return dto;
    }

    //북마크 등록
    @Override
    public void saveBookmark(long storeSeqeuence, long userSequence) {
        Optional<Bookmark> bookmarkWrapper = bookmarkRepository.findByStoreSequenceAndUserSequence(storeSeqeuence, userSequence);

        if (!bookmarkWrapper.isPresent()) {
            BookmarkDto dto = BookmarkDto.builder().storeSequence(storeSeqeuence).userSequence(userSequence).build();
            bookmarkRepository.save(dto.toEntity());
        }
    }

    //북마크 해제
    @Override
    public void deleteBookmark(long storeSeqeuence, long userSequence) {
        Optional<Bookmark> bookmarkWrapper = bookmarkRepository.findByStoreSequenceAndUserSequence(storeSeqeuence, userSequence);

        if (bookmarkWrapper.isPresent()) {
            Bookmark bookmark = bookmarkWrapper.get();
            BookmarkDto dto = bookmark.toDto();
            bookmarkRepository.deleteById(dto.getBookmarkSequence());
        }
    }

    // 북마크 조회
    @Override
    public Byte isMyBookmark(long storeSequence, long userSequence) {
        Optional<Bookmark> bookmarkWrapper=bookmarkRepository.findByStoreSequenceAndUserSequence(storeSequence, userSequence);
        if (bookmarkWrapper.isPresent()){
            return 0;
        }
        return 1;
    }

    //가게명 검색(상세 정보 출력)
    @Override
    public StoreDetailDto findStoreDetail(long storeSequence) {
        String[][] contents = {{"바로 들어갔어요", "10분 이내로 들어갔어요", "20분 이내로 들어갔어요"}, {"주차하기 편해요", "좌석이 편안해요", "교통이 편리해요"}, {"친절해요", "응대가 빨라요", "매장이 청결해요"}, {"뷰가 좋아요", "인테리어가 잘 나와요", "사진이 잘 나와요"}};
        Optional<Store> storeWrapper = storeRepository.findById(storeSequence);
        List<ReviewFind> reviewList = reviewRepository.findByStoreSequence(storeSequence);
        ReviewFindDto reviewFindDto = new ReviewFindDto();

        List<Object> nfastMaxList = nfastRepository.findMaxNfastPriceGroupByNfastDate(storeSequence);
        List<Object> nfastMinList = nfastRepository.findMinNfastPriceGroupByNfastDate(storeSequence);

        StoreDetailDto storeDetailDto = new StoreDetailDto();
        if (storeWrapper.isPresent()) {
            Store store = storeWrapper.get();
            for (ReviewFind review : reviewList) {
                String[] str = new String[2];
                str[0] = contents[review.getReviewTopic()][review.getReviewSubTopic()];
                str[1] = review.getCnt().toString();
                if (review.getReviewTopic() == 0) {
                    reviewFindDto.setReviewTime(str);
                }
                if (review.getReviewTopic() == 1) {
                    reviewFindDto.setReviewConvenience(str);
                }
                if (review.getReviewTopic() == 2) {
                    reviewFindDto.setReviewService(str);
                }
                if (review.getReviewTopic() == 3) {
                    reviewFindDto.setReviewMood(str);
                }
            }
            storeDetailDto = StoreDetailDto.builder().store(store.toDto()).review(reviewFindDto).storeNfastPriceMax(nfastMaxList).storeNfastPriceMin(nfastMinList).build();
        }
        return storeDetailDto;
    }

    //판매 차익 계산 - 구매가만 넘기는 것으로 수정 (230327)
    @Override
    public BigDecimal findNfastPrice(long nfastSequence) {
        Optional<Nfast> nfastWrapper = nfastRepository.findById(nfastSequence);
        BigDecimal nfastPrice = null;
        if (nfastWrapper.isPresent()) {
            Nfast nfast = nfastWrapper.get();
            nfastPrice=nfast.getNfastPrice();
//            nfastPrice = nfast.getNfastHopePrice().subtract(nfast.getNfastPrice());
        }
        return nfastPrice;
    }

    //리뷰 작성
    @Override
    public void saveReview(ReviewGetDto reviewGetDto) {
        ReviewFindDto reviewFindDto = reviewGetDto.getReviews();
        Nfast nfast=nfastRepository.findAllByNfastSequence(reviewGetDto.getNfastSequence());
        reviewRepository.save(ReviewDto.builder()
                .reviewTopic(0)
                .reviewSubTopic(Integer.parseInt(reviewFindDto.getReviewTime()[0]))
                .storeSequence(nfast.getStoreSequence().getStoreSequence())
                .userSequence(reviewGetDto.getUserSequence())
                .build()
                .toEntity()
        );
        reviewRepository.save(ReviewDto.builder()
                .reviewTopic(1)
                .reviewSubTopic(Integer.parseInt(reviewFindDto.getReviewConvenience()[0]))
                .storeSequence(nfast.getStoreSequence().getStoreSequence())
                .userSequence(reviewGetDto.getUserSequence())
                .build()
                .toEntity()
        );
        reviewRepository.save(ReviewDto.builder()
                .reviewTopic(2)
                .reviewSubTopic(Integer.parseInt(reviewFindDto.getReviewService()[0]))
                .storeSequence(nfast.getStoreSequence().getStoreSequence())
                .userSequence(reviewGetDto.getUserSequence())
                .build()
                .toEntity()
        );
        reviewRepository.save(ReviewDto.builder()
                .reviewTopic(3)
                .reviewSubTopic(Integer.parseInt(reviewFindDto.getReviewMood()[0]))
                .storeSequence(nfast.getStoreSequence().getStoreSequence())
                .userSequence(reviewGetDto.getUserSequence())
                .build()
                .toEntity()
        );
    }

    //NFT 사용 완료 확인
    @Override
    public Byte findNfastUseState(long userSequence, long nfastSequence) {
        Optional<Nfast> nfastWrapper = nfastRepository.findByUserSequenceAndNfastSequence(userSequence,nfastSequence);
        Byte nfastUseState = null;
        if(nfastWrapper.isPresent()){
            Nfast nfast = nfastWrapper.get();
            nfastUseState=nfast.getNfastUseState();
        }
        return nfastUseState;
    }

    //북마크 리스트
    @Override
    public List<StoreDto> findAllBookmarkStore(long userSequence) {
        List<Bookmark> bookmarkList = bookmarkRepository.findAllByUserSequence(userSequence);
        List<Store> storeList = new ArrayList<>();
        for(Bookmark bookmark:bookmarkList){
            Optional<Store> storeWrapper = storeRepository.findById(bookmark.getStoreSequence());
            if(storeWrapper.isPresent()){
                storeList.add(storeWrapper.get());
            }
        }
        List<StoreDto> storeDtoList = new ArrayList<>();
        for(Store store:storeList){
            StoreDto storeDto = store.toDto();
            storeDtoList.add(storeDto);
        }
        return storeDtoList;
    }

    //사용한 NFasT 리스트
    @Override
    public List<NfastUsedDto> findUnAvailableNfast(long userSequence) {
        String[][] contents = {{"바로 들어갔어요", "10분 이내로 들어갔어요", "20분 이내로 들어갔어요"}, {"주차하기 편해요", "좌석이 편안해요", "교통이 편리해요"}, {"친절해요", "응대가 빨라요", "매장이 청결해요"}, {"뷰가 좋아요", "인테리어가 잘 나와요", "사진이 잘 나와요"}};
        List<NfastUsedDto> nfastUsedDtoList = new ArrayList<>();
        List<Review> reviewList = new ArrayList<>();
        List<Nfast> nfastList = nfastRepository.findAllNfastByUserSequenceAndNfastUseState(userSequence);
        NfastUsedDto nfastUsedDto = new NfastUsedDto();

        for(Nfast nfast: nfastList){
            NfastGetDto nfastGetDto = new NfastGetDto();
            ReviewFindDto reviewFindDto = new ReviewFindDto();

            long storeSequence=nfast.getStoreSequence().getStoreSequence();
            nfastGetDto = NfastGetDto.builder()
                    .nfastSequence(nfast.getNfastSequence())
                    .nfastPrice(nfast.getNfastPrice())
                    .nfastEigenvalue(nfast.getNfastEigenvalue())
                    .nfastDate(nfast.getNfastDate())
                    .nfastQr(nfast.getNfastQr())
                    .storeName(nfast.getStoreSequence().getStoreName())
                    .build();

            reviewList = reviewRepository.findAllByUserSequenceAndStoreSequence(userSequence, storeSequence);
            for (Review review : reviewList) {
                String[] str = new String[1];
                str[0] = contents[review.getReviewTopic()][review.getReviewSubTopic()];
                if (review.getReviewTopic() == 0) {
                    reviewFindDto.setReviewTime(str);
                }
                if (review.getReviewTopic() == 1) {
                    reviewFindDto.setReviewConvenience(str);
                }
                if (review.getReviewTopic() == 2) {
                    reviewFindDto.setReviewService(str);
                }
                if (review.getReviewTopic() == 3) {
                    reviewFindDto.setReviewMood(str);
                }
            }
            nfastUsedDto = NfastUsedDto.builder().nfast(nfastGetDto).review(reviewFindDto).build();
            nfastUsedDtoList.add(nfastUsedDto);
        }
        return nfastUsedDtoList;
    }

    //거래순 추천 리스트
    @Override
    public List<StoreDto> findAllTransactionRecommendation() {
        List<StoreDto> storeDtoList = new ArrayList<>();
        List<Store> storeList = storeRepository.findAll(Sort.by(Sort.Direction.DESC,"storeCount"));
        for(Store store:storeList){
            StoreDto storeDto = store.toDto();
            storeDtoList.add(storeDto);
        }
        return storeDtoList;
    }

    //거리순 추천 리스트
    @Override
    public List<StoreDto> findAllDistanceRecommendation(String lat, String lng) {
        List<StoreDto> storeDtoList = new ArrayList<>();
        List<Store> storeList = storeRepository.findAll();
        Map<Double, Store> stores = new TreeMap<>();
        System.out.println(lat+" "+lng);
        for(Store store: storeList){
            double distance = getDistance(Double.parseDouble(lat),Double.parseDouble(lng),Double.parseDouble(store.getStoreLat()),Double.parseDouble(store.getStoreLng()));
            stores.put(distance,store);
        }
        for(double key: stores.keySet()){
            storeDtoList.add(stores.get(key).toDto());
        }
        return storeDtoList;
    }

    //로그인
    @Override
    @Transactional
    public TokenDto userLogin(String wallet) {
        Optional<User> userWrapper = userRepository.findByUserWallet(wallet);
        Optional<Store> storeWrapper = storeRepository.findByStoreWallet(wallet);
        TokenDto tokenDto = null;

        if(storeWrapper.isPresent()){
            return tokenDto;
        }
        else {
            //회원 정보가 있으면 로그인
            if (userWrapper.isPresent()) {
                User user = userWrapper.get();
                String authToken = jwtUtil.createAuthToken(user.getUserSequence());
                String refreshToken = jwtUtil.createRefreshToken();
                Optional<Token> tokenWrapper = tokenRepository.findByTokenWallet(wallet);
                if (tokenWrapper.isPresent()) {
                    Token token = tokenWrapper.get();
                    tokenDto = token.toDto();
                    tokenDto.setTokenAccess(authToken);
                    tokenDto.setTokenRefresh(refreshToken);
                    tokenRepository.save(tokenDto.toEntity());
                }
            } else {
                //회원가입 and 로그인
                UserDto userDto = new UserDto();

                userDto.setUserWallet(wallet);
                userDto.setUserNickname("unNamed");
                userRepository.save(userDto.toEntity());
                userWrapper = userRepository.findByUserWallet(wallet);
                if (userWrapper.isPresent()) {
                    User user = userWrapper.get();
                    String authToken = jwtUtil.createAuthToken(user.getUserSequence());
                    String refreshToken = jwtUtil.createRefreshToken();
                    tokenDto = TokenDto.builder()
                            .tokenAccess(authToken)
                            .tokenRefresh(refreshToken)
                            .tokenUserSequence(user.getUserSequence())
                            .tokenType((byte) 0)
                            .tokenWallet(wallet)
                            .build();
                    tokenRepository.save(tokenDto.toEntity());
                }
            }
            return tokenDto;
        }
    }

    //로그아웃
    public void logout(String wallet){
        Optional<Token> tokenWrapper = tokenRepository.findByTokenWallet(wallet);
        TokenDto tokenDto = null;
        if(tokenWrapper.isPresent()){
            Token token = tokenWrapper.get();
            tokenDto = token.toDto();
            tokenDto.setTokenAccess(null);
            tokenDto.setTokenRefresh(null);
            tokenRepository.save(tokenDto.toEntity());
        }
    }


    // 플로팅 지갑
    @Override
    public NfastGetDto findNowAvailableNfast(long userSequence) {
        Optional<Nfast> nfastWrapper = nfastRepository.findOneByUser(userSequence);
        NfastGetDto nfastGetDto = null;
        if (!nfastWrapper.isPresent()){
            throw new NFastNotExistException();
        }

        Nfast nfast = nfastWrapper.get();
        Store store = storeRepository.findByStoreSequence(nfast.getStoreSequence().getStoreSequence());
        String storeName = store.getStoreName();
        nfastGetDto = NfastGetDto.builder()
                .nfastSequence(nfast.getNfastSequence())
                .nfastDate(nfast.getNfastDate())
                .nfastStartTime(nfast.getNfastStartTime())
                .nfastEndTime(nfast.getNfastEndTime())
                .nfastMealType(nfast.getNfastMealType())
                .nfastPrice(nfast.getNfastPrice())
                .nfastQr(nfast.getNfastQr())
                .nfastRefundQr(nfast.getNfastRefundQr())
                .storeName(storeName)
                .build();

        return nfastGetDto;
    }

    //내 정보 출력
    @Override
    public UserDto userDetail(long userSequence) {
        Optional<User> userWrapper = userRepository.findById(userSequence);
        UserDto userDto = null;
        if(userWrapper.isPresent()){
            User user=userWrapper.get();
            userDto = user.toDto();
        }
        return userDto;
    }

    @Override
    public void userModify(UserDto userDto) {
        System.out.println("USERDTO "+ userDto);
        userRepository.save(userDto.toEntity());
    }

    @Override
    public Nfast findStoreSequence(long nfastSequence) {
        Nfast nfast = nfastRepository.findAllByNfastSequence(nfastSequence);
        return nfast;
    }

    //거리 계산
    private static double getDistance(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1.609344;   //km 계산
        return (dist);
    }

    // decimal degrees to radians 변환 공식
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }
    // radians to decimal degrees 변환 공식
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
