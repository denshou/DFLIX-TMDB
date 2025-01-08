import SlickSlide from "./slickslides/SlickSlide";

type UserLikeSectionProps = {
  title: string;
  mediaList: MovieType[] | TVType[] | null;
  type: string;
};

export default function UserLikeSection({
  title,
  mediaList,
  type,
}: UserLikeSectionProps) {
  return (
    <div className="list-container mb-10">
      <div className="flex justify-center">
        <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
          <p className="cursor-pointer">{title}</p>
        </h2>
      </div>
      <div className="flex flex-col items-center">
        {mediaList?.length ? (
          <SlickSlide movieList={mediaList} type={type} />
        ) : (
          <div className="text-[1.2vw]">{title}가 비어있습니다.</div>
        )}
      </div>
    </div>
  );
}
