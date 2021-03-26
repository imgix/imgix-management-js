class APIError extends Error {
  constructor(message, data, status) {
    super(message);
    this.name = 'APIError';
    let response = null;
    let isObject = false;

    try {
      response = JSON.parse(data);
      this.isObject = true;
    } catch (e) {
      response = data;
    }

    this.response = response;
    this.message = message;
    this.status = status;
  }

  toString = () => {
    return `\n${this.message}\nResponse:\n${
      this.isObject ?  this.response : JSON.stringify(this.response, null, 2)
    }`;
  }
}

module.exports = APIError;
