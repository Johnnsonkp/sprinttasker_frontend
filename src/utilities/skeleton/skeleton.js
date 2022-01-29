import { Skeleton, Space } from "antd";
export const SkeletonTemplate = () => {
  return (
    <div id="trackList" className="trackList">
      <div className="dummy-side-panel"></div>
      <div className="tasklist">
        <br />
        <br />
        <Space style={{ float: "left" }}>
          <Skeleton.Button
            active={false}
            size={"default"}
            shape={"default"}
            block={false}
          />
          <Skeleton.Button
            active={false}
            size={"default"}
            shape={"default"}
            block={false}
          />
          <Skeleton.Button
            active={false}
            size={"default"}
            shape={"default"}
            block={false}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Input
            style={{ width: 1000 }}
            active={false}
            size={"default"}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Input
            style={{ width: 1000 }}
            active={false}
            size={"default"}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Input
            style={{ width: 1000 }}
            active={false}
            size={"default"}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Input
            style={{ width: 1000 }}
            active={false}
            size={"default"}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Input
            style={{ width: 1000 }}
            active={false}
            size={"default"}
          />
        </Space>
        <br />
        <br />
      </div>
    </div>
  );
};
