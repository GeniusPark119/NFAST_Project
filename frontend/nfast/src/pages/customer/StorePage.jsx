/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StoreInfo from "../../components/storepage/StoreInfo";
import StoreReview from "../../components/storepage/StoreReview";
import StoreChart from "../../components/storepage/StoreChart";
import KaKaoMap from "../../components/storepage/KaKaoMap";
import StoreNav from "../../components/storepage/StoreNav";
import { storeAction } from "../../redux/actions/storeAction";
import FloatingBtn from "../../components/commons/FloatingBtn";
import {
  web3,
  NFasTContract,
  saleFactory,
  // ssafyTokenContract,
  // createSaleContract,
} from "../../components/axios/web3";

export default function StorePage() {
  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  const { storeSequence } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    tokenId: "",
    nfastPrice: "",
    nfastHopePrice: "",
  });

  // 구매
  async function purchase(owner, saleCA, _tokenId) {
    console.log("purchase sale");
    console.log(_tokenId);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    // const ap = await NFasTContract.methods
    //   .approve(accounts[0], _tokenId)
    //   .send({ from: "0x1CF49C51C6059385A5E6E9A45d3cd090F857c9Ad" });
    // console.log("승인 줬을텐데~ 외않되", ap);
    console.log("??? 될까?");
    const preTX = await NFasTContract.methods.getApproved(_tokenId).call();
    const tokenOwner = NFasTContract.methods.ownerOf(_tokenId).call();
    console.log("토큰 주인도 얘가 맞잖아 :", tokenOwner);
    console.log(
      "여기 좀 봐! 권한을 받았어 못 받았어?! 권한이 있는 주소가 반환 돼: ",
      preTX
    );
    console.log("??? saleCA?", saleCA);
    console.log("??? saleCA?", saleCA);
    console.log("??? saleCA?", saleCA);
    console.log("??? saleCA?", saleCA);
    // const saleContract = createSaleContract(saleCA);
    // const tx = await saleContract.methods.purchase().send({
    //   from: saleCA,
    // });
    console.log(tokenOwner);
    console.log(accounts[0]);
    let proxyOwner;
    if (accounts[0] === "0xFF771D1615931a69fcaC581d47832A5323Aa647f") {
      proxyOwner = owner;
    } else {
      proxyOwner = "0xFF771D1615931a69fcaC581d47832A5323Aa647f";
    }
    console.log(_tokenId);
    const tx = await NFasTContract.methods
      .transferFrom(proxyOwner, accounts[0], _tokenId)
      .send({
        from: accounts[0],
        // value: web3.utils.toWei("0.1", "ether"), // Optional: set the amount of ether to send with the transaction
      });
    console.log("??? 됏니?");
    console.log(tx);
  }

  // async function getSellerAddress(saleContract) {
  //   console.log(saleContract);
  //   return saleContract.methods.getSellerAddress().call();
  // }
  useEffect(() => {
    dispatch(storeAction.getStoreDetail(storeSequence));
  }, []);

  const storedetail = useSelector(
    (state) => state.storepageReducer.storedetail
  );
  const purchaseInfo = useSelector(
    (state) => state.storepageReducer.purchaseInfo
  );

  useEffect(() => {
    console.log("PURCHASE", purchaseInfo);
    const temp = purchaseInfo.map((item) => {
      return {
        nfastHash: item.nfastHash,
        nfastPrice: item.nfastPrice,
        nfastHopePrice: item.nfastHopePrice,
      };
    });
    setData(temp);
  }, [purchaseInfo]);
  console.log(data);

  useEffect(() => {
    console.log("123");
    console.log(data);
    saleFactory.getPastEvents("NewSale", { fromBlock: 0 }, (error, events) => {
      console.log(error);
      console.log("newSale 이벤트 배열 : ", events);
      console.log("data(데이타) : ", data);
      for (let i = 0; i < data.length; i += 1) {
        const saleIdx = data[i].nfastHash - 1;
        const purchaseData = events[saleIdx].returnValues;
        console.log("purchaseData : ", purchaseData);
        purchase(purchaseData[1], purchaseData[0], data[i].nfastHash);
      }
    });
    // saleFactory.events
    //   .NewSale({ fromBlock: 0 }, (err, event) => {
    //     console.log(event);
    //   })
    //   .on("connected", (subscriptionId) => {
    //     console.log("subscriptionId : ", subscriptionId);
    //   })
    //   .on("data", (event) => {
    //     console.log(event);
    //     console.log("event.returnValues : ", event.returnValues);
    //     console.log("event.returnValues[1] : ", event.returnValues[1]);
    //     const purchaseData = event.returnValues;
    //     // data.nfastHash.push(event.returnValues[1]);
    //     purchase(purchaseData[1], purchaseData[0], purchaseData[2]);
    //     console.log(purchase);
    //   })
    //   .on("changed", (event) => {
    //     console.log("event.returnValues : ", event.returnValues);
    //   })
    //   .on("error", (error, receipt) => {
    //     console.log("receipt : ", receipt);
    //   });
  }, [data]);
  // console.log(address);
  // for (let i = 0; i < data.length; i += 1) {
  //   const eigenValue = data[i].nfastHash; // nfastHah - 1 이 sale arr의 index
  //   const saleIdx = eigenValue - 1;
  //   console.log("판매 희망 토큰 아이디", eigenValue);
  //   console.log(event[saleIdx]);
  //   const saleInfo = event[saleIdx].returnValues;
  //   console.log(saleInfo);
  //   console.log(event[saleIdx].returnValues[0]);
  //   // eslint-disable-next-line no-underscore-dangle
  //   const saleCA = event[saleIdx].returnValues[0];
  //   const saleContract = createSaleContract(saleCA);
  //   console.log("외않되:", saleContract);
  //   const SA = saleContract.methods.getsellerAddress().call();
  //   console.log(SA);
  //   purchase(saleCA, SA, eigenValue);
  // }
  // }
  // );

  console.log("STORE DETAIL", storedetail);
  return (
    storedetail && (
      <div>
        <Wrapper>
          <StoreInfo
            storeImage={storedetail.store.storeImage}
            storeName={storedetail.store.storeName}
            storeCategory={storedetail.store.storeCategory}
            storeDetail={storedetail.store.storeDetail}
            storeLunchStart={storedetail.store.storeLunchStart}
            storeLunchEnd={storedetail.store.storeLunchEnd}
            storeDinnerStart={storedetail.store.storeDinnerStart}
            storeDinnerEnd={storedetail.store.storeDinnerEnd}
            storePhone={storedetail.store.storePhone}
            storeInformation={storedetail.store.storeInformation}
          />
          <Divider />
          <Review review={storedetail.review} />
          <Divider />
          <Graph>
            <Chart
              PriceMax={storedetail.storeNfastPriceMax}
              PriceMin={storedetail.storeNfastPriceMin}
            />
          </Graph>
          <Divider />
          <h4>
            <NavigationOutlinedIcon style={{ fontSize: 20 }} />
            상세 주소
          </h4>
          <MapWrapper>
            <Map>
              <KaKaoMap
                storeLat={storedetail.store.storeLat}
                storeLng={storedetail.store.storeLng}
              />
            </Map>
            <h5>
              <LocationOnIcon style={{ color: "orange" }} />
              {storedetail.store.storeAddress}
            </h5>
          </MapWrapper>
          <Divider />
          <Footer>
            <StoreNav />
          </Footer>
        </Wrapper>
        <FloatingBtn>Floating</FloatingBtn>
      </div>
    )
  );
}
const Wrapper = styled.div`
  margin: 0;
  height: 100vh;

  h4,
  h5 {
    margin-left: 3%;
    display: flex;
    align-items: center;
  }
`;
const Divider = styled.div`
  border-top: 1px solid #bcb6ff;
  width: 100%;
  margin-top: 20px;
`;

const Review = styled(StoreReview)`
  width: 100%;
`;
const Graph = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
`;

const Chart = styled(StoreChart)`
  width: 100%;
  // height: 100%;
`;

const MapWrapper = styled.div`
  width: 100%;
  // height: 300px;
  display: flex;
  flex-direction: column;

  margin-bottom: 70px;
`;

const Map = styled.div`
  width: 100%;
  // height: 100%;
  z-index: 0; /* Set z-index to 0 */
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1; /* Set z-index to 1 */
`;
