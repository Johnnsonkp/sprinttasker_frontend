import { DownloadOutlined } from "@ant-design/icons";

export const DuplicateTask = (props) => {
  const handleClick = (task, createTask) => {
    createTask(task);
  };

  return (
    <DownloadOutlined
      onClick={() => handleClick(props.task, props.createTask)}
      style={{ fontSize: "11px" }}
    />
  );
};
