"use client";

import type React from "react";

import Masonry from "react-masonry-css";
import styles from "@/styles/explore.module.css";

export interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
  breakpointCols?: {
    default: number;
    [key: number]: number;
  };
}

export function MasonryGrid({
  children,
  className,
  breakpointCols = {
    default: 4,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
    500: 1,
  },
}: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={`${styles["my-masonry-grid"]} ${className || ""}`}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {children}
    </Masonry>
  );
}
