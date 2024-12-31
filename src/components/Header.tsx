import { Link, useNavigate } from "react-router-dom";
import Search from "../assets/search.svg";
import { useEffect, useState } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { useSearch } from "../stores/searchStore";

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
      setUser(user); // 사용자 정보 업데이트
    });

    return () => unsubscribe();
  }, []);

  //검색 기능

  const searchWord = useSearch((state) => state.searchWord);
  const setSearchWord = useSearch((state) => state.setSearchWord);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    if (searchWord === "") navigate("/");
    else navigate(`/search?q=${searchWord}`);
  }, [searchWord]);

  return (
    <div className="flex justify-center items-center h-[70px]">
      <div className="flex justify-between  items-center w-[90%]">
        <Link to={"/"}>
          <h1 className="font-bebas text-[44px]">DFLIX</h1>
        </Link>

        <div className="flex gap-5 items-center">
          <button type="button" className="w-[30px]">
            <img src={Search} alt="" />
          </button>
          <div className="relative">
            <img src={Search} className="absolute w-[30px]" alt="" />
            <input
              type="text"
              className="bg-[#141414] h-[30px] pl-[40px]"
              placeholder="제목, 사람"
              value={searchWord}
              onChange={handleInputChange}
            />
          </div>
          {user ? (
            <div className="flex items-center" onClick={handleLoginButton}>
              <div className="w-11 rounded-full overflow-hidden">
                <img src={user.photoURL || ""} alt="" />
              </div>
              <i
                className="fa-solid fa-caret-down ml-2"
                style={{ color: "#ffffff" }}
              ></i>
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
