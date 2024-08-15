import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";

import { InputSelect } from "@/shared/ui";
import { useGetProjectsQuery, useProjectIdFromPath } from "@/entities/project";
import { UserState } from "@/entities/user";
import { useEditorSlice, useAppSelector } from "@/shared/store";
import classes from "../MainLayout.module.scss";

const ProjectSelect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const projectId = useProjectIdFromPath();

  const { entitySelector: userSelector } = useEditorSlice<UserState>("user");
  const user = useAppSelector(userSelector) || {};

  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery(
    { userId: user.id ?? "" },
    { skip: !user.id },
  );

  const handleProjectChange = (newOption: Shared.NamedEntity | null) => {
    const pathArray = pathname.split("/");
    const newProjectId = newOption?.id ?? "";
    if (pathArray[2]?.length) {
      pathArray[2] = newProjectId;
      navigate(pathArray.join("/"));
    } else {
      navigate(`/project/${newProjectId}`);
    }
  };

  return (
    <div className={classes.projectSelectContainer}>
      <InputSelect
        className={classes.projectSelect}
        value={projectId ?? null}
        options={projects}
        onChange={handleProjectChange}
        placeholder={t("Project")}
        loadingText={t("Loading")}
        loading={isProjectsFetching}
        noOptionMessage={t("You have not been added to any project yet")}
        required
        fullWidth
      />
      <IconButton onClick={() => navigate(`/project/${projectId}`)}>
        <EditIcon />
      </IconButton>
    </div>
  );
};
export default ProjectSelect;
