import { useState, useEffect } from "react";
import styles from "./tag-filter.module.css";

const TagFilter = ({
    tag,
    selectedTag,
    setSelectedTag,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectEffect = () => {
    if (tag != selectedTag) setIsSelected(false);
    else setIsSelected(true);
  };
  useEffect(selectEffect, [selectedTag]);

  return (
    <div
        className={isSelected ? styles.selectedFilter : styles.tagFilter}
        onClick={(e) => {
            setSelectedTag(tag);
        }}
    >
        {tag}
    </div>
  );
};

export default TagFilter;
