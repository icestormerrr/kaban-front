import React, { FC, memo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ProjectCustomField, useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";
import { TasksFilter } from "@/entities/task";
import { ConfirmModal, GlassContainer, InputSelect, InputString } from "@/shared/ui";
import { useSavedState } from "@/shared/store";

import classes from "./BoardPanel.module.scss";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
  filter: TasksFilter;
  onFilterChange(prop: string, newVal?: string): void;
};

const BoardPanel: FC<Props> = ({ filter, onFilterChange }) => {
  const { t } = useTranslation();
  const projectId = useProjectIdFromPath();

  const [showAddFilterDialog, setShowAddFilterDialog] = useState(false);
  const [customFilters, setCustomFilters] = useSavedState<ProjectCustomField[]>("customFilters", []);
  const handleAddCustomFilter = (newFilter: ProjectCustomField) => {
    setCustomFilters([...(customFilters ?? []), newFilter]);
    setShowAddFilterDialog(false);
  };

  const handleClearAllCustomFilters = () => {
    customFilters.forEach((f) => onFilterChange(f._id, undefined));
    setCustomFilters([]);
  };

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: executors } = useGetUsersQuery({ usersIds: project?.users! }, { skip: !project?.users });

  return (
    <GlassContainer className={classes.panel}>
      <InputSelect
        label={t("Epic")}
        options={project?.epics ?? []}
        value={filter.epicId ?? null}
        className={classes.filter}
        onChange={(epic) => onFilterChange("epicId", epic?._id)}
      />
      <InputSelect
        label={t("Sprint")}
        options={project?.sprints ?? []}
        value={filter.sprintId ?? null}
        className={classes.filter}
        onChange={(sprint) => onFilterChange("sprintId", sprint?._id)}
      />
      <InputSelect
        label={t("Executor")}
        options={executors ?? []}
        value={filter.executorId ?? null}
        className={classes.filter}
        onChange={(executor) => onFilterChange("executorId", executor?._id)}
      />

      {customFilters.length > 0 &&
        customFilters.map((field) => (
          <InputString
            label={field.name}
            className={classes.filter}
            value={filter[field._id]}
            size={"small"}
            onChange={(value) => onFilterChange(field._id, value ?? undefined)}
          />
        ))}

      <Button onClick={() => setShowAddFilterDialog(true)}>
        <AddIcon />
      </Button>
      <Button onClick={handleClearAllCustomFilters}>
        <ClearIcon />
      </Button>
      <ConfirmModal
        title={t("Add new filter")}
        show={showAddFilterDialog}
        onClose={() => setShowAddFilterDialog(false)}
      >
        <InputSelect
          label={t("Field")}
          value={null}
          options={project?.customFields ?? []}
          className={classes.filter}
          onChange={(newField) => handleAddCustomFilter(newField as ProjectCustomField)}
          required
        />
      </ConfirmModal>
    </GlassContainer>
  );
};

export default memo(BoardPanel);
