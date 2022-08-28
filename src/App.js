import { Switch, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import "./styles/mainlayout.css";

function App() {
  return (
    <>
      <div className="app">
        <nav>
          <Navbar />
        </nav>

        <main>
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<HomePage />} />

                <Route exact path="/exchanges" element={<Exchanges />} />

                <Route
                  exact
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />

                <Route
                  exact
                  path="/crypto/coin/:uuid"
                  element={<CryptoDetails />}
                />

                <Route exact path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>

          <footer style={{ color: "white" }}>
            <Typography.Title level={5} className="footerHeader">
              Cryptoverse <br />
              All rights reserverd
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
