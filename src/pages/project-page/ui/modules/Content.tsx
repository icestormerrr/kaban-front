import React, { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FieldSelect, FieldString, FieldList, InputList } from "@/shared/ui";
import { useAppSelector, useEditorStore } from "@/shared/lib";
import { ProjectState } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";

type Props = {
  storeKey: string;
};

const Content: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const { getPropertySelector, setEntityProperty } = useEditorStore<ProjectState>(storeKey);
  const users = useAppSelector(getPropertySelector("users"));

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
          <FieldSelect label={t("Author")} options={allUsers ?? []} storeKey={storeKey} property="authorId" required />
        </Grid>
        <Grid item xs={12}>
          <FieldString label={t("Name")} storeKey={storeKey} property="name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FieldString
            label={t("Description")}
            storeKey={storeKey}
            property="description"
            rows={6}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={1}>
        <Grid item lg={3} xs={6}>
          <FieldList type="input" label={t("Epic")} storeKey={storeKey} property="epics" />
        </Grid>
        <Grid item lg={3} xs={6}>
          <FieldList type="input" label={t("Sprint")} storeKey={storeKey} property="sprints" />
        </Grid>
        <Grid item lg={3} xs={6}>
          <FieldList type="input" label={t("Stage")} storeKey={storeKey} property="stages" />
        </Grid>
        <Grid item lg={3} xs={6}>
          <InputList
            type="select"
            list={projectUsers ?? []}
            options={usersAvailableToAdd}
            onListChange={(users) =>
              setEntityProperty(
                "users",
                users.map((user) => user._id),
              )
            }
            label={t("Member")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Content;
