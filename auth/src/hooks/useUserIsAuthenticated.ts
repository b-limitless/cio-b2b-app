import { request } from "@pasal/cio-component-library";
import { useEffect } from "react";
import { APIS } from "../config/apis";

interface UserIsAuthenticated {
    history: any;
}
export default function useUserIsAuthenticated({history}: UserIsAuthenticated) {
//   const history = useNavigate();

  useEffect(() => {
    const userIsAuthenticated = async () => {
      try {
         await request({
          url: APIS.auth.currentUser,
          method: "get",
          unauthrizedRedirect: false
        });
      
        history.push("/dashboard");
      } catch (err:any) {
        // throw new Error(err);
        console.error(`Could not fetch current user ${err}`);
      }
    };
    userIsAuthenticated();
  }, []);
}
