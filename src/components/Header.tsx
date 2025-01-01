import { Link, useNavigate } from "react-router-dom";
import Search from "../assets/search.svg";
import { useEffect, useRef, useState } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { useSearch } from "../stores/searchStore";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const handleLoginButton = () => {
    navigate("/signin");
  };
  const handleLogoutButton = () => {
    const response = window.confirm("로그아웃 하시겠습니까?");
    if (user && response) {
      // 로그아웃
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("로그아웃 성공");
          setUser(null);
        })
        .catch((error) => {
          console.error("로그아웃 실패", error);
        });
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

  //검색 버튼
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleSearchButton = () => {
    setFocused(true);
    //렌더링이 완료된 다음에 focus를 설정
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputBlur = () => {
    if (inputRef.current?.value) return;
    setFocused(false);
  };

  return (
    <div className="flex justify-center items-center h-[70px]">
      <div className="flex justify-between  items-center w-[90%]">
        <Link to={"/"}>
          <h1 className="font-bebas text-[44px]">DFLIX</h1>
        </Link>

        <div className="flex gap-5 items-center">
          {focused ? (
            <div className="relative border rounded-md p-1">
              <img src={Search} className="absolute w-[30px]" alt="" />
              <input
                type="text"
                className="bg-[#141414] h-[30px] pl-[40px] outline-none"
                placeholder="제목, 사람"
                value={searchWord}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSearchButton}
              className="w-[30px]"
            >
              <img src={Search} alt="" />
            </button>
          )}

          {user ? (
            <div className="flex items-center relative group">
              <div className="w-11 rounded-full overflow-hidden">
                <img src={user.photoURL || ""} alt="" />
              </div>
              <p className="ml-2">{user.displayName} 님</p>
              <i
                className="fa-solid fa-caret-down ml-2"
                style={{ color: "#ffffff" }}
              ></i>

              <div className="absolute top-[44px] w-full h-[6px]"></div>

              <div className="absolute top-[50px] w-full bg-[black] z-[10] border rounded-md cursor-pointer group-hover:block hidden group-focus-within::block">
                <ul className="w-full divide-y">
                  <li className="text-center py-1">설정</li>
                  <li className="text-center py-1" onClick={handleLogoutButton}>
                    로그아웃
                  </li>
                </ul>
              </div>
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
