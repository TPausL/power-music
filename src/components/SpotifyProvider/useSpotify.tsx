import { useContext } from "react";
import { SpotifyContext, SpotifyContextType } from "./SpotifyProvider";

function useSpotify() {
  return useContext<SpotifyContextType>(SpotifyContext);
}

export default useSpotify;
