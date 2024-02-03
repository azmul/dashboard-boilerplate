import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Styles.module.scss";

interface IProps {
  createPath: string;
  createTitle: string;
  title: string;
  hideCreateButton?: boolean;
}

export default function TableTopContent({
  title,
  createTitle,
  createPath,
  hideCreateButton = false,
}: IProps) {
  const navigate = useNavigate();

  return (
    <Flex
      className={styles.tableTopContent}
      justify="space-between"
      align="flex-end"
    >
      <h4 className="card-title">{title}</h4>
      {!hideCreateButton && (
        <Button
          type="primary"
          size="middle"
          onClick={() => navigate(createPath, { replace: true })}
        >
          {createTitle}
        </Button>
      )}
    </Flex>
  );
}
