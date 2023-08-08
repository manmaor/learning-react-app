import React, { createElement, ReactElement } from 'react'
import * as CSS from 'csstype'

export enum TextType {
  TITLE,
  SUBTITLE,
  TEXT
}

export type Props = {
  text?: string,
  type: TextType,
  textTransform: CSS.Property.TextTransform
}

const defaultProps: Props = {
  type: TextType.TEXT,
  textTransform: 'uppercase'
}
  
const Text = (props: Props) => {
  const style: React.CSSProperties = {
    margin: '0',
    // padding: '0.5rem',
    textAlign: 'start',
    textTransform: props.textTransform,
    cursor: 'default'
  }

  const getElementType = () => {
    switch (props.type) {
      case TextType.TITLE:
        return 'h1'
      case TextType.SUBTITLE:
        return 'h2'
      case TextType.TEXT:
        return 'div'
    }
  }

  return (
    <>
    { 
      createElement(getElementType(), {style: style}, props.text)
    }
    </>
  );
}

Text.defaultProps = defaultProps

export default Text