import { Link, useNavigate } from "react-router-dom";
import Search from "../assets/search.svg";
import { useEffect, useState } from "react";
import { getAuth, signOut, User } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const handleLoginButton = () => {
    if (user) {
      // 로그아웃 처리
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("로그아웃 성공");
          setUser(null); // 로그아웃 후 사용자 상태 초기화
        })
        .catch((error) => {
          console.error("로그아웃 실패", error);
        });
    } else {
      // 로그인 페이지로 이동
      navigate("/signin");
    }
  };

  useEffect(() => {
    const auth = getAuth(); // Firebase 인증 객체
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user); // 사용자 정보 업데이트
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center h-[70px]">
      <div className="flex justify-between  items-center w-[90%]">
        <Link to={"/"}>
          <h1 className="font-bebas text-[44px]">DFLIX</h1>
        </Link>

        <div className="flex gap-5">
          <button type="button" className="w-[30px]">
            <img src={Search} alt="" />
          </button>
          {user ? (
            <div className="flex items-center" onClick={handleLoginButton}>
              <div className="w-11 rounded-full overflow-hidden">
                <img src={user.photoURL || ""} alt="" />
              </div>
              <i className="fa-solid fa-caret-down ml-2" style={{color: "#ffffff"}}></i>
              {/* <p className="ml-2">{user.displayName} 님</p> */}
            </div>
          ) : (
            <button
              type="button"
              className="border p-2 rounded-md"
              onClick={handleLoginButton}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
