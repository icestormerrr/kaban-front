import React, { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridColType } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

import { useGetTasksGridQuery, TasksGridItem, TaskStatusColorMap } from "@/entities/task";
import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { skipToken } from "@reduxjs/toolkit/query";

type Props = {
  height: string;
};

const TaskGrid: FC<Props> = ({ height }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const projectId = useProjectIdFromPath();
  const { data: project } = useGetProjectDetailsQuery(projectId ? { id: projectId } : skipToken);

  const { data: tasks = [] } = useGetTasksGridQuery(
    { projectId: projectId! },
    { skip: !projectId, refetchOnMountOrArgChange: true },
  );

  const columns: GridColDef<TasksGridItem>[] = useMemo(
    () => [
      {
        field: "name",
        headerName: t("Name"),
        width: 200,
      },
      {
        field: "description",
        headerName: t("Description"),
      },
      {
        field: "status",
        headerName: t("Status"),
        renderCell({ row }) {
          return <div style={{ backgroundColor: TaskStatusColorMap[row.status], width: "100%", height: "100%" }}></div>;
        },
        filterable: false,
      },
      {
        field: "stageName",
        headerName: t("Stage"),
      },
      {
        field: "epicName",
        headerName: t("Epic"),
      },
      {
        field: "sprintName",
        headerName: t("Sprint"),
      },
      {
        field: "authorName",
        headerName: t("Author"),
      },
      {
        field: "executorName",
        headerName: t("Executor"),
      },
      ...(project?.customFields || []).map((field) => ({
        field: field.id,
        headerName: field.name,
        type: field.type as GridColType,
      })),
    ],
    [project?.customFields, t],
  );

  const handleCellDoubleClick = useCallback(
    (params: GridCellParams<TasksGridItem>) => {
      navigate(`/project/${projectId}/task/${params.row.id}`);
    },
    [navigate, projectId],
  );

  return (
    <Box sx={{ width: "100%", height }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 15, 25, 50]}
        onCellDoubleClick={handleCellDoubleClick}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default TaskGrid;
