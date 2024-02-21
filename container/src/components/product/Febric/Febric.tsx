import { SelectChangeEvent } from '@mui/material/Select';
import { Button, DataTable, svgCDNAssets } from '@pasal/cio-component-library';
import { request } from '../../../utils/request';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { affectedRowAction, fetchFebrics, fetchingFebrics, filterFebric, updateFebric } from '../../../../reducers/productSlice';
import { APIS } from '../../../config/apis';
import { brightness, febricSeasons } from '../../../config/febric';
import { ProductInterface } from '../../../interfaces/febric.interface';
import { RootState } from '../../../store';
import ConfirmationDialog from '../../common/Confimation/ConfirmationDialog';
import FebricDetailsModel from './FebricDetailsModel';
import FebricImageModel from './FebricImageModel';
import styles from './styles.module.scss';


const perPage = 20;

const filterData = [
  {
    label: 'Febric Season',
    data: febricSeasons.map(febricSeason => (febricSeason.code)),
    id: 'febricSeasons'
  },
  {
    label: 'Brightness',
    data: brightness.map(t => (t.code)),
    id: 'brightness'
  },
];


interface FebricInterface {
  product: ProductInterface;
  actions: any;
  globalDispatch: any
}

export default function Febric() {
  const customStyle = {
    cursor: 'pointer'
  }

  const tableHeader = ['title', 'type', 'price', 'febricSeasons', 'action'];

  const { product: { loading, febrics, affectedRows, filters } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();


  const [showModel, setShowModel] = useState<number>(-1);
  
  const [page, setPage] = useState<number>(0);
  const [showFebricImageModel, setShowFebricImageModel] = useState(false);
  const [deleteFebric, setDeleteFebric] = useState<null | string>(null);
  const [deletingFebric, setDeletingFebric] = useState<boolean>(false);


  const showModelHandler = (i: number) => {
    setShowModel(i);
  }

  const editFebricHandler = (febric: string) => {
    console.log('febric', febric);
    dispatch(updateFebric(febric));
    // history.push('/products/febric/add');
  }

  const deleteFebricHandler = (id: string) => {
    setDeleteFebric(id);
  }

  // Lets fetch the febrics

  useEffect(() => {
    const fetchFebricsOnComponentMount = async () => {
      dispatch(fetchingFebrics(true));
      try {
        const {febrics, affectedRows} = await request({
          url: `${APIS.product.new}?page=${page}&filters=${JSON.stringify(filters)}`,
          method: 'get'
        });
        febrics.map((row: any, i: number) => {
          row.action = <>
            <a style={customStyle} onClick={() => showModelHandler(i)}>Details</a>{' '}
            <Link to='/products/febric/add' onClick={() => editFebricHandler(row.id)}>Edit</Link>
            {' '}
            <span className={styles.deleteSpan} onClick={() => deleteFebricHandler(row.id)}>Delete</span>
          </>;
          return row;
        });
        dispatch(fetchFebrics(febrics));
        dispatch(affectedRowAction(affectedRows));
      } catch (err) {
        console.error('Could not fetch febric', err);
      }
      dispatch(fetchingFebrics(false));
    }
    fetchFebricsOnComponentMount();
  }, [page, filters]);

  const deleteCancelHandler = () => {
    setDeleteFebric(null);
  }

  const deleteHandler = async() => {
    setDeletingFebric(true)
    try {
      await request({
        method: 'delete', 
        url: `${APIS.product.new}/${deleteFebric}`
      });
      dispatch(fetchFebrics(febrics.filter((febric) => febric.id !== deleteFebric)));
      setDeleteFebric(null);
    } catch(err:any) {
      console.error(err);
      throw new Error(err);
    }
    setDeletingFebric(false)
  }

  const handleChange = (event: SelectChangeEvent<typeof filters>, name: string) => {

    // if (!setFilters) return;

    const {
      target: { value },
    } = event;

    const newFiltersState = { ...filters, [name]: typeof value === 'string' ? value.split(',') : value };

    dispatch(filterFebric(newFiltersState));

    // setFilters(
    //   { ...filters, [name]: typeof value === 'string' ? value.split(',') : value }

    // );
  };


  return (
    <>
      {/* <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} /> */}
      {deleteFebric && <ConfirmationDialog

>
  <Button variant='light' text='Cancel' onClick={deleteCancelHandler} />
  <Button variant='primary' text={deletingFebric ? 'Please wait...' : 'Confirm'} className={styles.dark__primary} size="small" onClick={deletingFebric ? null : deleteHandler}/>

</ConfirmationDialog>}
      <FebricImageModel
        febric={showModel !== -1 ? febrics[showModel] : null}
        showFebricImageModel={showFebricImageModel}
        setShowFebricImageModel={setShowFebricImageModel}
      />
      <FebricDetailsModel
        showModel={showModel}
        setShowModel={setShowModel}
        febric={showModel !== -1 ? febrics[showModel] : null}
        setShowFebricImageModel={setShowFebricImageModel}
        showFebricImageModel={showFebricImageModel}
      />
      <DataTable
        setShowModel={setShowModel}
        tableHeader={tableHeader}
        // tableData={mockFebrics.slice(page * count, count + (page * count))}
        tableData={febrics}
        // showFebricModels={showModel}
        detailsComponents={null}
        showDetailReactNode={<img src={svgCDNAssets.eye} />}
        tableTitle={'Febrics'}
        showToLeftButton={{ url: '/products/febric/add', label: 'Add Febric' }}
        setShowSelectRowId={undefined}
        filterData={filterData}
        filters={filters}
        // setFilters={setFilters}
        paginate={true}
        page={page}
        setPage={setPage}
        count={Math.ceil(affectedRows/perPage)}
        loading={loading}
        rightButton={<Link to={'/products/febric/add'}><Button variant='primary' text={'Add'} /></Link>}
        handleFiltersOnChange={handleChange}
      />
    </>

  )
}