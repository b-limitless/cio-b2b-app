import { notfication } from "../../config/apis";
import { request } from "../../utils/request";

export const updateNotification = async (id: string) => {
  try {
    const update = await request({
      url: notfication,
      method: "patch",
      body: { id, seen: true },
    });
    return update;
  } catch (err) {
    console.error(`Could not update the notification`);
  }
};
