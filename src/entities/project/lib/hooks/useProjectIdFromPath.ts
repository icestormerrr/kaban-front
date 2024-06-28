import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useProjectIdFromPath = (): string | undefined => {
  const { pathname } = useLocation();
  return useMemo(() => pathname.split("/")[2], [pathname]);
};
