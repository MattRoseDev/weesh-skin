import config from "Root/config";
import weesh from "Root/public/weesh.png";

export default ({ data, type } = { data: null }) => {
  switch (type) {
    case "UserProfile":
      return `${config.UPLOAD_URL}${data.user.avatarAddress}`;
    case "WeeshPage":
      return `${config.UPLOAD_URL}${data.weesh.user.avatarAddress}`;
    default:
      return `${weesh}`;
  }
};
