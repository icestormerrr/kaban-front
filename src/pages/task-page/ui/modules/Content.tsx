import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { InputSelect, InputString } from "src/shared/ui";
import { TaskState, TaskStatus, TaskStatusOptions } from "src/entities/task";
import { useAppSelector, useEditorStore } from "src/shared/lib";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { useGetUsersQuery } from "src/entities/user";

type Props = {
  storeKey: string;
};

const Content: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const projectId = useProjectId();
  const { data: project, isFetching } = useGetProjectDetailsQuery({ _id: projectId });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  const { entitySelector: taskSelector, setEntityProperty: setTaskProperty } = useEditorStore<TaskState>(storeKey);
  const { name, epicId, sprintId, stageId, status, executorId, authorId, description } =
    useAppSelector(taskSelector) ?? {};

  const handlePropertyChange = <K extends keyof TaskState>(property: K) => {
    return (value: TaskState[K]) => setTaskProperty(property, value);
  };
  return (
    <>
      <Grid item xs={12}>
        <InputString value={name} onChange={handlePropertyChange("name")} label={t("Name")} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <InputString
          value={description}
          onChange={handlePropertyChange("description")}
          label={t("Description")}
          rows={20}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          disableClearable
          required
          label={t("Stage")}
          options={project?.stages ?? []}
          value={stageId}
          onChange={(s) => handlePropertyChange("stageId")(s?._id ?? null)}
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          disableClearable
          required
          label={t("Executor")}
          options={users ?? []}
          value={executorId ?? null}
          onChange={(e) => handlePropertyChange("executorId")(e?._id ?? null)}
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          label={t("Epic")}
          options={project?.epics ?? []}
          value={epicId}
          onChange={(e) => handlePropertyChange("epicId")(e?._id ?? null)}
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          disableClearable
          required
          label={t("Status")}
          options={TaskStatusOptions}
          value={status}
          onChange={(s) => handlePropertyChange("status")((s?._id as TaskStatus) ?? null)}
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          disableClearable
          required
          label={t("Author")}
          options={users ?? []}
          value={authorId ?? null}
          onChange={(a) => handlePropertyChange("authorId")(a?._id ?? null)}
        />
      </Grid>
      <Grid item xs={4}>
        <InputSelect
          label={t("Sprint")}
          options={project?.sprints ?? []}
          value={sprintId}
          onChange={(s) => handlePropertyChange("sprintId")(s?._id ?? null)}
        />
      </Grid>
    </>
  );
};

export default Content;
