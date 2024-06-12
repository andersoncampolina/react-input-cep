import React, { FC, HTMLAttributes, CSSProperties, ReactEventHandler } from 'react';
import { withMask } from 'use-mask-input';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';


//#region InputCep 

export interface InputCepProps extends HTMLAttributes<HTMLDivElement & HTMLInputElement> {
    styles?: Styles;
    control?: ControllerProps<FieldValues>['control'];
    name?: string;
    label?: string;
    errors?: Record<string, any>;
    errorMsg?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    width?: string;
    shouldUnregister?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    onCepDataFetch?: (data: any) => void;
    onBlur?: ReactEventHandler<HTMLInputElement>;
    onLoading?: (loading: boolean) => void;
}

export interface CepDataProps {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
}

export interface Styles {
  [key: string]: CSSProperties;
}

export const defaultInputCepStyles: Styles = {
    errorMsg: {
        color: 'red',
        fontSize: '12px',
        marginBottom: '-14px',
        marginTop: '0px',
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        padding: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        width: '100%',
    },
};

export const InputCep: FC<InputCepProps> = ({
    styles = defaultInputCepStyles,
    control,
    name,
    label,
    errors,
    placeholder,
    disabled,
    width,
    shouldUnregister = false,
    value,
    errorMsg,
    onValueChange,
    onCepDataFetch,
    onBlur,
    onLoading,
}) => {

    const fetchCepData = async (cep: string) => {
        onLoading && onLoading(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            onCepDataFetch && onCepDataFetch(data as CepDataProps);
        } finally {
            onLoading && onLoading(false);
        }
    };

    const handleOnBlur = async (evento: React.FocusEvent<HTMLInputElement>) => {
        const cep = evento.target.value.replace(/\D/g, '');
        if (cep.length === 8) {
            await fetchCepData(cep);
        }
    };

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        const formattedCep = evento.currentTarget.value.replace(/\D/g, ''); //remove tudo menos os numeros
        onChange(formattedCep);
    };

    return (
      <>
        {control ? 
          <div style={{ ...defaultInputCepStyles.mainDiv, ...styles.mainDiv, width: width }}>
            {label && <label style={{...defaultInputCepStyles.mainDiv, ...styles.label}} htmlFor={name}>{label}</label>}
            {control && <Controller
              name={name || 'cep'}
              control={control}
              shouldUnregister={shouldUnregister}
              render={({ field: { onChange, value: controlValue, name } }) => (
                  <input
                      type="text"
                      placeholder={placeholder}
                      ref={withMask('99999-999')}
                      onBlur={(e) => {
                          handleOnBlur(e);
                          onBlur && onBlur(e);
                      }}
                      disabled={disabled}
                      value={value || controlValue}
                      name={name}
                      id={name}
                      onChange={(e) => {
                          handleChange(e, onChange);
                          const formattedCep = e.currentTarget.value.replace(/\D/g, ''); //remove tudo menos os numeros
                          onValueChange && onValueChange(formattedCep);
                      }}
                      style={{...defaultInputCepStyles.input, ...styles.input}}
                  />
              )}
          />}
          {errors && errors[name || 'cep'] && <p style={{...defaultInputCepStyles.errorMsg, ...styles.errorMsg}}>* {errors[name || 'cep'].message}</p>}
          </div>
          :
          <div style={{ ...defaultInputCepStyles.mainDiv, ...styles.mainDiv, width: width }}>
            {label && <label style={{...defaultInputCepStyles.mainDiv, ...styles.label}} htmlFor={name}>{label}</label>}
            <input
              type="text"
              placeholder={placeholder || 'Digite um CEP'}
              ref={withMask('99999-999')}
              onBlur={(e) => {
                  handleOnBlur(e);
                  onBlur && onBlur(e);
              }}
              disabled={disabled}
              value={value}
              name={name}
              id={name}
              onChange={(e) => {
                  const formattedCep = e.currentTarget.value.replace(/\D/g, ''); //remove tudo menos os numeros
                  onValueChange && onValueChange(formattedCep);
              }}
              style={{...defaultInputCepStyles.input, ...styles.input}}
            />
            {errorMsg && <p style={{...defaultInputCepStyles.errorMsg, ...styles.errorMsg}}>* {errorMsg}</p>}
          </div>
        }
      </> 
    );
}

//#endregion



//#region InputText


export interface InputTextProps extends React.HTMLAttributes<HTMLDivElement & HTMLInputElement> {
    control?: ControllerProps<FieldValues>['control'];
    styles?: Styles;
    name?: string;
    label?: string;
    errors?: Record<string, any>;
    className?: string;
    placeholder?: string;
    mask?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    width?: string;
    shouldUnregister?: boolean;
    onValueChange?: (value: string) => void;
    errorMsg?: string;
}

export const defaultInputTextStyles: Styles = {
    errorMsg: {
        color: 'red',
        fontSize: '12px',
        marginBottom: '-14px',
        marginTop: '0px',
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        padding: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        width: '100%',
    },
};

export const InputText: FC<InputTextProps> = ({
    control,
    name,
    label,
    errors,
    placeholder,
    styles = defaultInputTextStyles,
    mask,
    onBlur,
    disabled,
    width,
    shouldUnregister = false,
    onValueChange,
    errorMsg,
}) => {

    const handleChangeControl = (evento: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        onChange(evento.currentTarget.value);
        onValueChange && onValueChange(evento.currentTarget.value);
    };

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange && onValueChange(evento.currentTarget.value);
    };

    return (
        <>
            {control ? 
                <div style={{ ...defaultInputTextStyles.mainDiv, ...styles.mainDiv, width: width }}>
                    {label && <label style={{ ...defaultInputTextStyles.label, ...styles.label }} htmlFor={name}>{label}</label>}
                    <Controller
                        control={control}
                        name={name || 'text'}
                        shouldUnregister={shouldUnregister}
                        render={({ field: { onChange, value: controlValue, name, ref } }) => (
                            <input
                                type="text"
                                placeholder={placeholder}
                                ref={mask ? withMask(mask) : ref}
                                onBlur={(e) => {
                                    onBlur && onBlur(e);
                                }}
                                disabled={disabled}
                                onChange={(e) => {
                                    handleChangeControl(e, onChange);
                                    onValueChange && onValueChange(e.currentTarget.value);
                                }}
                                value={controlValue}
                                name={name}
                                id={name}
                                style={{ ...defaultInputTextStyles.input, ...styles.input }}
                            />
                        )}
                    />
                    {errors && errors[name || 'text'] && <p style={{ ...defaultInputTextStyles.errorMsg, ...styles.errorMsg }}>* {errors[name || 'text'].message}</p>}
                </div>
                :
                <div style={{ ...defaultInputTextStyles.mainDiv, ...styles.mainDiv, width: width }}>
                    {label && <label style={{ ...defaultInputTextStyles.label, ...styles.label }} htmlFor={name}>{label}</label>}
                    <input
                        type="text"
                        placeholder={placeholder}
                        onBlur={(e) => {
                            onBlur && onBlur(e);
                        }}
                        disabled={disabled}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        value={''}
                        name={name}
                        id={name}
                        style={{ ...defaultInputTextStyles.input, ...styles.input }}
                    />
                    {errorMsg && <p style={{ ...defaultInputTextStyles.errorMsg, ...styles.errorMsg }}>* {errorMsg}</p>}
                </div>
            }
        </>
    );
};

export default InputText;


//#endregion