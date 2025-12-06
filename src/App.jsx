import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import NoticeBoard from "./pages/NoticeBoard";
import CreateNotice from "./pages/CreateNotice";
import { dbInit } from "./utils/db";


export default function App() {
  const [route, setRoute] = useState("board");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    dbInit();
  }, []);

  return (
    <div className="app-root">
      <Sidebar active="notice" onNavigate={() => setRoute("board")} />

      <div className="main">
        <Topbar />

        <div className="container">
          {route === "board" && (
            <NoticeBoard
              onCreate={() => setRoute("create")}
              refreshKey={refreshKey}
            />
          )}

          {route === "create" && (
            <CreateNotice
              onPublished={() => {
                setRefreshKey((k) => k + 1);
                setRoute("board");
              }}
              onCancel={() => setRoute("board")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
