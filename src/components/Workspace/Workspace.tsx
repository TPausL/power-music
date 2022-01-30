import React from "react";
import MoveableList from "../MoveableList";
import useYoutube from "../YoutubeProvider/useYoutube";
import { Playlist } from "../YoutubeProvider/YoutubeProvider";

export interface WorkspaceProps {}
export default function Workspace(props: WorkspaceProps) {
  const { playlists: ytLists } = useYoutube();
  console.log(ytLists);
  return (
    <div
      style={{
        backgroundColor: "rgba(255,0,0,0.3)",
        height: "60%",
        width: "90%",
        position: "relative",
      }}
    >
      {ytLists?.map((l) => {
        return <MoveableList list={l} />;
      })}
    </div>
  );
}
