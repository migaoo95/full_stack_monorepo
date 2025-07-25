import "./App.css";
import AppLayout from "./components/layout/app-layout";
import TaskContainer from "./features/tasks/components/TaskContainer";

function App() {
  return (
    <AppLayout>
      <TaskContainer />
    </AppLayout>
  );
}

export default App;
