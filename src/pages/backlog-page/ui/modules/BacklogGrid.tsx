import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useGetTasksGridQuery } from "../../../../entities/task/api/taskApi";
import { useProjectId } from "../../../../entities/project";
import { TasksGridItem } from "../../../../entities/task/model/types";
import { useTranslation } from "react-i18next";

const BacklogGrid = () => {
  const { t } = useTranslation();
  const projectId = useProjectId();
  const { data = [] } = useGetTasksGridQuery({ projectId }, { skip: !projectId });

  const columnsDefs: GridColDef<TasksGridItem>[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: t("Name"),
        width: 150,
      },
      {
        field: "description",
        headerName: t("Description"),
        width: 150,
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
        width: 150,
      },
      {
        field: "executorName",
        headerName: t("Executor"),
        width: 150,
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: "100%", height: "75vh" }}>
      <DataGrid
        rows={data}
        columns={columnsDefs}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 13,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default BacklogGrid;
