import { FC } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FieldDate, FieldSelect, FieldString } from "@/shared/ui";
import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";
import TaskColorStatusField from "./TaskColorStatusField.tsx";

type Props = {
  storeKey: string;
};

const MainFields: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const projectId = useProjectIdFromPath();
  const { data: project } = useGetProjectDetailsQuery({ id: projectId! });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  return (
    <Grid container item xs={12} spacing={2}>
      <Grid container item md={9} xs={12}>
        <Grid item xs={12}>
          <FieldString
            label={t("Description")}
            storeKey={storeKey}
            property="description"
            multiline
            fullWidth
            showBorder
            required
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={3}
        xs={12}
        rowSpacing={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Grid item>
          <FieldSelect
            label={t("Stage")}
            storeKey={storeKey}
            property="stageId"
            options={project?.stages ?? []}
            required
          />
        </Grid>
        <Grid item>
          <TaskColorStatusField label={t("Status")} storeKey={storeKey} required />
        </Grid>
        <Grid item>
          <FieldSelect label={t("Executor")} storeKey={storeKey} property="executorId" options={users ?? []} required />
        </Grid>

        <Grid item>
          <FieldSelect label={t("Author")} storeKey={storeKey} property="authorId" options={users ?? []} required />
        </Grid>
        <Grid item>
          <FieldSelect label={t("Epic")} options={project?.epics ?? []} storeKey={storeKey} property="epicId" />
        </Grid>
        <Grid item>
          <FieldSelect label={t("Sprint")} storeKey={storeKey} property="sprintId" options={project?.sprints ?? []} />
        </Grid>
        <Grid item>
          <FieldDate label={t("Creation date")} storeKey={storeKey} property="creationDatetime" disabled />
        </Grid>
        <Grid item>
          <FieldDate label={t("Plan end date")} storeKey={storeKey} property="planEndDatetime" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainFields;
