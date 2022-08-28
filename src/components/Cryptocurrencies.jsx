import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from "./Loader";

const Cryptocurrencies = function ({ simplified }) {
  const count = simplified ? 10 : 100;
  //we named the recived data as cryptosList
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  // onchange of the value searchTerm do append new coins
  //for second parameter => the function will get executed whenever cryptosList or searchTerm changes
  //useEffect happens as the start of the application
  //render when there is changes in the dependeices
  useEffect(() => {
    //remeber filter function resore array of element that matches the conditions only
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader/>;
  return (
    <>
      {/* Search for specic crypto */}
      {/* We want to show the search bar only in  the cryptocurrencies page */}
      {/* if it is not simplified(not homepage) then render it */}
      {!simplified && (
        <div className="search-crypto">
          <input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* gutters spaces between the items 32 top and bottom 32 left and right */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
         
          // xs => for small device the col will take the whole screen
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            {/* eniter card will be link when clicked on it show details and we will send id */}
            <Link to={`/crypto/coin/${currency.uuid}`}>
              {/* extra we can provide the image */}
              <Card
                title={`${currency.rank} . ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                {/* data inside the paragraph */}
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
                {/* <p>Coin Id: {currency.uuid} </p> */}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
