
import { useRef, MutableRefObject, useCallback} from "react"
import { useClickedOutsideEffect } from "helpers"

import GridItem from "./DesignSystem/GridItem"
import Button from "./DesignSystem/Button"

import { IoClose } from 'react-icons/io5'


export type Props = {
  children?: string,
  color?: string,
  onCreate?: (title: string) => void
  onCancel?: () => void,
  rows: number
}
  
const defaultProps: Props = {
  rows: 2
}
    
  
const AddTask = (props: Props) => {
  const overallStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateAreas: `
      " new-item new-item new-item    "
      " done     cancel   bla"
    `,
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateRows: `
      auto
      auto
    `,
  }

  const textarea: React.CSSProperties = {
    padding: '0.5rem 1rem 0.5rem 1rem',
    width: '100%', 
    fontFamily: 'inherit', 
    fontSize: 'inherit', 
    resize: 'none', 
    WebkitBoxSizing: 'border-box', 
    boxShadow: 'none'
  }

  
  const divRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const textareaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
  const textareaCallback = useCallback((textarea: HTMLTextAreaElement | null) => {
    textarea && textarea.focus()
    textareaRef.current = textarea
  }, [])


  useClickedOutsideEffect(divRef, ()=> {
    props.onCancel && props.onCancel()
  })

  return (
    <div style={overallStyle} ref={divRef}>
      <GridItem gridArea="new-item">         
        <textarea style={textarea} ref={textareaCallback} rows={props.rows} />
      </GridItem>
      <GridItem gridArea="done"> 
        <div onClick={() => { textareaRef.current && props.onCreate && props.onCreate(textareaRef.current.value)  }}>
          <Button>Add Card</Button>
        </div>
      </GridItem>
      <GridItem gridArea="cancel" style={{justifySelf: 'start', alignSelf: 'center'}}> 
        <IoClose size="36" onClick={() => { props.onCancel && props.onCancel() }} />
      </GridItem>
  </div>
  );
}

AddTask.defaultProps = defaultProps
  
export default AddTask