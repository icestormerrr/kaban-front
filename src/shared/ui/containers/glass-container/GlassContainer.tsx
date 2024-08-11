import React, { FC } from "react";

import classes from "./GlassContainer.module.scss";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {};

const GlassContainer: FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={clsx(classes.container, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default GlassContainer;
