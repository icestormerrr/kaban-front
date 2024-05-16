import React, { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FieldString, InputList, InputSelect, InputString } from "src/shared/ui";
import { useAppSelector, useEditorStore } from "src/shared/lib";
import { ProjectState } from "src/entities/project";
import { useGetUsersQuery } from "src/entities/user";

type Props = {
  storeKey: string;
};

const Content: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const { entitySelector: projectSelector, setEntityProperty: setProjectProperty } =
    useEditorStore<ProjectState>(storeKey);

  const { name, description, epics, sprints, stages, users, authorId } = useAppSelector(projectSelector) ?? {};
  const handlePropertyChange = <K extends keyof ProjectState>(property: K) => {
    return (value: ProjectState[K]) => setProjectProperty(property, value);
  };

  // TODO: rewrite to server search, cause there may be a lot of users
  const { data: allUsers } = useGetUsersQuery({});
  const projectUsers = useMemo(() => allUsers?.filter((user) => users?.includes(user._id)), [allUsers, users]);
  const usersAvailableToAdd = useMemo(
    () => allUsers?.filter((user) => !projectUsers?.find((u) => u._id === user._id)),
    [allUsers, projectUsers],
  );

  return (
    <>
      <Grid container xs spacing={4}>
        <Grid item xs={12}>
          <InputSelect
            disableClearable
            required
            label={t("Author")}
            options={allUsers ?? []}
            value={authorId ?? null}
            onChange={(a) => handlePropertyChange("authorId")(a?._id ?? null)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputString value={name} onChange={handlePropertyChange("name")} label={t("Name")} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FieldString
            storeKey={storeKey}
            property="description"
            label={t("Description")}
            rows={6}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={1}>
        <Grid item lg={3} xs={6}>
          <InputList type="input" list={epics ?? []} onListChange={handlePropertyChange("epics")} label={t("Epic")} />
        </Grid>
        <Grid item lg={3} xs={6}>
          <InputList
            type="input"
            list={sprints ?? []}
            onListChange={handlePropertyChange("sprints")}
            label={t("Sprint")}
          />
        </Grid>
        <Grid item lg={3} xs={6}>
          <InputList
            type="input"
            list={stages ?? []}
            onListChange={handlePropertyChange("stages")}
            label={t("Stage")}
          />
        </Grid>
        <Grid item lg={3} xs={6}>
          <InputList
            type="select"
            list={projectUsers ?? []}
            options={usersAvailableToAdd}
            onListChange={(users) => handlePropertyChange("users")(users.map((user) => user._id))}
            label={t("Member")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Content;
