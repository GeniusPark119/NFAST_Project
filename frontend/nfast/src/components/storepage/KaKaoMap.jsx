import React, { useEffect } from "react";

export default function KaKaoMap(props) {
  // eslint-disable-next-line react/prop-types
  const { storeLat, storeLng } = props;
  // eslint-disable-next-line no-console
  console.log(storeLat, storeLng);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=46501186d9798d27a6d3a0e837f996a6&libraries=services&autoload=false";
    document.head.appendChild(script);

    const waitForKakaoMaps = new Promise((resolve) => {
      script.onload = () => {
        resolve(window.kakao.maps);
      };
    });

    waitForKakaoMaps.then((kakaoMaps) => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakaoMaps.LatLng(storeLat, storeLng),
        level: 3,
      };
      const map = new kakaoMaps.Map(mapContainer, mapOption);

      const currentPos = new kakaoMaps.LatLng(storeLat, storeLng);

      map.panTo(currentPos);

      const marker = new kakaoMaps.Marker({
        position: currentPos,
      });

      marker.setMap(null);
      marker.setMap(map);

      return {
        latitude: storeLat,
        longitude: storeLng,
      };
    });
  }, [storeLat, storeLng]);

  return <div id="map" style={{ width: "100%", height: "350px" }} />;
}

// 위치 정보를 가져와서 지도와 마커를 생성하는 함수
export function locationLoadSuccess(pos) {
  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  };
}

export function locationLoadError() {
  // eslint-disable-next-line no-alert
  alert("위치 정보를 가져오는데 실패했습니다.");
}
