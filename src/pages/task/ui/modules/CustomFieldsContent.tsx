import React, { FC } from "react";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { StoreField } from "@/shared/ui";
import { Grid } from "@mui/material";

const CustomFieldsContent: FC<NApp.PageProps> = ({ storeKey }) => {
  const projectId = useProjectIdFromPath();
  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });

  return (
    <>
      {project &&
        project.customFields.map((customField) => {
          return (
            <Grid item md={4} xs={12} key={customField.name}>
              <StoreField
                type={customField.type}
                property={`${customField._id}`}
                label={customField.name}
                storeKey={storeKey}
              />
            </Grid>
          );
        })}
    </>
  );
};

export default CustomFieldsContent;
