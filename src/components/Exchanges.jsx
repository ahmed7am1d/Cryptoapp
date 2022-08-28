import React from "react";
import {
  useGetCryptoExchangesQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi";
import { Row, Col, Typography, Collapse, Avatar } from "antd";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Loader } from "./Loader";
const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = function () {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const bitCoinRequest = useGetCryptoDetailsQuery("Qwsogvtv82FCd");
  if (isFetching) return <Loader/>;
  const bitCoinDescription = bitCoinRequest?.data?.data?.coin?.description;
  const exchanges = data?.data?.exchanges;
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Rank</Col>
      </Row>
      {exchanges.map((exchange, index) => (
        <Col span={24}>
          <Collapse>
            <Panel
              key={exchange.uuid}
              showArrow={false}
              header={
                <Row key={exchange.uuid}>
                  <Col span={6}>
                    <Text>
                      <strong>{exchange.rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                    <Text>
                      <strong>{exchange.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                  <Col span={6}>{millify(exchange.rank)}%</Col>
                </Row>
              }
            >
              {HTMLReactParser(bitCoinDescription)}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </>
  );
};

export default Exchanges;
