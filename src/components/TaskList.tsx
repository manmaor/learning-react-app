
import Task from "./Task";
import Text, { TextType } from './DesignSystem/Text';
import Editable from './DesignSystem/Editable'
import pencilscribble from 'assets/pencilscribble2.png'
import GridItem from "./DesignSystem/GridItem";
import React, { MutableRefObject, useRef, useState } from "react";
import Menu from "./DesignSystem/Menu";

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Task as TaskRedux, TaskList as TaskListRedux, taskDeleted, listTitleRenamed, taskAdded, listDeleted } from 'store/TaskBoard'

import MenuItem from "./DesignSystem/MenuItem";
import Divider from "./DesignSystem/Divider";

import { IoEllipsisVertical, IoClose } from 'react-icons/io5'
import AddTask from "./AddTask";


export interface Props {
  list: TaskListRedux,
}

const overallStyle: React.CSSProperties = {
  width: '20rem',
  margin: '0.5rem',
  border: 'thin solid currentColor',
  backgroundImage: `url(${pencilscribble})`,

  display: 'grid',
  gridTemplateAreas: `
    " title    title    top-options "
    " list     list     list        "
    " new-item new-item new-item    "
  `,
  gridTemplateColumns: 'auto 1fr auto',
  gridTemplateRows: `
    auto
    1fr
    auto
  `,
}

const header: React.CSSProperties = {
  margin: '0',
  padding: '0.5rem',
  textAlign: 'start',
  textTransform: 'uppercase'
}

const listBlock: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
  padding: '0.5rem',
}

const TaskList = (props: Props) => {
  const dispatch = useAppDispatch()
  const [isAddingCard, setAddingCard] = useState(false)
  

  const taskDel = (list: TaskListRedux, task: TaskRedux) => {
    dispatch(taskDeleted( { listId: list.id, taskId: task.id } ))  
    console.log({ listId: list.id, taskId: task.id });
  }

  const menuRef: MutableRefObject<any> = useRef()

  return (
    <div className='TaskList' style={overallStyle}>
      <GridItem gridArea="title">  
        <div style={{padding: '0.5rem'}}>
          <Editable text={props.list.title} setText={(text) => { dispatch(listTitleRenamed({listId: props.list.id, listTitle: text})) }}>
            <Text text={props.list.title} type={TextType.SUBTITLE} />
          </Editable>
        </div>
      </GridItem>

      <GridItem gridArea="top-options" style={{ display:'flex', alignItems: 'center'}} 
        onClick={(e: React.MouseEvent<Element>) => {
          const bounds = e.target instanceof Element && e.target.getBoundingClientRect()
          if (bounds) 
            menuRef.current.show(bounds.x, bounds.y)
        }} >
        <IoEllipsisVertical size="32" />
      </GridItem>
    
      <GridItem gridArea="list" >
        <div style={listBlock}>
          {
            props.list.tasks
              .map(task => <Task key={task.id} task={task} onDeleted={(task: TaskRedux) => taskDel(props.list, task)} />)
          }
        </div>
      </GridItem>

      
      <GridItem gridArea="new-item"> 
      {
        isAddingCard ?
        <div style={{padding: '0.0rem .5rem .5rem .5rem'}}>
          <AddTask onCancel={() => {setAddingCard(false)}} onCreate={(title) => {
            dispatch(taskAdded({listId: props.list.id, taskTitle: title}))
            setAddingCard(false) 
          }}/>
        </div>
        :
        <div style={{padding: '0.5rem 0.5rem 0.5rem 1.5rem'}} onClick={() => {setAddingCard(true)}}>
          <Text text="+ add new item" type={TextType.TEXT} />
        </div>
      }
      </GridItem>
      

      <Menu ref={menuRef} >
        <MenuItem text="Delete" onClick={() => dispatch(listDeleted({listId: props.list.id}))} />
        <Divider inset />
        <MenuItem text="Dummy" />
        <Divider inset />
        <MenuItem text="Disabled Test" disabled />
      </Menu>
    </div>
  );
};
  
export default TaskList;