import React from "react";
import MoveableList from "../MoveableList";
import useSpotify from "../SpotifyProvider/useSpotify";
import useYoutube from "../YoutubeProvider/useYoutube";
import { Playlist } from "../YoutubeProvider/YoutubeProvider";

export interface WorkspaceProps {}
export default function Workspace(props: WorkspaceProps) {
  const { playlists: ytLists } = useYoutube();
  const { playlists: sptLists } = useSpotify();
  console.log(ytLists);
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        height: "60%",
        width: "90%",
        position: "relative",
      }}
    >
      {ytLists?.map((l) => {
        return <MoveableList list={l} />;
      })}
      {sptLists?.map((l) => {
        return <MoveableList list={l} />;
      })}
    </div>
  );
}
