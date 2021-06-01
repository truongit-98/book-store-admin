import consts, {API_VERSION, BASE_URL} from "../consts";
import React from "react";
import utils from "../common/utils";

export default class BaseRequest {
  version = "/v1/api";


  prefix () {
    return '';
  }

  async get(url, params = {}) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, {  headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token },params });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async getWithTimeout(url, params = {}, timeout) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, { headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token }, params, timeout });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }
  async postWithTimeout(url, params = {}, timeout) {
    try {
      const response = await window.axios.post(`${this.version}/${url}`, {headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token }, params, timeout });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }
  async put (url, data = {}) {
    try {
      const response = await window.axios.put(`${this.version}/${url}`, data,  {  headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token }});
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}) {
    try {
      debugger
      const response = await window.axios.post(`${this.version}/${url}`, data, {  headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token }});
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async del(url, params = {}) {
    try {
      const response = await window.axios.delete(`${this.version}/${url}`,{headers:{token:  JSON.parse(localStorage.getItem("session"))?.access_token }}, params);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler (response) {
    const {data} = response;
    let errorCode = window._.get(data, 'error.code', 200);
    
    if (errorCode >= 400) {
      let message = data.error.message;
      let errorsNode = undefined;

      if (typeof(message) === 'string') {
        errorsNode = <div style={{ fontWeight: 'bold', color: 'red' }}>
          {utils.upperCaseFirst(message)}
        </div>
      } else {
        errorsNode = window._.map(data.error.message, (message, field) => <div style={{ fontWeight: 'bold', color: 'red' }} id={field}>
          {utils.upperCaseFirst(`${field} ${message}`)}
        </div>)
      }

      utils.showNotification(<span style={{ color: 'red', fontWeight: 'bold' }}>Error</span>, errorsNode, consts.TYPE_ERROR);
      throw 'Request failed';
    } else if (errorCode === 401) {
      window.h.push("/")
  
      throw 'UnAuthorization';
    }

    return data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
      window.location.href = '/';
    }
    throw err;
  }

  getFile(url) {
    window.location.href = `${BASE_URL}/${API_VERSION}/${url}`;
  }
}
