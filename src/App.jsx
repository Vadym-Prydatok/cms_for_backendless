import { NavLink, Outlet } from "react-router-dom";
import { Route, Routes, useNavigate, } from "react-router-dom";
import Tab from "./components/Tab";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadingData = async () => {
    try {
      const request = await axios.get("tabs.json");

      setData(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  data.sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (data.length > 0) {
      const initialPath = `/${data[0].id}`;
      navigate(initialPath);
    }
  }, [data]);

  return (
    <div>
      <header>
        <nav>
          <ul>
            {data.map((tab) => (
              <li key={tab.id}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`/${tab.id}`}
                >
                  {tab.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Outlet />}>
            {data.map((tab) => (
              <Route
                key={tab.id}
                path={`/${tab.id}`}
                element={
                  <React.Suspense
                    fallback={
                      <div className="loader">
                        <span className="loader-text">loading</span>
                        <span className="load"></span>
                      </div>
                    }
                  >
                    <Tab
                      title={tab.title}
                      content={React.lazy(() => import(`./${tab.path}`))}
                    />
                  </React.Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
