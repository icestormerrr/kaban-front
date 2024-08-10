import { memo, useCallback } from "react";

import { TaskState, TaskStatus, TaskStatusColorMap, TaskStatusOptions } from "@/entities/task";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { InputSelect, InputSelectProps, Option } from "@/shared/ui";

export type TaskColorStatusFieldProps = Omit<InputSelectProps, "value" | "onChange" | "options"> & {
  storeKey: string;
};

const TaskColorStatusField = ({ storeKey, ...restProps }: TaskColorStatusFieldProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<TaskState>(storeKey);
  const value = useAppSelector(getPropertySelector("status"));
  const handleChange = useCallback(
    (value: Option | null) => setEntityProperty("status", (value?._id as TaskStatus) ?? null),
    [setEntityProperty],
  );

  return (
    <InputSelect
      value={value}
      onChange={handleChange}
      options={TaskStatusOptions}
      style={{
        "& .MuiInputBase-root": {
          backgroundColor: value ? TaskStatusColorMap[value] : "rgba(0,0,0,0)",
          color: `rgba(0,0,0,1)`,
        },
        "& .MuiFormLabel-root": {
          backgroundColor: value ? TaskStatusColorMap[value] : "rgba(0,0,0,0)",
          borderRadius: "10px",
          color: "rgba(0,0,0,1)",
        },
      }}
      {...restProps}
    />
  );
};

export default memo(TaskColorStatusField);
