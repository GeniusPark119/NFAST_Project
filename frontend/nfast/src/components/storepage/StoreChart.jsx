import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
const Wrapper = styled.div`
  h4 {
    display: flex;
    align-items: center;
  }
  @media only screen and (min-width: 320px) and (max-width: 1000px) {
    width: 100%;
  }
  @media only screen and (min-width: 0px) and (max-width: 320px) {
    width: 50%;
  }
`;

export default function StoreChart(props) {
  // eslint-disable-next-line react/prop-types
  const { PriceMax, PriceMin } = props;

  if (!PriceMax || !PriceMin) {
    return (
      <Wrapper style={{ position: "relative" }}>
        <Line data={{}} options={{}} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "18px",
            color: "rgba(0, 0, 0, 0.3)",
            textShadow: "1px 1px rgba(255, 255, 255, 0.5)",
          }}
        >
          최근 시세가 없습니다.
        </div>
      </Wrapper>
    );
  }

  const data = {
    labels: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
    datasets: [
      {
        label: "최고가",
        data: PriceMax,
        borderColor: "tomato",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "최저가",
        data: PriceMin,
        borderColor: "darkblue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: false,
            text: "요일",
          },
        },
        y: {
          title: {
            display: false,
            text: "값(Eth)",
          },
          min: 0,
          max: 10,
        },
      },
    },
  };

  return (
    <Wrapper>
      <h4>
        <AttachMoneyOutlinedIcon />
        지난주 시세
      </h4>
      <Line data={data} options={data.options} />
    </Wrapper>
  );
}
