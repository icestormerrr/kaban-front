import { ACCESS_TOKEN_PERSIST_KEY } from "src/config";

export const useAuth = () => {
  return !!localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);
};
