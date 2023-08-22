/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import QRcode from "../../../assets/WalletQR.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Ticket = styled.div`
  position: relative;
  background-color: whitesmoke;
  width: 320px;
  height: 140px;
  border-top: groove 20px #bcb6ff;
  display: flex;
  flex-wrap: wrap;
`;
const Info = styled.div`
  flex: 1;
  width: 190px;
  height: 130px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  & > div:not(:last-child) {
    margin: 6%;
  }
  span {
    margin-right: 20px;
  }
`;
const QR = styled.div`
  flex: 1;
  border-left: dashed 2px #bcb6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
  }
`;
const Date = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin-right: 15px;
    font-size: 12px;
  }
  span {
    font-size: 13px;
  }
`;
const Price = styled.div`
  font-size: 12px;
`;

function PublishTicket({ title }) {
  return (
    <Wrapper>
      <Ticket>
        <Info>
          <div>
            <Date>2023.01.01</Date>
            <Title>
              <h4>{title}</h4>
              <span>10:00</span>
            </Title>
            <Price>0.0042eth</Price>
          </div>
        </Info>
        <QR>
          <img src={QRcode} alt="qr" />
        </QR>
      </Ticket>
    </Wrapper>
  );
}
PublishTicket.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PublishTicket;
