import * as React from "react";
import { Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

interface IProps {
  basePath: string;
  children: React.ReactNode;
  title: string;
}

export default function SipleDrawer({ basePath, children, title }: IProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    navigate(`${basePath}`, { replace: true });
  };

  React.useEffect(() => {
    const paths = location.pathname.split("/");
    if (paths.length > 2) setOpen(true);
    else setOpen(false);
  }, [location]);

  return (
    <Drawer
      width={500}
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {children}
    </Drawer>
  );
}
