import { notfication } from "../../config/apis";
import { request } from "../../utils/request";

export const fetchNotification = async () => {
  try {
    const notifications = await request({ url: notfication, method: "get" });
    return notifications;
  } catch (err) {
    console.error(err);
  }
};
