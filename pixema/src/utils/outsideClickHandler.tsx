import {MutableRefObject, useEffect} from "react";

export function useOutsideClickHandler(ref: MutableRefObject<null> | MutableRefObject<HTMLFormElement>, setState: () => void, state: boolean) {
    useEffect(() => {
        function handleClickOutside(e: any) {
            if (state && ref?.current && !ref?.current?.contains(e.target)) {
                setState()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [state]);
}