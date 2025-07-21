import "./App.css";
import AppLayout from "./components/layout/app-layout";
import TaskContainer from "./components/TaskList/TaskContainer";

function App() {
  return (
    <AppLayout>
      <TaskContainer />
    </AppLayout>
  );
}

export default App;
