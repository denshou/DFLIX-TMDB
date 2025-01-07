import YouTube from "react-youtube";
import { useModal } from "@stores/modalStore";
import { useParam } from "@stores/paramStore";
import { useNavigate } from "react-router-dom";

export default function YouTubeModal() {
  const navigate = useNavigate();
  const videoId = useParam((state) => state.videoIdParam);
  const setVideoId = useParam((state) => state.setVideoIdParam);

  const opts = {
    width: "100%",
    height: "100%",
  };

  const setYoutubeModalOpen = useModal((state) => state.setYoutubeModalOpen);

  const handleClose = () => {
    setVideoId(null);
    setYoutubeModalOpen(false);
    navigate(-1);
  };
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-[#222222]/90 flex justify-center items-center overflow-y-auto z-[300]"
      onClick={handleClose}
    >
      <div className=" w-[50%] aspect-video">
        <div className="w-full h-full ">
          <YouTube
            videoId={videoId}
            opts={opts}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
