import { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { first } from "lodash";

import { useAppSelector, useEditorSlice } from "@/shared/store";
import { ProjectCustomField, ProjectState } from "@/entities/project";
import { GlassButton } from "@/shared/ui";
import { FieldType } from "@/shared/const";

const CustomFieldsGrid: FC<Shared.PageProps> = ({ storeKey }) => {
  const { t } = useTranslation();

  const { getPropertySelector, setEntityProperty, addElementToProperty, removeElementFromProperty } =
    useEditorSlice<ProjectState>(storeKey);
  const customFields = useAppSelector(getPropertySelector("customFields")) ?? [];

  const handleCustomFieldCreate = () => {
    addElementToProperty("customFields", {
      id: "property" + Math.round(Math.random() * 1000),
      name: "",
      type: FieldType.string,
      required: false,
    });
  };

  const handleCustomFieldDelete = () => {
    const id = first(Array.from(gridRef.current.getSelectedRows().keys()));
    removeElementFromProperty("customFields", { id });
  };

  const handleFieldUpdate = (updatedRow: ProjectCustomField, originalRow: ProjectCustomField) => {
    const index = customFields.findIndex((customField) => customField.id === originalRow.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setEntityProperty(`customFields[${index}]`, updatedRow);
    return updatedRow;
  };

  const gridRef = useGridApiRef();
  const columns: GridColDef<ProjectCustomField>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "id",
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
        valueOptions: [FieldType.string, FieldType.number, FieldType.boolean, FieldType.date],
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
    [t],
  );

  return (
    <>
      <div style={{ display: "flex", marginBottom: 10, gap: 10 }}>
        <GlassButton onClick={handleCustomFieldCreate}>{t("Add")}</GlassButton>
        <GlassButton onClick={handleCustomFieldDelete}>{t("Delete")}</GlassButton>
      </div>
      <Box sx={{ width: "100%", height: "400px" }}>
        <DataGrid rows={customFields ?? []} columns={columns} processRowUpdate={handleFieldUpdate} apiRef={gridRef} />
      </Box>
    </>
  );
};

export default CustomFieldsGrid;
