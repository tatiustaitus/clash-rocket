import React, { useEffect, useState } from "react";

import { animated, useTransition } from "react-spring";
import { listen } from "@tauri-apps/api/event";

import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";

import "./styles/tailwind.css";

type PageProps = {
  children: JSX.Element;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return <div>{children}</div>;
};

type PageWrapperProps = {
  children: JSX.Element;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const transitions = useTransition(children, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    exitBeforeEnter: true,
    config: { duration: 100 },
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div style={style}>
          <Page>{item}</Page>
        </animated.div>
      ))}
    </>
  );
};

type AppView = "Dashboard" | "Home" | "Settings";
const appViews: AppView[] = ["Home", "Dashboard", "Settings"];

function App(): JSX.Element {
  useEffect(() => {
    const unlisten = async () =>
      await listen("scheme-request-received", async (event) => {
        // Handle the params from here, for instance storing the tokens
      });
    return () => {
      unlisten();
    };
  }, []);

  const [activeView, setActiveView] = useState<AppView>("Home");

  const views: Record<AppView, JSX.Element> = {
    Home: <Home />,
    Dashboard: <Dashboard />,
    Settings: <Settings />,
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar
        views={appViews}
        activeView={activeView}
        onViewChange={(newView: string) => setActiveView(newView as AppView)}
      />
      <div className="flex-1 h-screen overflow-y-auto ">
        <PageWrapper>{views[activeView]}</PageWrapper>
      </div>
    </div>
  );
}

export { App };
