import { FC } from "react";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { Field } from "@/shared/ui";
import { Grid } from "@mui/material";

const CustomFields: FC<Shared.PageProps> = ({ storeKey }) => {
  const projectId = useProjectIdFromPath();
  const { data: project } = useGetProjectDetailsQuery({ id: projectId! });

  return (
    <Grid container item xs={12} spacing={2}>
      {project &&
        project.customFields.map((customField) => {
          return (
            <Grid item md={3} xs={12} key={customField.name}>
              <Field
                type={customField.type}
                property={`${customField.id}`}
                label={customField.name}
                storeKey={storeKey}
                fullWidth
                showBorder
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CustomFields;
