import Title from "./Title";

export type Props = {
  //children?: string,
  text?: string,
} 

const defaultProps: Props = {}

const style: React.CSSProperties = {
  border: 'thin solid currentcolor',
  borderWidth: '0 0 thin 0',
  borderRadius: '255px 15px 225px 0px/15px 225px 15px 0px',
}
  
const ToolBar = (props: Props) => {
  return (
    <div className="toolbar" style={style}>
      <Title text={props.text}/>
    </div>
  );
};

export default ToolBar;