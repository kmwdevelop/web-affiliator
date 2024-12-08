import axios from "axios";
import { getCookie } from "./authUtils";
import { setupInterceptors } from "./interceptors";

class Axios {
  static instance = null;
  static BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 기본 URL을 상수로 설정
  static CONTENT_TYPE_JSON = "application/json";
  static CONTENT_TYPE_MULTIPART = "multipart/form-data";
  static setLoading = null;
  static setLogin = null;

  constructor() {} // 인스턴스 생성 방지

  static setLoadingFunction(setLoading) {
    if (!this.setLoading) {
      this.setLoading = setLoading;
    }
  }

  static setLoginFunction(setLogin) {
    if (!this.setLogin) {
      this.setLogin = setLogin;
    }
  }

  static getInstance() {
    if (!this.instance) {
      console.log(this.BASE_URL);
      this.instance = axios.create({
        baseURL: this.BASE_URL,
        headers: { "Content-Type": this.CONTENT_TYPE_JSON },
        withCredentials: true,
      });

      setupInterceptors(this.instance, this.setLoading, this.setLogin);
    }
    return this.instance;
  }

  static getHeaders(withToken, additionalHeaders) {
    const headers = {
      "Content-Type": this.CONTENT_TYPE_JSON,
    };
    if (withToken) {
      const token = getCookie("accessToken");
      if (token) headers.AccessToken = token;
    }

    // 추가적인 헤더들을 덮어씌우기
    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders);
    }

    return headers;
  }

  /**
   * GET 요청
   * @param url
   * @param withToken
   * @param additionalHeaders
   * @returns Promise
   */
  static async get(url, withToken = false, additionalHeaders) {
    const config = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .get(url, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청
   * @param url
   * @param data
   * @param withToken
   * @param additionalHeaders
   * @returns Promise
   */
  static async post(url, data, withToken = false, additionalHeaders) {
    const config = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .post(url, data, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @param additionalHeaders
   * @returns Promise
   */
  static async postMultipart(url, formData, additionalHeaders) {
    const config = {
      headers: {
        ...this.getHeaders(true, additionalHeaders),
        "Content-Type": this.CONTENT_TYPE_MULTIPART,
      },
    };
    return this.getInstance().post(url, formData, config);
  }

  /**
   * PUT 요청
   * @param url
   * @param data
   * @param withToken
   * @param additionalHeaders
   * @returns Promise
   */
  static async put(url, data, withToken = false, additionalHeaders) {
    const config = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .put(url, data, config)
      .then((response) => response.data);
  }

  /**
   * PUT 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @param additionalHeaders
   * @returns Promise
   */
  static async putMultipart(url, formData, additionalHeaders) {
    const config = {
      headers: {
        ...this.getHeaders(true, additionalHeaders),
        "Content-Type": this.CONTENT_TYPE_MULTIPART,
      },
    };
    return this.getInstance().put(url, formData, config);
  }

  /**
   * DELETE 요청
   * @param url
   * @param withToken
   * @param additionalHeaders
   * @returns Promise
   */
  static async delete(url, withToken = false, additionalHeaders) {
    const config = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .delete(url, config)
      .then((response) => response.data);
  }
}

export default Axios;
