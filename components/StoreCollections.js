import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./store-collections.module.css";

import CollectionFilter from "./CollectionFilter";

const all = "all";

const StoreCollections = ({ collections, setCollectionsHeight, setFilter }) => {
  const [selectedCollection, setSelectedCollection] = useState();
  const collectionsRef = useRef(null);

  const collectionsHeightEffect = () => {
    setCollectionsHeight(collectionsRef.current.clientHeight);
  };
  useEffect(collectionsHeightEffect, []);

  const selectAllProductsEffect = () => {
    if (!collections.length) return;
    setSelectedCollection(all);
  };
  useEffect(selectAllProductsEffect, [collections]);

  const selectedCollectionEffect = () => {
    if (!selectedCollection) return;

    setFilter(selectedCollection);
  };
  useEffect(selectedCollectionEffect, [selectedCollection]);

  const storeCollections = useMemo(() => {
    const list = [];
    list.push(
      <CollectionFilter
        collection={all}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
    );
    const collectionList = collections.map((collection, i) => (
      <CollectionFilter
        collection={collection}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
    ));

    return list.concat(collectionList);
  }, [collections, selectedCollection]);
  return (
    <div className={styles.storeCollections} ref={collectionsRef}>
      {!!collections.length ? storeCollections : null}
    </div>
  );
};
export default StoreCollections;
