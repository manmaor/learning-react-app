import { MouseEventHandler } from 'react'
import { useAppDispatch } from 'store/hooks'
import { Task as TaskRedux, taskDeleted } from 'store/TaskBoard'


export type Props = {
  children?: string,
  backgroundColor?: string,
  task: TaskRedux | null,
  onDeleted?: (task: TaskRedux) => void
}

const defaultProps: Props = {
    backgroundColor: '#F0F0D8',
    task: null
}
  
const Item = (props: Props) => {
  const style: React.CSSProperties = {
    border: 'thin solid currentcolor',
    padding: '0 16px 0 16px',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    display: 'inline-flex',
    height: '36px',
    alignItems: 'center',
    minWidth: '64px',
    justifyContent: 'start',
    backgroundColor: props.backgroundColor,
  }

  const onDelete = (e: any) => {
    props.task && props.onDeleted && props.onDeleted(props.task);
  }

  return (
    <div className="task" style={style} onClick={onDelete}>
      {props.task?.title.toUpperCase()}
    </div>
  );
}

Item.defaultProps = defaultProps
export default Item