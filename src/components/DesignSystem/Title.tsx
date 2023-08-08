
export interface Props {
  text?: string,
}

const defaultProps: Props = {
  text: 'Header Text'
}

const style: React.CSSProperties = {
  margin: '1rem 0 1rem 0'
}

const Title = (props: Props) => {
  return (
    <h1 className="title" style={style} >{props.text}</h1>
  );
};

Title.defaultProps = defaultProps;
  
export default Title;