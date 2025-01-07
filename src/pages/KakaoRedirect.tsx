// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   signInWithCredential,
//   OAuthProvider,
//   setPersistence,
//   browserSessionPersistence,
// } from "firebase/auth";
// import { authService } from "../services/firebase";




// export default function KakaoRedirect() {
//   const navigate = useNavigate();
//   const code = new URL(document.URL).searchParams.get("code");

//   useEffect(() => {
//     if (!window.Kakao.isInitialized()) {
//       window.Kakao.init(`{import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}`);
//     }
//   }, []);

//   useEffect(() => {
//     if (code) {
//       const getKakaoAuthToken = async () => {
//         try {
//           const payload = {
//             grant_type: "authorization_code",
//             client_id: "7aaa3cd36557e8fd96c25af4b1bf38f2", // 카카오 REST API 키
//             redirect_uri: `${import.meta.env.VITE_PUBLIC_URL}/auth/kakao/callback`, // 리디렉트 URI
//             code, // 전달받은 인가 코드
//             client_secret: "C4LL27KheNmNB9fBo7T6EdvSgm40fsko", // 카카오 Client Secret
//           };

//           const response = await axios.post(
//             "https://kauth.kakao.com/oauth/token",
//             new URLSearchParams(payload),
//             {
//               headers: {
//                 "Content-Type":
//                   "application/x-www-form-urlencoded;charset=utf-8",
//               },
//             }
//           );
//           const { id_token, access_token } = response.data;

//           await getKakaoUserInfo(access_token);

//           // Firebase 인증 처리
//           firebaseSignIn(id_token);
//         } catch (error) {
//           console.error("카카오 토큰 요청 실패", error);
//           if (axios.isAxiosError(error)) {
//             console.error("응답 데이터:", error.response?.data);
//           }
//         }
//       };

//       getKakaoAuthToken();
//     }
//   }, [code]);

//   const firebaseSignIn = (idToken: string) => {
//     const provider = new OAuthProvider("oidc.kakao");
//     const credential = provider.credential({ idToken });

//     setPersistence(authService, browserSessionPersistence)
//       .then(() => {
//         return signInWithCredential(authService, credential); // Firebase 인증 처리
//       })
//       .then((result) => {
//         console.log("Firebase 로그인 성공", result);
//         navigate("/"); // 로그인 후 메인 페이지로 이동
//       })
//       .catch((error) => {
//         console.error("Firebase 로그인 실패", error);
//       });
//   };

//   //사용자 프로필이미지, 이름 가져오기
//   const getKakaoUserInfo = async (accessToken: string) => {
//     try {
//       await axios.get("https://kapi.kakao.com/v2/user/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Bearer 토큰 방식으로 인증
//         },
//       });
//     } catch (error) {
//       console.error("카카오 사용자 정보 요청 실패", error);
//       if (axios.isAxiosError(error)) {
//         console.error("응답 데이터:", error.response?.data);
//       }
//     }
//   };

//   return <div>로그인 처리 중...</div>;
// }
