import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FieldSelect, FieldString } from "src/shared/ui";
import { TaskStatusOptions } from "src/entities/task";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { useGetUsersQuery } from "src/entities/user";

type Props = {
  storeKey: string;
};

const Content: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const projectId = useProjectId();
  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  return (
    <>
      <Grid item xs={12}>
        <FieldString label={t("Name")} storeKey={storeKey} property="name" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect
          label={t("Stage")}
          storeKey={storeKey}
          property="stageId"
          options={project?.stages ?? []}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect label={t("Executor")} storeKey={storeKey} property="executorId" options={users ?? []} required />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect label={t("Epic")} options={project?.epics ?? []} storeKey={storeKey} property="epicId" />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect label={t("Status")} storeKey={storeKey} property="status" options={TaskStatusOptions} required />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect label={t("Author")} storeKey={storeKey} property="authorId" options={users ?? []} required />
      </Grid>
      <Grid item xs={4}>
        <FieldSelect label={t("Sprint")} storeKey={storeKey} property="sprintId" options={project?.sprints ?? []} />
      </Grid>
      <Grid item xs={12}>
        <FieldString
          label={t("Description")}
          storeKey={storeKey}
          property="description"
          rows={20}
          multiline
          fullWidth
        />
      </Grid>
    </>
  );
};

export default Content;
