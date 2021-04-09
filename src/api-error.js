class APIError extends Error {
  constructor(message, data, status) {
    super(message);
    this.name = 'APIError';
    let response = null;

    try {
      response = JSON.parse(data);
    } catch (e) {
      response = data;
    }

    this.response = response;
    this.message = message;
    this.status = status;
  }

  toString() {
    return `${this.message}
Response:
${JSON.stringify(this.response, null, 2)}`;
  }
}

module.exports = APIError;
