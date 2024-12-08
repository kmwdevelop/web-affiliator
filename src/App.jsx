import "./App.css";
import { generateHmac } from "./utils/hmacGenerator";
import axios from "axios";

// 환경 변수 상수로 정의
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;
// const DOMAIN = import.meta.env.VITE_APP_DOMAIN;
const CUPANG_URL = import.meta.env.VITE_APP_CUPANG_URL;

function App() {
  return (
    <>
      <div>안녕하세요</div>
      <button
        onClick={async () => {
          console.log("ACCESS_KEY:", ACCESS_KEY);
          console.log("SECRET_KEY:", SECRET_KEY);
          const authorization = generateHmac(
            "GET",
            `${CUPANG_URL}/products/goldbox`,
            SECRET_KEY,
            ACCESS_KEY
          );
          axios.defaults.baseURL = "";

          try {
            const response = await axios.request({
              method: "GET",
              url: `${CUPANG_URL}/products/goldbox`,
              headers: { Authorization: authorization },
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
