import { useState, useEffect } from "react";
import styles from "./collection-filter.module.css";

const CollectionFilter = ({
  collection,
  selectedCollection,
  setSelectedCollection,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectEffect = () => {
    if (collection != selectedCollection) setIsSelected(false);
    else setIsSelected(true);
  };
  useEffect(selectEffect, [selectedCollection]);

  return (
    <div
      className={isSelected ? styles.selectedFilter : styles.collectionFilter}
      onClick={(e) => {
        setSelectedCollection(collection);
      }}
    >
      {collection}
    </div>
  );
};

export default CollectionFilter;
