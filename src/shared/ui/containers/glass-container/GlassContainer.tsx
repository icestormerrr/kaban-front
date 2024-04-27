import React, { FC, ReactNode } from "react";

import classes from "./GlassContainer.module.scss";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {};

/**
 * GlassContainer component for displaying content in a glass-like container.
 * @memberof module:shared
 * @name GlassContainer
 * @param {React.HTMLAttributes<HTMLDivElement>} Props - The props for the GlassContainer component.
 * @param {ReactNode} children - The content to be displayed inside the glass container.
 * @param {string} className - Additional classes to be applied to the container.
 * @param {Function} onClick - The function to be called when the container is clicked.
 * @returns {JSX.Element} A glass-like container with the provided content.
 */
const GlassContainer: FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={clsx(classes.container, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default GlassContainer;
