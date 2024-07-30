import React, { FC, useCallback, useState } from "react";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddBox";
import { IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
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
  required?: boolean;
  useMovingElements?: boolean;
};

const InputList: FC<InputListProps> = ({
  type,
  list,
  onListChange,
  options,
  label,
  required,
  variant,
  useMovingElements,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const handleInputAdd = () => {
    value && onListChange([...list, { _id: uuid(), name: value }]);
    setValue("");
  };

  const handleSelect = (newOption: NApp.NamedEntity | null) => {
    newOption && onListChange([...list, newOption]);
  };

  const handleDelete = (_id: string) => {
    onListChange([...list.filter((item) => item._id !== _id)]);
  };

  const handleMoveItem = (index: number, direction: number) => {
    const newItems = [...list];
    let targetIndex = index + direction;

    // Проверяем границы массива
    if (targetIndex < 0) {
      targetIndex = list.length - 1;
    }
    if (targetIndex >= newItems.length) {
      targetIndex = 0;
    }

    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    onListChange(newItems);
  };

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
            required={required ? !list.length : false}
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
            required={required ? !list.length : false}
            size="large"
          />
        )}
      </div>
      <div>
        <List>
          {list.map((item, index) => (
            <ListItem
              key={item._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              {useMovingElements && (
                <ListItemIcon>
                  <ArrowDropUpIcon onClick={() => handleMoveItem(index, -1)} />
                  <ArrowDropDownIcon onClick={() => handleMoveItem(index, 1)} />
                </ListItemIcon>
              )}
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
export default InputList;
