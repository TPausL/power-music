import { useContext } from "react";
import { YoutubeContext, YoutubeContextType } from "./YoutubeProvider";

function useYoutube() {
  return useContext<YoutubeContextType>(YoutubeContext);
}

export default useYoutube;
