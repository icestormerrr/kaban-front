import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useProjectIdFromPath = (): string | null => {
  const { pathname } = useLocation();
  return useMemo(() => {
    const projectId = pathname.split("/")[2];
    if (projectId === "undefined" || projectId === "null" || !projectId) {
      return null;
    }
    return projectId;
  }, [pathname]);
};
