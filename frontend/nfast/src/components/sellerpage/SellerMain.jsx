/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PublishPage from "./publishpage/PublishPage";
import SellerIncome from "./incomepage/SellerIncome";
import SellerMaked from "./makedpage/SellerMaked";
import SellerMypage from "./mypage/SellerMypage";
import { mypageAction } from "../../redux/actions/mypageAction";
import FloatingBtnSeller from "../commons/FloatingBtnSeller";
// import FloatingSample from "../commons/FloatingSample";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Header = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 0;
  background-color: white;
`;

const Profit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const HeaderTab = styled(Tab)`
  width: 25%;
`;
const Floating = styled(FloatingBtnSeller)``;
export default function SellerMain(props) {
  const { sequence } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("SEQUENCE", sequence);
    dispatch(mypageAction.getStoreInfo(sequence));
    dispatch(mypageAction.getMintIncome(sequence));
    dispatch(mypageAction.getResellIncome(sequence));
  }, []);

  const mintIncome = useSelector((state) => state.mypageReducer.mintIncome);
  const resellIncome = useSelector((state) => state.mypageReducer.resellIncome);

  return (
    <Header>
      <Profit>
        월 발행 수익 : {mintIncome}eth | 월 리셀 수익 : {resellIncome}eth
      </Profit>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <HeaderTab label="발행하기" {...a11yProps(0)} />
            <HeaderTab label="현재수익" {...a11yProps(1)} />
            <HeaderTab label="발행확인" {...a11yProps(2)} />
            <HeaderTab label="정보수정" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PublishPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SellerIncome />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SellerMaked />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SellerMypage />
        </TabPanel>
      </Box>
      <div>
        {/* <Floating /> */}
        <Floating>floating</Floating>
      </div>
    </Header>
  );
}

SellerMain.defaultProps = {
  sequence: "",
};
SellerMain.propTypes = {
  sequence: PropTypes.string,
};
