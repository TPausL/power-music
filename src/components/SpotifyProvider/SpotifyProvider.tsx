import React, { useState } from "react";
import { Playlist, User } from "../YoutubeProvider/YoutubeProvider";
import ClientOAuth2 from "client-oauth2";

const data = require("../../spotify.json");

export interface SpotifyProviderProps {
  children: React.ReactNode;
}
export interface SpotifyContextType {
  login: () => void;
  user: User | undefined;
  playlists: Playlist[] | undefined;
}
export const SpotifyContext = React.createContext<SpotifyContextType>({
  login: () => undefined,
  user: undefined,
  playlists: undefined,
});

export default function SpotifyProvider(props: SpotifyProviderProps) {
  const { children } = props;
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [playlists, setPlaylists] = React.useState<Playlist[] | undefined>(
    undefined
  );
  const login = async () => {
    new ClientOAuth2({
      clientId: data.client_id,
      accessTokenUri: "https://accounts.spotify.com/api/token",
      authorizationUri: "https://accounts.spotify.com/authorize",
      redirectUri: "http://localhost:3000/auth/spotify",
    });
  };
  const getAuthUser = async () => {};
  const getPlaylists = async () => {};
  return (
    <SpotifyContext.Provider value={{ login, playlists, user }}>
      {children}
    </SpotifyContext.Provider>
  );
}
