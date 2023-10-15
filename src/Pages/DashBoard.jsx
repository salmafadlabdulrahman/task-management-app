function DashBoard() {
  return (
    <div className="dashboard">
      <div className="tasks-table-container">

        <div className="column">
          <h3 className="column-title">Todo (4)</h3>

          <div className="task-card">
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Todo (4)</h3>

          <div className="task-card">
            <h3 className="task-title">Study data structures</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Todo (4)</h3>

          <div className="task-card">
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
