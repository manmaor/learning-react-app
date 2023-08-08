import React, { useEffect, useState, useRef, MutableRefObject, CSSProperties, DetailedHTMLProps, useCallback } from 'react'
import * as CSS from 'csstype';
import { useClickedOutsideEffect } from 'helpers'

export type Props = {
  children?: React.ReactElement<any, any>,
  text?: string,
  setText: (s: string) => void
}

const Editable = (props: Props) => {
  const [isEditing, setEditing] = useState(false)
  const divRef: MutableRefObject<DetailedHTMLProps<any, any> | null> = useRef(null)
  const inputRef = useCallback( (input: HTMLInputElement | null) => {
    input && input.focus()
  }, [])

  const isInited = useRef(false)
  const inputStyle: MutableRefObject<CSSProperties> = useRef({})

  useEffect(() => {
    divRef.current.children[0].style.removeProperty('cursor')
  }, [isEditing])
  
  // Clicking outside
  useClickedOutsideEffect(divRef, (e) => {
    setEditing(false)
  })


  // Clicking on the div
  const onClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    if (e.target instanceof HTMLElement && !(isInited.current)) {
      const computedStyle = getComputedStyle(e.target)

      inputStyle.current.height = `${e.target.clientHeight}px`
      inputStyle.current.width = `${e.target.clientWidth }px`

      inputStyle.current.fontFamily = computedStyle.fontFamily
      inputStyle.current.fontSize = computedStyle.fontSize
      inputStyle.current.fontWeight = parseFloat(computedStyle.fontWeight)
      inputStyle.current.textTransform = e.target.style.textTransform as CSS.Property.TextTransform

      inputStyle.current.padding = `0px`
      inputStyle.current.margin = `0px`
      inputStyle.current.borderWidth = '0'

      isInited.current = true 
    }

    if (!isEditing) {
      setEditing(true)
    }
  }
  

  return (
    <div className="editable" onClick={onClick} ref={divRef} style={{cursor: 'text'}}>
      {isEditing 
        ? <input 
          ref={inputRef} 
          value={props.text} 
          onChange={(e) => {props.setText(e.target.value) }} 
          style={inputStyle.current} /> 
        : props.children 
      }
    </div>
  );
}

export default Editable
