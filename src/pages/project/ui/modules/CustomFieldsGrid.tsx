import React, { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

import { useAppSelector, useEditorStore } from "@/shared/store";
import { ProjectCustomField, ProjectState } from "@/entities/project";
import { GlassButton } from "@/shared/ui";
import { FieldType } from "@/shared/const";

const CustomFieldsGrid: FC<NApp.PageProps> = ({ storeKey }) => {
  const { t } = useTranslation();

  const { getPropertySelector, setEntityProperty } = useEditorStore<ProjectState>(storeKey);
  const customFields = useAppSelector(getPropertySelector("customFields")) ?? [];
  const gridRef = useGridApiRef();

  const columns: GridColDef<ProjectCustomField>[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: "_id",
        width: 300,
        editable: true,
      },
      {
        field: "name",
        headerName: t("Name"),
        width: 300,
        editable: true,
      },
      {
        field: "type",
        headerName: t("Type"),
        type: "singleSelect",
        valueOptions: [FieldType.string, FieldType.select, FieldType.number, FieldType.boolean],
        width: 300,
        editable: true,
      },
      {
        field: "required",
        headerName: t("Required"),
        type: "boolean",
        width: 300,
        editable: true,
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ display: "flex", marginBottom: 10, gap: 10 }}>
        <GlassButton
          onClick={() =>
            setEntityProperty("customFields", [
              ...customFields,
              { _id: "property" + (Math.random() % 1000), name: "", type: FieldType.string, required: false },
            ])
          }
        >
          {t("Add")}
        </GlassButton>
        <GlassButton
          onClick={() =>
            setEntityProperty(
              "customFields",
              customFields.filter(({ _id }) => {
                return !gridRef.current.getSelectedRows().get(_id);
              }),
            )
          }
        >
          {t("Delete")}
        </GlassButton>
      </div>

      <DataGrid
        rows={customFields ?? []}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) => {
          setEntityProperty(
            "customFields",
            customFields.map((customField) => {
              if (customField._id === originalRow._id) {
                return updatedRow;
              }
              return customField;
            }),
          );
          return updatedRow;
        }}
        pageSizeOptions={[5]}
        getRowId={(row) => row._id}
        apiRef={gridRef}
      />
    </Box>
  );
};

export default CustomFieldsGrid;
