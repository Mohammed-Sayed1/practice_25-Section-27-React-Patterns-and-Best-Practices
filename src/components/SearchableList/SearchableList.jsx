import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTirm, setSearchTirm] = useState("");

  /** This is a use case of Debouncing concept:
   * on every key stroke handleChange() function will excute and chicks if lastChange.current value which is the setTimeOut id is exests
   * and if it's it clear it in case  the time of setTimeOut finishes, and if it isn't 
   * 
   */
  function handleChange(event) {
    if (lastChange.current) clearTimeout(lastChange.current);

    lastChange.current = setTimeout(() => {
        lastChange.current = null;
      setSearchTirm(event.target.value);
    }, 500);
  }

  const searchResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTirm.toLowerCase())
  );

  return (
    <div className="searchable-list">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        onChange={handleChange}
      />
      <ul>
        {searchResult.map((item) => (
          <li key={itemKeyFn(item)}>
            {/* we can use children as a function if what between openning and closing tags of this component at the parent component is a function returning JSX code */}
            {children(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
