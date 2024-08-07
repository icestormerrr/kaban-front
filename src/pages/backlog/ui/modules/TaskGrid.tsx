import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

import { useGetTasksGridQuery, TasksGridItem } from "@/entities/task";
import { useProjectIdFromPath } from "@/entities/project";

const TaskGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projectId = useProjectIdFromPath();
  const { data: rows = [] } = useGetTasksGridQuery(
    { projectId: projectId! },
    { skip: !projectId, refetchOnMountOrArgChange: true },
  );

  const columns: GridColDef<TasksGridItem>[] = useMemo(
    () => [
      { field: "_id", headerName: "_id", width: 90 },
      {
        field: "name",
        headerName: t("Name"),
        width: 200,
      },
      {
        field: "description",
        headerName: t("Description"),
        width: 200,
      },
      {
        field: "epicName",
        headerName: t("Epic"),
        width: 150,
      },
      {
        field: "sprintName",
        headerName: t("Sprint"),
        width: 150,
      },
      {
        field: "authorName",
        headerName: t("Author"),
        width: 200,
      },
      {
        field: "executorName",
        headerName: t("Executor"),
        width: 200,
      },
    ],
    [],
  );

  const handleCellDoubleClick = useCallback(
    (params: GridCellParams<TasksGridItem>) => {
      navigate(`/project/${projectId}/task/${params.row._id}`);
    },
    [navigate, projectId],
  );

  return (
    <Box sx={{ width: "100%", height: "73vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[13]}
        onCellDoubleClick={handleCellDoubleClick}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
    </Box>
  );
};

export default TaskGrid;
