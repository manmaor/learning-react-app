import PropTypes from "prop-types";
import TaskList from './TaskList'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { listAdded } from 'store/TaskBoard'
import React, { useState } from "react";
import Button from "./DesignSystem/Button";
import AddTask from "./AddTask";

export type Props = {}

const TaskBoard = (props: Props) => {
  const board = useAppSelector(state => state.taskBoard)

  const dispach = useAppDispatch()
  const [isAddingList, setAddingList] = useState(false)

  const style: React.CSSProperties = {
    display: "flex"
  }

  return (
    <div style={style}>
      
      {
        board.taskLists.map(list => 
          <div style={{flex: 'none'}}>
          <TaskList key={list.id} list={list}></TaskList>
          </div>
        )
      }
      
      <div style={{flex: 'none', margin: '0.5rem', width: '20rem'}}>
        { isAddingList ?
          <AddTask rows={1} onCancel={() => { setAddingList(false) }} onCreate={(title) => { 
            dispach(listAdded({listTitle: title})) 
            setAddingList(false)
          }} /> :
          <Button width="100%" onClick={() => {setAddingList(true)}}>+ Add new list</Button>
        }
        
        
      </div>
    </div>
  );
}

export default TaskBoard