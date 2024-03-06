import { SideModel, camelCaseToNormal } from '@pasal/cio-component-library';
import React, { ChangeEvent, useEffect, useReducer } from 'react';
import { paypal as paypalURI } from '../../../config/apis';
import { paypalModel } from '../../../model/paypal';
import { request } from '../../../utils/request';
import TransitionsSnackbar from '../../common/SnackBar';
import TabSettings from './Tabs/Tabs';

// import OrderTabs from '../Tab';

export interface OrderSideModel {
  showModel: boolean;
  setShowModel: Function;
}

export enum ESettings {
  paypal = 'paypal',
  aws = 'aws'
}
interface IConfig {
  clientId: string | null;
  clientSecret: string | null;
}


export interface ISettings {
  paypal: {
    data: IConfig,
    errors: IConfig,
    loading: boolean
    updateSuccessed: boolean
  },
  aws: {
    data: IConfig,
    errors: IConfig,
    loading: boolean,
    updateSuccessed: boolean
  },

}

// We can scale this state if we have any other setting such as for AWS or any other
// Setting
const initialState: ISettings = {
  paypal: {
    data: {
      clientId: null,
      clientSecret: null,
    },
    errors: {
      clientId: null,
      clientSecret: null,
    },
    loading: false,
    updateSuccessed: false,
  },
  aws: {
    data: {
      clientId: null,
      clientSecret: null,
    },
    errors: {
      clientId: null,
      clientSecret: null,
    },
    loading: false,
    updateSuccessed: false,
  }
}

const FETCHING = 'FETCHING';
const ONCHANGE_HANDLER = 'ONCHANGE_HANDLER';
const ONCHANGE_HANDLER_ERROR = 'ONCHANGE_HANDLER_ERROR';
const UPDATE_PARTIAL_DATA = 'UPDATE_PARTIAL_DATA';
const UPDATE_PARTIAL_ERROR = 'UPDATE_PARTIAL_ERROR';
const UPDATE_SUCCESSED = 'UPDATE_SUCCESSED'; 

interface IAction {
  key: keyof ISettings,
  value?: any;
  name?: any;
  payload?: any;
}

interface IActionPayload {
  payload: IAction,
  type: any;
}

function settingReducer(state: ISettings, action: IActionPayload) {
  switch (action.type) {
    case FETCHING: {
      const { key, value, name } = action.payload || {};
      return {
        ...state,
        [key]: {
          ...state[key],
          [name]: value
        }
      }
    }

    case ONCHANGE_HANDLER: {
      const { key, value, name } = action.payload || {};
      return {
        ...state,
        [key]: {
          ...state[key],
          data: {
            ...state[key].data,
            [name]: value
          }
        }
      }
    }

    case ONCHANGE_HANDLER_ERROR: {
      const { key, value, name } = action.payload || {};
      return {
        ...state,
        [key]: {
          ...state[key],
          errors: {
            ...state[key].errors,
            [name]: value
          }
        }
      }
    }

    case UPDATE_PARTIAL_DATA: {
      const { key, payload } = action.payload || {};

      return {
        ...state,
        [key]: {
          ...state[key],
          data: payload
        }
      }
    }

    case UPDATE_PARTIAL_ERROR: {
      const { key, payload } = action.payload || {};

      return {
        ...state,
        [key]: {
          ...state[key],
          errors: payload
        }
      }

    }

    case UPDATE_SUCCESSED: {
      const { key, value } = action.payload || {};

      return {
        ...state,
        [key]: {
          ...state[key],
          updateSuccessed: value
        }
      }
    }

    case 'FETCHED':
      return { ...state }
    case 'FETCHED_ERROR':
      return { ...state }

    default:
      return state;
  }
}

export default function Seetings({ showModel, setShowModel }: OrderSideModel) {

  const [{ paypal, aws }, dispatch] = useReducer(settingReducer, initialState);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, key: keyof ISettings) => {
    // We are updating data props
    const { name, value } = e.target;
    console.log(name, value)

    const payload = { key, name, value };

    dispatch({ type: ONCHANGE_HANDLER, payload });
  }

  const savePaypalConfig = async (body: any) => {
    try {
      const response = await request({
        url: paypalURI,
        method: 'post',
        body
      });
      if (response) {
        //dispatch({ type: UPDATE_PARTIAL_DATA, payload: { payload: response, key: ESettings.paypal } });
        dispatch({type: UPDATE_SUCCESSED, payload: {key: ESettings.paypal, value: true}});
        setShowModel(false);
      }
    } catch (err) {
      console.error()
    }
  }

  const validatePaypalModelBeforeOnSubmit = async () => {
    const errors: any = {};

    Object.keys(paypal.data).forEach((key) => {
      const value = paypal.data[key as keyof typeof paypalModel] || '';

      if (!paypalModel[key as keyof typeof paypalModel].test(value)) {
        errors[key] = `${camelCaseToNormal(key)} is required`;
      } else {
        console.log(`${key} is valid ${value}`)
        delete (errors[key]);
      }
    });


    if (Object.entries(errors).length > 0) {
      // Update the error status
      dispatch({ type: UPDATE_PARTIAL_ERROR, payload: { payload: errors, key: ESettings.paypal } });
    }
    // 
    // Check if error is empty 
    if (Object.entries(errors).length === 0) {
      // 
      await savePaypalConfig(paypal.data);
    }

  }

  const saveHandler = async (key: ESettings) => {
    if (key === ESettings.paypal) {
      await validatePaypalModelBeforeOnSubmit();
    }

    if (key === ESettings.aws) {
      // Saving AWS settings
    }

  }

  const fetchPaypalConfigurationDetails = async () => {
    try {
      const response = await request({
        url: paypalURI,
        method: 'get'
      });
      if (response) {
        const { clientId, clientSecret } = response;
        dispatch({ type: UPDATE_PARTIAL_DATA, payload: { payload: { clientId, clientSecret }, key: ESettings.paypal } });
      }
    } catch (err) {
      console.error()
    }
  }

  const onMouseLeaveEventHandler = (e: ChangeEvent<HTMLInputElement>, key: keyof ISettings) => {
    const { name, value } = e.target;
    const payload = { key, name, value: `${camelCaseToNormal(name)} is required` };


    if (!(paypalModel[name as keyof typeof paypalModel]?.test(value))) {
      dispatch({ type: ONCHANGE_HANDLER_ERROR, payload });
    } else {
      dispatch({ type: ONCHANGE_HANDLER_ERROR, payload: { ...payload, value: null } });
    }

  }


  useEffect(() => {
    const action = { key: ESettings.paypal, name: 'loading', value: true };
    dispatch({ type: FETCHING, payload: action });
  }, []);

  useEffect(() => {
    fetchPaypalConfigurationDetails();
  }, [])

  const handleCloseAlert = () => {
    dispatch({type: UPDATE_SUCCESSED, payload: {key: ESettings.paypal, value: false}});
  }

  return (
    <>
    <TransitionsSnackbar
        open={(paypal.updateSuccessed)}
        handleCloseAlert={handleCloseAlert}
        severity='success'
        message={'Configuration updated successfully.'}
      />
      <SideModel
      showModel={showModel}
      setShowModel={setShowModel}
    >
       
      <TabSettings
        paypal={paypal} aws={aws}
        onChangeHandler={onChangeHandler}
        onMouseLeaveEventHandler={onMouseLeaveEventHandler}
        saveHandler={saveHandler}
      />
    </SideModel>
      </>
    
  )
}