/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { QrReader } from "react-qr-reader";
import styled from "styled-components";
import Button from "@mui/material/Button";
import PublishTicket from "./PublishTicketEx";
import PublishField from "./PublishField";
import SwitchTime from "./SwitchTime";

import {
  web3,
  NFasTContract,
  saleFactory,
  // ssafyTokenContract,
  // createSaleContract,
} from "../../axios/web3";
import ipfs from "../../axios/ipfs";
import { publishAction } from "../../../redux/actions/publishAction";
import { getSequence } from "../../../storage/Cookie";
// import { getSequence } from "../../../storage/Cookie";

// styled-components 시작

const Wrapper = styled.div`
  height: 90vh;
  margin-top: 20px;
`;

const Ticket = styled(PublishTicket)`
  margin-bottom: 60px;
`;

const Publish = styled.div`
  height: 70%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h4 {
    width: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
`;
const Form = styled.form`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const DateTime = styled.div`
  display: flex;
`;

const Time = styled(DateTime)`
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Count = styled(DateTime)``;

const Price = styled(Count)`
  margin-bottom: 20px;
`;
// styled-components 끝

// jsonSubmit 함수

// jsonSubmit 함수 끝

function PublishPage() {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.mypageReducer.storeInfo);
  const sequence = useSelector((state) => state.authReducer.sequence);
  // const [flag, setFlag] = useState(false);

  useEffect(() => {
    dispatch(publishAction.storeTitle(sequence));
  }, []);

  // string을 시간객체로 변경
  function stringToDate(str) {
    const y = str.substr(0, 4);
    const m = str.substr(5, 2);
    const d = str.substr(8, 2);
    return new Date(y, m - 1, d);
  }

  // date 값을 uint으로 변경
  function dateToUint(date) {
    return Math.floor(stringToDate(date).getTime() / 1000);
  }

  // 시간을 uint로 변경
  function timeToUint(time) {
    const m = time.substr(0, 2);
    const s = time.substr(3, 2);
    return m * 60 * 60 + s * 60;
  }

  async function approve(data, saleInfo) {
    console.log(saleInfo);
    console.log("여기 sale 주소 줄게!!!");
    console.log("sale주소 : ", saleInfo[0], "토큰 ID : ", saleInfo[2]);
    console.log("sale주소 : ", saleInfo[0], "토큰 ID : ", saleInfo[2]);
    console.log("sale주소 : ", saleInfo[0], "토큰 ID : ", saleInfo[2]);
    console.log("sale주소 : ", saleInfo[0], "토큰 ID : ", saleInfo[2]);
    console.log("가져갔늬?");
    const tx = await NFasTContract.methods
      .approve("0xFF771D1615931a69fcaC581d47832A5323Aa647f", saleInfo[2])
      .send({
        from: data.walletAddress,
      });
    console.log(tx);
    console.log("승인 완료");
  }
  // 사장님 생성 후 거래 생성
  async function createAllSale(data, nfastIds) {
    console.log("start sale");
    console.log(data);
    // nfast id, 가격, 시작시간, 종료시간
    const startDate = dateToUint(data.date) - 60 * 60 * 24 * 7;
    const tx = await saleFactory.methods
      .createAllSale(
        nfastIds,
        data.price,
        startDate,
        dateToUint(data.date) + timeToUint(data.end)
      )
      .send({
        from: data.walletAddress,
        // value: web3.utils.toWei("0.01", "ether"),
      });
    // await nfastIds.forEach(async (nfastId) => {
    //   // 판매일로부터 일주일전
    //   console.log(saleFactory.methods);
    // });
    dispatch(publishAction.publishNfast(getSequence(), data));
    console.log(tx);
    console.log("여기까지 오나");

    saleFactory.events
      .NewSale({ fromBlock: tx.blockNumber }, (error, event) => {
        console.log(event);
      })
      .on("connected", (subscriptionId) => {
        console.log("subscriptionId : ", subscriptionId);
      })
      .on("data", (event) => {
        console.log(event);
        console.log("event.returnValues : ", event.returnValues);
        console.log("event.returnValues[1] : ", event.returnValues[1]);
        // data.nfastHash.push(event.returnValues[0]);
        approve(data, event.returnValues);
        // console.log(approve);
      })
      .on("changed", (event) => {
        console.log("event.returnValues : ", event.returnValues);
      })
      .on("error", (error, receipt) => {
        console.log("receipt : ", receipt);
      });
  }

  async function createNfast(data) {
    // nft 발행
    // 발행할 개수, admin 주소, tokenurl, 가게주소, 날짜, 점심저녁구분, 시작시간, 종료시간, 가격, 수수료
    const tx = await NFasTContract.methods
      .createAll(
        data.count,
        data.walletAddress,
        data.cid,
        data.walletAddress,
        dateToUint(data.date),
        data.time,
        dateToUint(data.date) + timeToUint(data.start),
        dateToUint(data.date) + timeToUint(data.end),
        data.price,
        0
      )
      .send({
        from: data.walletAddress,
        // value: web3.utils.toWei("0.1", "ether"), // Optional: set the amount of ether to send with the transaction
      });
    console.log("여기값");
    console.log(tx);
    NFasTContract.events
      .CreateAll({ fromBlock: tx.blockNumber }, (error, event) => {
        console.log(event);
      })
      .on("connected", (subscriptionId) => {
        console.log("subscriptionId : ", subscriptionId);
      })
      .on("data", (event) => {
        console.log(event);
        console.log("event.returnValues : ", event.returnValues);
        console.log("event.returnValues[1] : ", event.returnValues[1]);
        data.nfastHash.push(event.returnValues[1]);
        createAllSale(data, event.returnValues[1]);
      })
      .on("changed", (event) => {
        console.log("event.returnValues : ", event.returnValues);
      })
      .on("error", (error, receipt) => {
        console.log("receipt : ", receipt);
      });
  }

  const jsonSubmit = async (data) => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    // const ethAddress = await storehash.options.address; CA주소
    console.log(accounts[0]);
    const ipfsFile = data;
    console.log(ipfsFile);
    ipfsFile.walletAddress = await accounts[0];
    const file = {
      path: "/tmp/myfile.txt",
      content: JSON.stringify(ipfsFile),
    };
    console.log("ipfs 업로그 막기 위해 잠시 변경1", file); // ipfs 업로그 막기 위해 잠시 변경
    console.log("ipfs 업로그 막기 위해 잠시 변경2", ipfs);
    // const testc = await ipfs.add(file);
    // console.log(testc.cid.string);
    // console.log(ipfsFile.walletAddress);
    const testc = {
      cid: {
        string: "testBlank",
      },
    };
    console.log(file);
    console.log(ipfs);

    // return;
    return { cid: testc.cid.string, walletAddress: accounts[0] };
  };

  console.log("TICKET", ticket);
  const handleRegist = async (e) => {
    e.preventDefault();
    if (e.target[9].value < 0 || e.target[7].value < 0) {
      alert("가격과 수량은 0 이상으로 기재해주세요");
      return;
    }
    // eslint-disable-next-line
    console.log(e.target[2].checked);
    const data = {
      date: e.target[0].value,
      time: e.target[2].checked === false ? 0 : 1,
      start: e.target[3].value,
      end: e.target[5].value,
      count: e.target[7].value,
      price: e.target[9].value,
      cid: "",
      walletAddress: "",
      storeName: ticket.storeName,
      nfastHash: [],
      sequence,
    };

    const tempData = await jsonSubmit(data);
    data.cid = tempData.cid;
    data.walletAddress = tempData.walletAddress;
    await createNfast(data);
    // eslint-disable-next-line no-console
    console.log("DATAAAAAAA", data);
    // alert("발행이 완료되었습니다.");
    // window.location.reload();
  };

  return (
    <Wrapper>
      <Ticket title={ticket.storeName} />
      <Publish>
        <Form onSubmit={handleRegist}>
          <DateTime>
            <h4>날짜</h4>
            <PublishField content="date" variant="outlined" />
          </DateTime>
          <div>
            <h4>시간</h4>
            <SwitchTime />
          </div>
          <Time>
            <h4>시작</h4>
            <PublishField
              defaultTime="10:00"
              content="time"
              variant="outlined"
            />
          </Time>
          <Time>
            <h4>종료</h4>
            <PublishField
              defaultTime="22:00"
              content="time"
              variant="outlined"
            />
          </Time>
          <Count>
            <h4>수량</h4>
            <PublishField content="count" variant="outlined" />
          </Count>
          <Price>
            <h4>가격</h4>
            <PublishField content="price" variant="outlined" />
          </Price>
          <div>
            <Button
              sx={{ backgroundColor: "#BCB6FF" }}
              type="submit"
              variant="contained"
              disableElevation
            >
              발행하기
            </Button>
          </div>
        </Form>
      </Publish>
    </Wrapper>
  );
}
export default PublishPage;
