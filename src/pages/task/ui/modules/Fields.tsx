import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FieldSelect, FieldString } from "@/shared/ui";
import { TaskStatusOptions } from "@/entities/task";
import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";

type Props = {
  storeKey: string;
};

const Fields: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const projectId = useProjectIdFromPath();
  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  return (
    <Grid container item xs={12}>
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
          <FieldSelect label={t("Status")} storeKey={storeKey} property="status" options={TaskStatusOptions} required />
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
      </Grid>
    </Grid>
  );
};

export default Fields;
