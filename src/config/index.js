import google from "./google";
const PORT = 5000;
const VERSION = "1.3.0";
let API_URL, WS_URL, DOMAIN_URL, PROTOCOL, UPLOAD_URL;

const SOURCE = "liara";
const DEBUG = true;

switch (SOURCE) {
  case "liara":
    PROTOCOL = "https";
    DOMAIN_URL = "weesh-core.liara.run";
    UPLOAD_URL = `${PROTOCOL}://${DOMAIN_URL}/public`;
    API_URL = `${PROTOCOL}://${DOMAIN_URL}/api/v1/graphql`;
    WS_URL = `wss://${DOMAIN_URL}/graphql`;
    break;
  case "localhost":
    PROTOCOL = "http";
    DOMAIN_URL = `localhost:${PORT}`;
    UPLOAD_URL = `${PROTOCOL}://${DOMAIN_URL}/public`;
    API_URL = `${PROTOCOL}://${DOMAIN_URL}/api/v1/graphql`;
    WS_URL = `ws://${DOMAIN_URL}/graphql`;
    break;
}

export default {
  google,
  PORT,
  VERSION,
  PROTOCOL,
  UPLOAD_URL,
  API_URL,
  WS_URL,
  DOMAIN_URL,
  DEBUG,
};
