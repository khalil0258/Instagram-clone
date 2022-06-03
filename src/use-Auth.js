import { useSelector } from "react-redux";
import { authenticated, userDetail } from "./features/auth-state/auth-slice";

const useAuth = () => {
  const userD = useSelector(authenticated);

  return userD ? true : false;
};
export default useAuth;
