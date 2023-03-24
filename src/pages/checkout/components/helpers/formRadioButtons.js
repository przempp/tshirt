import React from "react";
import {Form} from "react-bootstrap";
export function FormRadioButtons({
  setSelectedCrypto,
  selectedCrypto
}) {
  return <><Form.Check type={'radio'} id={`radio-btc`} label={`Bitcoin`} onChange={() => setSelectedCrypto('bitcoin')} checked={selectedCrypto === "bitcoin"} />
            <Form.Check type={'radio'} id={`default-eth`} label={`Ethereum`} onChange={() => setSelectedCrypto('ethereum')} checked={selectedCrypto === "ethereum"} />
            <Form.Check type={'radio'} id={`default-xmr`} label={`Monero`} onChange={() => setSelectedCrypto('monero')} checked={selectedCrypto === "monero"} />
            <Form.Check type={'radio'} id={`default-ltc`} label={`Litecoin`} onChange={() => setSelectedCrypto('litecoin')} checked={selectedCrypto === "litecoin"} /></>;
}
  