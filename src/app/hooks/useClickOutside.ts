/* React imports */
import React, { useEffect } from "react";

/* Types imports */
import { type RefObject } from "react";

const useClickOutside = (callback: () => void): RefObject<HTMLDivElement> => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
