import React, { createElement, forwardRef, MutableRefObject, ReactElement, useCallback, useImperativeHandle, useRef, useState } from 'react'
import pencilBorder from 'assets/border3.png'
import { useClickedOutsideEffect } from 'helpers'

import 'animate.css'

export type Props = {
  children?: any
}
  
const Menu = forwardRef((props: Props, ref: any) => {
  const style: MutableRefObject<React.CSSProperties> = useRef({
    position: 'fixed',
    // width: '14rem',
    // height: '10rem',
    textAlign: 'start',
    background: '#F0F0D8',
    border: '5px solid',
    borderImage: `url(${pencilBorder}) 100 100`,
    filter: 'drop-shadow(0 0 4px #C0C0A8)',
    '--animate-duration':'0.3s',

    display: 'flex',
    flexDirection: 'column'
  })

  const [isVisible, setVisibility] = useState(false)
  const divRef = useRef(null)

  useImperativeHandle(ref, () => ({
    show(x: number, y: number) {
      style.current = {...style.current, top: y, left: x}
      setVisibility(true)
    }
  }))

  useClickedOutsideEffect(divRef, () => {
    setVisibility(false)
  })

  return (
    <>
        { isVisible ? 
            <div className="menu animate__animated animate__fadeIn" ref={divRef} style={style.current} >
              {props.children}
            </div> 
            : null }
    </>
  );
})

export default Menu