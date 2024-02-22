import React from 'react'
import { Input, InputAdornments, FormContainer } from '@pasal/cio-component-library';
import { ESettings, ISettings } from '../Setting';



type Props = {
    paypal: ISettings['paypal']
    onChangeHandler:Function;
    onMouseLeaveEventHandler:Function;
    saveHandler:Function;
}

export default function Paypal({saveHandler, paypal, onChangeHandler, onMouseLeaveEventHandler }: Props) {
    return (
        <div className="styles google">
            <FormContainer
                buttonVariant="primary"
                buttonText="Save"
                onClickEvent={() => saveHandler(ESettings.paypal)}
                
                
            >
                <Input 
                 label="Client ID" 
                 name='clientId'
                 value={paypal.data?.clientId  || ''}
                 onChange={(e:any) => onChangeHandler(e, ESettings.paypal)}
                 onBlur={(e:any) => onMouseLeaveEventHandler(e, ESettings.paypal)}
                 error={paypal.errors.clientId ?? false}
                 helperText={paypal.errors.clientId ?? null}
                
                 />
                <InputAdornments 
                    label="Client Secret" 
                    name='clientSecret' 
                    value={paypal.data?.clientSecret  || ''}
                    error={paypal.errors.clientSecret ?? false}
                    helperText={paypal.errors.clientSecret ?? null}
                    onBlur={(e:any) => onMouseLeaveEventHandler(e, ESettings.paypal)}
                    onChange={(e:any) => onChangeHandler(e, ESettings.paypal)}
                    />
                {/* <Input label="Redirect URI" /> */}
            </FormContainer>
        </div>);
}