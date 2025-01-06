// import { doc, setDoc } from "firebase/firestore";
// import { authService, db } from "./firebase";
import { axiosInstance } from "../apis";

// TMDB Request Token 생성
export const getTMDBRequestToken = async (): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.get(`/authentication/token/new`);

    if (response.data.success) {
      const requestToken: string = response.data.request_token;
      const authenticationUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173`;

      // 사용자 인증을 위해 TMDB 인증 페이지로 리디렉션
      window.location.href = authenticationUrl;

      localStorage.setItem("requestToken", requestToken);

      return requestToken;
    }
  } catch (error) {
    console.error("TMDB Request Token 요청 실패:", error);
  }
};

//중복 요청 방지
let isInProgress = false;
// TMDB 세션 ID 생성
export const createTMDBSession = async (
  requestToken: string
): Promise<string | undefined> => {
  if (isInProgress) return;
  try {
    isInProgress = true;
    const response = await axiosInstance.post(`/authentication/session/new`, {
      request_token: requestToken,
    });

    if (response.data.success) {
      const sessionId: string = response.data.session_id;

      //   // Firebase에서 현재 로그인된 사용자 정보 가져오기
      //   const user = authService.currentUser;
      //   if (user) {
      //     const userRef = doc(db, "users", user.uid);
      //     await setDoc(userRef, { tmdbSessionId: sessionId }, { merge: true });
      //     console.log("TMDB 세션 ID가 Firestore에 저장되었습니다.");
      //   }

      return sessionId;
    }
  } catch (error) {
    console.error("TMDB 세션 ID 생성 실패:", error);
  }finally {
    isInProgress = false;
  }
};
