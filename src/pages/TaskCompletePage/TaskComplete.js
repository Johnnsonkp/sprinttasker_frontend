import React, { useEffect, useState } from "react";

import { WorkSpaceHeader } from "../../components/workspaceHeader/WorkspaceHeader";
import { loadTasks } from "../../services/taskService";

export const TaskCompleted = () => {
  const [completedTask, setCompletedTasks] = useState([]);

  const refresh = async () => {
    await loadTasks().then((res) => {
      console.log("TaskCompleted res:", res);
      if (res.length > 0) {
        let sortTaskById = res.sort((a, b) =>
          a.created_at < b.created_at ? -1 : 1
        );
        setCompletedTasks(
          sortTaskById.filter((parsedTask) => parsedTask.completed === true)
        );
      }
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div
      id="main"
      style={{
        paddingLeft: "100px",
        paddingRight: "0px",
        maxWidth: "1500px",
        width: "100%",
        margin: "auto",
        transition: "all 5s easeInOut",
      }}
    >
      {completedTask.map((task) => {
        return (
          <>
            <WorkSpaceHeader title={task.created_at} />
            <WorkSpaceHeader title={task.name} />
          </>
        );
      })}
    </div>
  );
};
