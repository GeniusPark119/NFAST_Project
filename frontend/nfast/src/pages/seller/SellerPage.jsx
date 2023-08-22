import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SellerMain from "../../components/sellerpage/SellerMain";

const PublishNft = styled.div`
  width: 100%;
  background-color: white;
`;
function SellerPage() {
  const sequence = useSelector((state) => state.authReducer.sequence);
  return (
    sequence && (
      <PublishNft>
        <SellerMain sequence={sequence} />
      </PublishNft>
    )
  );
}

export default SellerPage;
