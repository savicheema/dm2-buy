import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./shop-tags.module.css";

import TagFilter from "./TagFilter";

const all = "all shops";

const ShopTags = ({ dynamicMarginTop, tags, setTagHeight, setFilter }) => {
  const [selectedTag, setSelectedTag] = useState();
  const tagRef = useRef(null);

  const tagHeightEffect = () => {
    setTagHeight(tagRef.current.clientHeight);
  };
  useEffect(tagHeightEffect, []);

  const selectAllStoresEffect = () => {
    if (!tags.length) return;
    setSelectedTag(all);
  };
  useEffect(selectAllStoresEffect, [tags]);

  const selectedTagEffect = () => {
    if (!selectedTag) return;

    setFilter(selectedTag);
  };
  useEffect(selectedTagEffect, [selectedTag]);

  const sortFilter = (firstFilter, secondFilter) => {
    if (typeof firstFilter != "string" || typeof secondFilter != "string")
      return -1;

    // considering emoji for length
    const firstFilterLength = [...firstFilter].length;
    const secondFilterLength = [...secondFilter].length;

    return firstFilterLength - secondFilterLength;
  };

  const storeTags = useMemo(() => {
    const list = [];
    list.push(
      <TagFilter
        tag={all}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
    );
    const tagList = tags
      .sort(sortFilter)
      .map((tag, i) => (
        <TagFilter
          key={i+1}
          tag={tag}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      ));

    return list.concat(tagList);
  }, [tags, selectedTag]);

  return (
    <div className={styles.shopTags} ref={tagRef} style={{top: dynamicMarginTop + 68}}>
      {!!tags.length ? storeTags : null}
    </div>
  );
};
export default ShopTags;
