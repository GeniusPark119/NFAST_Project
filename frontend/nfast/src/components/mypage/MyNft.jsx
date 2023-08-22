import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import { getSequence } from "../../storage/Cookie";
import { mypageAction } from "../../redux/actions/mypageAction";
import PastTicket from "../commons/PastTicket";
import FutureTicket from "../commons/FutureTicket";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Ticket1 = styled(FutureTicket)`
  flex: 1;
`;

const Ticket2 = styled(PastTicket)`
  flex: 1;
`;

const TabsContainer = styled.div`
  flex-shrink: 0;
`;

const Tickets = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Pag = styled.div`
  margin: 3%;
  display: flex; /* 가로 정렬을 위해 flexbox 설정 */
  justify-content: center; /* 가운데 정렬 */
`;
const Review = styled.div`
  flex: 1;
  border-left: dashed 2px #bcb6ff;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const EachReview = styled.div`
  flex: 0.5;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: rgba(230, 229, 255, 1);
  // border-radius: 30%;
  width: 80%;
  height: 15%;
  margin-top: 2%;
  margin-bottom: 2%;
  font-size: 10pt;
`;
function MyNft() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const dispatch = useDispatch();
  const sequence = getSequence();

  const resellNfast = useSelector(
    (state) => state.storepageReducer.resellNfast
  );
  const availableNfasts = useSelector(
    (state) => state.mypageReducer.availableNfasts
  );

  useEffect(() => {
    dispatch(mypageAction.getAvailableNfasts(sequence));
    dispatch(mypageAction.getUnAvailableNfasts(sequence));
  }, []);
  useEffect(() => {
    dispatch(mypageAction.getAvailableNfasts(sequence));
  }, [resellNfast]);
  console.log(availableNfasts);

  const unavailableNfasts = useSelector(
    (state) => state.mypageReducer.unavailableNfasts
  );

  const [currentAvailablePage, setCurrentAvailablePage] = useState(1);
  const [currentUnavailablePage, setCurrentUnavailablePage] = useState(1);

  const handleAvailablePageChange = (event, page) => {
    setCurrentAvailablePage(page);
  };

  const handleUnavailablePageChange = (event, page) => {
    setCurrentUnavailablePage(page);
  };

  const availableCardsPerPage = 4;
  const getAvailableCardList = () => {
    const startIndex = (currentAvailablePage - 1) * availableCardsPerPage;
    const endIndex = startIndex + availableCardsPerPage;

    return availableNfasts.slice(startIndex, endIndex);
  };

  const unavailableCardsPerPage = 4;
  const getUnavailableCardList = () => {
    const startIndex = (currentUnavailablePage - 1) * unavailableCardsPerPage;
    const endIndex = startIndex + unavailableCardsPerPage;

    return unavailableNfasts.slice(startIndex, endIndex);
  };

  console.log("사용한 NFT를 보여주마", unavailableNfasts);
  return (
    <Wrapper>
      <TabsContainer>
        <Tabs
          value={selectedTabIndex}
          onChange={(event, newValue) => setSelectedTabIndex(newValue)}
          centered
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="미사용 NFT" />
          <Tab label="사용한 NFT" />
        </Tabs>
      </TabsContainer>
      {selectedTabIndex === 0 &&
        (availableNfasts.length !== 0 ? (
          getAvailableCardList().map((nfast) => {
            return nfast.nfastSaleState === 1 ? (
              <Tickets>
                <Ticket1
                  storeName={nfast.storeName}
                  nfastDate={nfast.nfastDate}
                  nfastStartTime={nfast.nfastStartTime}
                  nfastEndTime={nfast.nfastEndTime}
                  nfastPrice={nfast.nfastPrice}
                  nfastSequence={nfast.nfastSequence}
                  nfastMealType={nfast.nfastMealType}
                  nfastQr={
                    <QRCode
                      value={JSON.stringify({
                        nfastSequence: nfast.nfastSequence,
                        type: 1,
                      })}
                      size="100"
                      style={{ fgColor: "#000123" }}
                    />
                  }
                />
              </Tickets>
            ) : (
              <Tickets>
                <Ticket1
                  storeName={nfast.storeName}
                  nfastDate={nfast.nfastDate}
                  nfastStartTime={nfast.nfastStartTime}
                  nfastEndTime={nfast.nfastEndTime}
                  nfastPrice={nfast.nfastPrice}
                  nfastSequence={nfast.nfastSequence}
                  nfastMealType={nfast.nfastMealType}
                />
              </Tickets>
            );
          })
        ) : (
          <div
            style={{
              textAlign: "center",
              margin: "20%",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <span>사용 예정된 NFasT가 없습니다.</span>
          </div>
        ))}
      {selectedTabIndex === 1 &&
        (unavailableNfasts.length !== 0 ? (
          getUnavailableCardList().map((nfast) => {
            return (
              <Tickets>
                <Ticket2
                  storeName={nfast.nfast.storeName}
                  nfastDate={nfast.nfast.nfastDate}
                  nfastStartTime={nfast.nfast.nfastStartTime}
                  nfastEndTime={nfast.nfast.nfastEndTime}
                  nfastPrice={nfast.nfast.nfastPrice}
                  nfastSequence={nfast.nfast.nfastSequence}
                  // 리뷰 만드러야됨.
                  nfastReview={
                    <Review>
                      <div>내 리뷰</div>
                      <EachReview>{nfast.review.reviewTime}</EachReview>
                      <EachReview>{nfast.review.reviewMood}</EachReview>
                      <EachReview>{nfast.review.reviewService}</EachReview>
                      <EachReview>{nfast.review.reviewConvenience}</EachReview>
                    </Review>
                  }
                />
              </Tickets>
            );
          })
        ) : (
          <div
            style={{
              textAlign: "center",
              margin: "20%",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <span>사용 완료한 NFasT가 없습니다.</span>
          </div>
        ))}
      {selectedTabIndex === 0 && (
        <Pag>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(availableNfasts.length / availableCardsPerPage)}
              variant="outlined"
              color="secondary"
              page={currentAvailablePage}
              onChange={handleAvailablePageChange}
            />
          </Stack>
        </Pag>
      )}
      {selectedTabIndex === 1 && (
        <Pag>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(
                unavailableNfasts.length / unavailableCardsPerPage
              )}
              variant="outlined"
              color="secondary"
              page={currentUnavailablePage}
              onChange={handleUnavailablePageChange}
            />
          </Stack>
        </Pag>
      )}
    </Wrapper>
  );
}

export default MyNft;
