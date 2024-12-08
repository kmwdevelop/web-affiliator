import "./App.css";
// import { useState } from "react";
import { generateHmac } from "./utils/hmacGenerator";
import axios from "axios";

const REQUEST_METHOD = "POST";
const DOMAIN = "https://api-gateway.coupang.com";
const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

// Replace with your own ACCESS_KEY and SECRET_KEY
const ACCESS_KEY = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const SECRET_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const REQUEST = {
  coupangUrls: [
    "https://www.coupang.com/np/search?component=&q=good&channel=user",
    "https://www.coupang.com/np/coupangglobal",
  ],
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>안녕하세요</div>
      <button
        onClick={async () => {
          const authorization = generateHmac(
            REQUEST_METHOD,
            URL,
            SECRET_KEY,
            ACCESS_KEY
          );
          axios.defaults.baseURL = DOMAIN;

          try {
            const response = await axios.request({
              method: REQUEST_METHOD,
              url: URL,
              headers: { Authorization: authorization },
              data: REQUEST,
            });
            console.log(response.data);
          } catch (err) {
            console.error(err.response.data);
          }
        }}
      >
        쿠팡
      </button>
    </>
  );
}

export default App;
