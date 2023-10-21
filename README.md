### Expected Behaviour

- Boards

  - Clicking different boards in the sidebar will change to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - Columns are added and removed for the Add/Edit Board modals.
  - Deleting a board deletes all columns and tasks and requires confirmation.

- Columns
  - A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
  - Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks

  - Adding a new task adds it to the bottom of the relevant column.
  - Updating a task's status will move the task to the relevant column. If you're taking on the drag and drop bonus, dragging a task to a different column will also update the status.

  colors:
  --white-background: #20212c
  --body-background: #2b2c37
  --light-grey-background: #20212c;
  --sidebar-background: #2b2c37;
  --lines-color: #3e3f4e;
  --add-column-background: linear-gradient(180deg,rgba(43,44,55,.25),rgba(43,44,55,.13));
  --loader-primary: #fff;
  --loader-secondary: #fff2;
  --primary-color: #635fc7;
  --primary-color-hover: #a8a4ff;
  --medium-grey-text: #828fa3;