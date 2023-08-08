import TaskBoard from './components/TaskBoard';
import './App.css';
import ToolBar from './components/DesignSystem/ToolBar';
import GridItem from './components/DesignSystem/GridItem'

const container: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: `
    auto
    1fr
  `,
  gridTemplateAreas: `
    "toolbar"
    "content"
  `,
  height: '100vh',
}

const App = () => {
  return (
    <div className="App" style={container}>
      <GridItem gridArea="toolbar">
        <ToolBar text="Hand Written Notes"  />
      </GridItem>

      <GridItem gridArea="content" style={{overflow: 'scroll'}}>
        <TaskBoard />
      </GridItem>
    </div>
  );
}

export default App;
