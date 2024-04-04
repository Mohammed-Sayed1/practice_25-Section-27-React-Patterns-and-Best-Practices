import { useContext, useState } from "react";
import { createContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext); //* ctx now holds contextValue

  if (!ctx)
    throw new Error(
      "Accordion-related components must be wrappped by <Accordion>."
    );

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId(prevId => prevId === id ? null : id)
  }

  const contextValue = {
    openItemId,
    toggleItem
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

/** We can do this because functions in JavaScript are objects.
 * and what we doing here is assigning AccordionItem to item property inside Accordion function tipically like object
 */
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;