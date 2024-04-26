import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useProjectId = (): string | undefined => {
  const { pathname } = useLocation();
  return useMemo(() => pathname.split("/")[2], [pathname]);
};
