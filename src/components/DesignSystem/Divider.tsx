
import pencilBorder from 'assets/border.png'

export interface Props {
  isVertical?: boolean,
  inset: boolean
}

const defaultProps: Props = {
  inset: false
}

const Divider = (props: Props) => {
  const style: React.CSSProperties = {
    border: 'thin solid currentcolor',
    borderImage: `url(${pencilBorder}) 100 100`,
    borderWidth: '0 0 2px 0',
    marginInlineStart: props.inset ? '1rem' : 0,
    // borderRadius: '255px 15px 225px 0px/15px 225px 15px 0px',
  }

  return (
    <div style={style}/>
  );
};

Divider.defaultProps = defaultProps

  
export default Divider;