import * as React from "react";
import { Table } from "antd";
import type { PaginationProps } from "antd";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import qs from "query-string";
import { UtilHelper } from "@/utils";
import { PER_PAGE_SIZE } from "@/api/apiConst";
import type { TablePaginationConfig } from "antd/es/table";
import { useSearch } from "@/state/search";

interface IProps {
  dataSource: any;
  loading: boolean;
  children: React.ReactNode;
  showSizeChanger?: boolean;
  showPagination?: boolean;
  locale?: object;
  pageSize?: number;
  defaultPageSize?: number;
  scroll?: number;
  meta: any;
}

export default function SortableTable({
  dataSource,
  loading,
  children,
  showSizeChanger = false,
  showPagination = true,
  locale,
  defaultPageSize = PER_PAGE_SIZE,
  scroll = 1300,
  meta,
}: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(defaultPageSize);

  const { search: querySearch } = useSearch((state: any) => {
    return {
      search: state.search,
    };
  });

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    const queries: any = {
      limit: pagination.pageSize ?? defaultPageSize,
      page:
        pagination.pageSize === pageSize ? Number(pagination.current) - 1 : 0,
      sortKey: sorter?.field ?? undefined,
      sortOrder: sorter?.order
        ? sorter?.order === "ascend"
          ? "ASC"
          : "DESC"
        : undefined,
    };

    setPage(queries.page);
    setPageSize(queries.limit);

    const currentSearch = qs.parse(location.search);

    const searchQueries: any = {
      ...filters,
      ...currentSearch,
      ...queries,
    };
    searchQueries && UtilHelper.removeUndefined(searchQueries);

    navigate(
      {
        pathname: location.pathname,
        search: createSearchParams(searchQueries).toString(),
      },
      { replace: true }
    );
  };

  React.useEffect(() => {
    const currentSearch = qs.parse(location.search);
    const queryParams = qs.parse(querySearch);

    const searchQueries = { ...queryParams, ...currentSearch };

    setPage(searchQueries?.page ? Number(searchQueries?.page) : 0);
    setPageSize(
      searchQueries?.limit ? Number(searchQueries?.limit) : defaultPageSize
    );
  }, [location.search, location.pathname]);

  return (
    <Table
      dataSource={dataSource ?? []}
      loading={loading}
      onChange={handleTableChange}
      sticky={true}
      scroll={{ y: `calc(100vh - 300px)`, x: scroll }}
      className="grid-table"
      pagination={
        showPagination && {
          total: meta?.count ?? 100, // When Real Api will be absorbed, put default total count as 1 instead of 1
          current: Number(page) + 1,
          pageSizeOptions: [10, 15, 20, 30, 50],
          pageSize: pageSize,
          locale: showSizeChanger ? locale : undefined,
          itemRender: itemRender,
          showTitle: true,
          showSizeChanger: showSizeChanger,
          // showTotal: (total, range) =>
          //   `${range[0]}-${range[1]} of ${total} items`,
        }
      }
    >
      {children}
    </Table>
  );
}
