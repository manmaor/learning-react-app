export type Props = {
  children?: string,
  color?: string,
  width?: string,
  onClick?: () => void
}

const defaultProps: Props = {
  color: '#F0F0D8'
}
  
const Button = (props: Props) => {
  const style: React.CSSProperties = {
    border: 'thin solid currentcolor',
    padding: '0 16px 0 16px',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    display: 'inline-flex',
    height: '36px',
    alignItems: 'center',
    minWidth: '64px',
    justifyContent: 'center',
    backgroundColor: props.color,
    width: props.width,
    WebkitBoxSizing: 'border-box',
  }

  return (
    <div className="button" style={style} onClick={props.onClick}>
      {props.children?.toUpperCase()}
    </div>
  );
}

Button.defaultProps = defaultProps

export default Button