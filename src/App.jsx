import "./App.css";
import { generateHmac } from "./utils/hmacGenerator";
import axios from "axios";

// 환경 변수 상수로 정의
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;
const DOMAIN = import.meta.env.VITE_APP_DOMAIN;
const CUPANG_URL = import.meta.env.VITE_APP_CUPANG_URL;

function App() {
  return (
    <>
      <div>안녕하세요</div>
      <button
        onClick={async () => {
          console.log("ACCESS_KEY:", ACCESS_KEY);
          console.log("SECRET_KEY:", SECRET_KEY);
          const authorization = await generateHmac(
            "GET",
            `${CUPANG_URL}/products/goldbox`,
            "a2da412d-1ccd-4800-be29-f919e5ce9575",
            "67d5758f860032e1bec6a6cf9622e7421d319561"
          );
          axios.defaults.baseURL = DOMAIN;

          try {
            const response = await axios.request({
              method: "GET",
              url: `${CUPANG_URL}/products/goldbox`,
              headers: { Authorization: authorization },
              data: {"subId": "AF4641760"},
            });
            console.log(`으아아aa아아 ${response.data}`);
          } catch (err) {
            console.log("에러 발생");
            console.error(err);
          }
        }}
      >
        쿠팡
      </button>
    </>
  );
}

export default App;
