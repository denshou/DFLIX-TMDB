export default function SignIn() {
  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
      <div className="w-[20%] min-w-[158px] flex flex-col justify-center items-center">
        <p className="mb-10">SNS 로그인</p>
        <div className="w-full">
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=7aaa3cd36557e8fd96c25af4b1bf38f2&redirect_uri=http://localhost:5173/auth/kakao/callback&response_type=code`}
            className="border rounded-lg w-full h-[50px] flex justify-center items-center text-center"
            >
              카카오로 시작하기
            </a>
        </div>
      </div>
    </div>
  );
}
