import React from "react"

export type Props = {
  gridArea: string,
  style?: React.CSSProperties
} & React.PropsWithChildren<any>

const GridItem = (props: Props) => {
  return (
    <div style={{...(props.style), gridArea: props.gridArea}} onClick={props.onClick}>
      { props.children }
    </div>
  )
}

export default GridItem