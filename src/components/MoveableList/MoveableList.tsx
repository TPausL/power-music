import { Typography } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { Playlist } from "../YoutubeProvider/YoutubeProvider";

export interface MoveableListProps {
  list: Playlist;
}
export default function MoveableList(props: MoveableListProps) {
  const { list } = props;
  return (
    <Draggable bounds="parent">
      <div
        style={{
          height: 100,
          width: 130,
          position: "absolute",
          top: Math.random() * 60 + "%",
          left:
            (list.origin === "youtube"
              ? Math.random() * 40
              : Math.random() * 40 + 40) + "%",
          boxShadow: "drop-shadow(0px 0px 8px rgba(101,163,153,.2))",
          cursor: "grab",
          borderRadius: 10,
          overflow: "hidden",
          border: `4px solid ${list.origin === "youtube" ? "red" : "#1DB954"}`,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          style={{
            opacity: 0.3,
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
          draggable={false}
          alt="a"
          src={list.picture}
        />
        <Typography variant="h6" fontWeight="bold" align="center">
          {list.name}
        </Typography>
      </div>
    </Draggable>
  );
}
