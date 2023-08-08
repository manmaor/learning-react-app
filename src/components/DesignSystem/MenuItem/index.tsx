import { MouseEvent, useState, MutableRefObject} from "react";
import Text from "../Text";

import bg from 'assets/border.png'
import './MenuItem.scss'


export type Props = {
  text?: string,
  disabled: boolean,
  onClick?: () => void
}

const defaultProps: Props = {
  text: 'Text',
  disabled: false
}

const MenuItem = (props: Props) => {
  return (
    <div className={`menu-item ${props.disabled ? 'disabled' : ''}`} onClick={props.onClick} >
      <Text text={props.text}></Text>
    </div>
  );
};

MenuItem.defaultProps = defaultProps;

export default MenuItem;