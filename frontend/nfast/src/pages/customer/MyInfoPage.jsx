import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyInfo from "../../components/mypage/MyInfo";
import { getSequence } from "../../storage/Cookie";
import { mypageAction } from "../../redux/actions/mypageAction";
import FloatingBtn from "../../components/commons/FloatingBtn";

function MyInfoPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mypageAction.getUserInfo(getSequence()));
  }, []);
  const userInfo = useSelector((state) => state.mypageReducer.userInfo);
  return (
    <div>
      <MyInfo
        userWallet={userInfo.userWallet}
        userNickname={userInfo.userNickname}
        userSequence={userInfo.userSequence}
        userImage={userInfo.userImage}
      />
      <FloatingBtn>Floating</FloatingBtn>
    </div>
  );
}

export default MyInfoPage;
