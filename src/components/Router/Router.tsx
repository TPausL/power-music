import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Home from "../Home";
import Settings from "../Settings";
import useSpotify from "../SpotifyProvider/useSpotify";

export interface RouterProps {}
export default function Router(props: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="auth/spotify" element={<Spotify />} />
    </Routes>
  );
}

function Spotify() {
  let [searchParams, setSearchParams] = useSearchParams();
  const spt = useSpotify();
  React.useEffect(() => {
    spt.onCode(searchParams.get("code") as string);
  }, []);

  return <Navigate to={"/home"} />;
}
