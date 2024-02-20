import { DataTable, camelCaseToNormal } from "@pasal/cio-component-library";
import React, { useState } from "react";
import orderMockData from "../../../../mock/order.json";
import { OrderStatus } from "./status.type";
import { SelectChangeEvent } from '@mui/material/Select';
import { paymentStatus } from "../../../../types&Enums/payment.status.type";
import OrderSideModel from "../../SideModel";
import styles from "./list.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { filterOrders } from "../../../../../reducers/orderSlice";

type Props = {}



export default function ListOrder({ }: Props) {
  const filterData = [
    {
      label: "Order Status",
      data:  OrderStatus.map(item => camelCaseToNormal(item, true)),
      id: "orderStatus"
    },
    {
      label: "Payment Status",
      data: paymentStatus,
      id: "paymentStatus"
    },
  ];
  const count = 8;
  const {filters} = useSelector((state:RootState) => state.orders)

  const [showModel, setShowModel] = useState<boolean>(false);
  // const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
 
  const tableHeader = ["orderId", "customerId", "orderData", "price", "orderStatus", "paymentStatus", "action"];

  // normalizeDataForVisual(orderMockData, "orderStatus", colorsForTableFields);
  // normalizeDataForVisual(orderMockData, "paymentStatus", colorsForPaymentStatus);

 
  const handleChange = (event: SelectChangeEvent<typeof filters>, name: string) => {

    // if (!setFilters) return;

    const {
      target: { value },
    } = event;

    const newFiltersState = { ...filters, [name]: typeof value === 'string' ? value.split(',') : value };

    dispatch(filterOrders(newFiltersState));

  };
  
  return (
    <>
       <OrderSideModel
        showModel={showModel}
        setShowModel={setShowModel}
      /> 
      <div className={styles.dataTableContainer}>
        <DataTable
          setShowModel={setShowModel}
          tableHeader={tableHeader}
          tableData={orderMockData.slice(0, 8)}
          showFebricModels={false}
          detailsComponents={null}
          showDetailReactNode={"Edit"}
          tableTitle={"Orders"}
          showToLeftButton={null}
          setShowSelectRowId={() => { }}
          filterData={filterData}
          filters={filters} 
          // setFilters={setFilters}
          paginate={true}
          page={page}
          setPage={setPage}
          count={count}
          loading={false}
          handleFiltersOnChange={handleChange}
        />
      </div>
      {/* <Button text="sdf" variant="primary"/> */}
      {/* <Button text="all" variant="secondary"/>
    */}
    </>


  )
}