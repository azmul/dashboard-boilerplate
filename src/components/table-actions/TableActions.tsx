import { Space, Popconfirm, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  FolderViewOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface IProps {
  title: string;
  editPath: string;
  detailPath?: string;
  onDelete: () => void;
}

export default function TableActions({
  editPath,
  onDelete,
  title,
  detailPath,
}: IProps) {
  return (
    <Space>
      {detailPath && (
        <Tooltip title="Details">
          <Link to={detailPath} className="me-1 text-muted">
            <FolderViewOutlined />{" "}
          </Link>
        </Tooltip>
      )}

      <Tooltip title="Edit">
        <Link to={editPath} className="me-1 text-muted">
          <EditOutlined />
        </Link>
      </Tooltip>

      <Popconfirm
        title={`Delete the ${title}`}
        description={`Are you sure to delete this ${title}?`}
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete">
          <a title="Delete" className="text-muted">
            <DeleteOutlined />{" "}
          </a>
        </Tooltip>
      </Popconfirm>
    </Space>
  );
}
