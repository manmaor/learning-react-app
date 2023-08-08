import { useEffect, MutableRefObject } from 'react'

export const useClickedOutsideEffect = (ref: MutableRefObject<any>, onClickedOutside: (e: MouseEvent) => void) => {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target)) 
        onClickedOutside(e)
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [ref])
}