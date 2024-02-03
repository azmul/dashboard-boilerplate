import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import * as Hooks from "@/hooks";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import {
  Button,
  Form,
  Select,
  Col,
  Row,
  Space,
  Dropdown,
  Menu,
  Checkbox,
  Divider,
  DatePicker,
} from "antd";
import type { CheckboxProps, MenuProps, GetProp } from "antd";
import qs from "query-string";
import { UtilHelper } from "@/utils";
import { useSearch } from "@/state/search";
import { STATUS, OFF_ON_STATUS, SEEN } from "@/constants/filter";
import * as regionsApi from "@/pages/todos/apis";
import styles from "./PageFilter.module.scss";

interface IProps {
  zone?: boolean;
  region?: boolean;
  status?: boolean;
  off_on_status?: boolean;
  seen?: boolean;
  start_at?: boolean;
  end_at?: boolean;
  columns?: string[];
  span?: number;
  defaultColumns?: string[];
}

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

export default function PageFilter({
  region = false,
  status = false,
  off_on_status = false,
  seen = false,
  start_at = false,
  end_at = false,
  span = 4,
  columns = [],
  defaultColumns = [],
}: IProps) {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const locationSearch: any = qs.parse(location.search);
  const locationTableColumns: string[] = locationSearch?.tableColumns
    ? locationSearch?.tableColumns.split(",")
    : [];

  const [checkedList, setCheckedList] = React.useState<CheckboxValueType[]>(
    locationTableColumns.length > 0 ? locationTableColumns : defaultColumns
  );

  const checkAll = columns.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < columns.length;

  const {
    clearAll,
    search: querySearch,
    addSearch,
  } = useSearch((state: any) => {
    return {
      clearAll: state.clearAll,
      search: state.search,
      addSearch: state.addSearch,
    };
  });

  /** Regions Data */
  const regions: Hooks.QueryResult = useQuery({
    queryKey: ["regions", { isActive: true }],
    queryFn: ({ queryKey }) => regionsApi.getAllTodos(queryKey[1]),
    enabled: Boolean(region),
  });
  const { data: regionsData } = Hooks.useData(regions);

  const handleClearFilters = React.useCallback(() => {
    clearAll();
    setCheckedList(defaultColumns);
    navigate(
      {
        pathname: location.pathname,
        search: "",
      },
      { replace: true }
    );
  }, [location.pathname, navigate, clearAll, setCheckedList]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? columns : []);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Menu className={styles.pageFilterWidth}>
          <Menu.ItemGroup key="1">
            <>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Check all
              </Checkbox>
              <Divider />
              <CheckboxGroup
                options={columns}
                value={checkedList}
                onChange={onChange}
              />
            </>
          </Menu.ItemGroup>
        </Menu>
      ),
      key: "1",
    },
  ];

  const onFinish = (values: any) => {
    let columnsList: any = {};
    const currentSearch = qs.parse(location.search);

    delete currentSearch?.tableColumns;

    if (checkedList && checkedList.length > 0) {
      columnsList["tableColumns"] = checkedList.join(",");
    }

    const searchQueries = {
      ...currentSearch,
      ...values,
      ...columnsList,
    };
    searchQueries && UtilHelper.removeUndefined(searchQueries);

    const search = createSearchParams(searchQueries).toString();
    addSearch(search);

    navigate({
      pathname: location.pathname,
      search,
    });
  };

  React.useEffect(() => {
    const searchQueries = {
      ...qs.parse(querySearch),
      ...qs.parse(location.search),
    };
    form.setFieldsValue({
      regionId: searchQueries?.regionId,
      zoneId: searchQueries?.zoneId,
      isActive: searchQueries?.isActive,
      isSeen: searchQueries?.isSeen,
      type: searchQueries?.type,
      isOnline: searchQueries?.isOnline,
      startAt: searchQueries?.startAt,
      endAt: searchQueries?.endAt,
    });
  }, [location.search, querySearch]);

  return (
    <Form
      name="filter"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      layout="vertical"
    >
      <Row gutter={[16, 16]} className={styles.pageFilter}>
        {status && (
          <Col span={span}>
            <Form.Item name="isActive">
              <Select
                placeholder="Active"
                allowClear
                optionFilterProp="children"
              >
                {STATUS &&
                  STATUS.map((status: { value: boolean; name: string }) => (
                    <Select.Option value={status.value}>
                      {status.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {seen && (
          <Col span={span}>
            <Form.Item name="isSeen">
              <Select
                placeholder="Is Seen"
                allowClear
                optionFilterProp="children"
              >
                {SEEN &&
                  SEEN.map((seen: { value: boolean; name: string }) => (
                    <Select.Option value={seen.value}>
                      {seen.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {off_on_status && (
          <Col span={span}>
            <Form.Item name="isOnline">
              <Select
                placeholder="Status"
                allowClear
                optionFilterProp="children"
              >
                {OFF_ON_STATUS &&
                  OFF_ON_STATUS.map(
                    (status: { value: boolean; name: string }) => (
                      <Select.Option value={status.value}>
                        {status.name}
                      </Select.Option>
                    )
                  )}
              </Select>
            </Form.Item>
          </Col>
        )}
        {region && (
          <Col span={span}>
            <Form.Item name="regionId">
              <Select
                loading={regions.isFetching}
                allowClear
                showSearch
                optionFilterProp="children"
                disabled={regions.isFetching}
                placeholder="Region"
              >
                {regionsData &&
                  regionsData.map((region: { id: number; title: string }) => (
                    <Select.Option value={region.id.toString()}>
                      {region.title}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {start_at && (
          <Col span={span}>
            <Form.Item name="startAt">
              <DatePicker placeholder="Start Date" />
            </Form.Item>
          </Col>
        )}
        {end_at && (
          <Col span={span}>
            <Form.Item name="endAt">
              <DatePicker placeholder="End Date" />
            </Form.Item>
          </Col>
        )}
      </Row>

      {(region || status || off_on_status || seen || start_at || end_at) && (
        <Form.Item className={styles.pageFilterActions}>
          <Row justify="space-between">
            <Space>
              <Button
                className="btn btn-primary waves-effect waves-light"
                type="primary"
                htmlType="submit"
              >
                Apply Filters
              </Button>
              <Button
                className="btn btn-secondary waves-effect waves-light"
                type="primary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </Space>
            {columns && columns.length > 0 && (
              <Dropdown trigger={["click"]} menu={{ items }}>
                <Button
                  className="btn btn-secondary waves-effect waves-light"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="ti-settings"></i>
                  {/* <Space>Select Columns</Space> */}
                </Button>
              </Dropdown>
            )}
          </Row>
        </Form.Item>
      )}
    </Form>
  );
}
