
export interface MenuItemType {
    label: React.ReactNode;
    key: string;
    icon?: React.ReactNode;
    permission?: string[];
}

export interface SubMenuItemType extends MenuItemType{
    children?: MenuItemType[]
}

export interface MenuItemsType extends  SubMenuItemType{
    children?: SubMenuItemType[]
  }
  