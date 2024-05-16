import React, { FC, useCallback, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddBox";
import { IconButton, InputAdornment, List, ListItem, ListItemText } from "@mui/material";
import { v4 as uuid } from "uuid";

import InputString from "./InputString";
import InputSelect from "./InputSelect";

export type InputListProps = {
  type: "input" | "select";
  list: NApp.NamedEntity[];
  onListChange: (newList: NApp.NamedEntity[]) => void;
  options?: NApp.NamedEntity[];
  label: string;
  variant?: "filled" | "outlined" | "standard";
};

// TODO: refactor to sOlid
const InputList: FC<InputListProps> = ({ type, list, onListChange, options, label, variant }) => {
  const [value, setValue] = useState<string | null>(null);

  const handleInputAdd = () => {
    value && onListChange([...list, { _id: uuid(), name: value }]);
    setValue("");
  };

  const handleSelect = (newOption: NApp.NamedEntity | null) => {
    newOption && onListChange([...list, newOption]);
  };

  const handleDelete = useCallback(
    (_id: string) => {
      onListChange([...list.filter((item) => item._id !== _id)]);
    },
    [list, onListChange],
  );

  return (
    <div>
      <div style={{ display: "flex" }}>
        {type === "input" ? (
          <InputString
            value={value}
            onChange={(v) => setValue(v)}
            label={label}
            variant={variant}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleInputAdd}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <InputSelect
            fullWidth
            label={label}
            options={options ?? []}
            value={null}
            onChange={handleSelect}
            size="large"
          />
        )}
      </div>
      <div>
        <List>
          {list.map((item) => (
            <ListItem
              key={item._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
export default InputList;
