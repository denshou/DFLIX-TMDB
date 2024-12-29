import { Link } from "react-router-dom";
import Search from "../assets/search.svg";

export default function Header() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between  items-center w-[90%]">
        <Link to={"/"}>
          <h1 className="font-bebas text-[44px]">DFLIX</h1>
        </Link>

        <div className="flex gap-5">
          <button type="button" className="w-[30px]">
            <img src={Search} alt="" />
          </button>
          <button type="button" className="border p-2 rounded-md">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
