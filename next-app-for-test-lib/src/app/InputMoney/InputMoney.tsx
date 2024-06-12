// import React, { FC, HTMLAttributes, CSSProperties, ReactEventHandler } from 'react';
// import { withMask } from 'use-mask-input';
// import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
// import VMasker from "vanilla-masker";


// //region InputMoney

// // Definição do enum de moedas
// export const CurrencyEnum = {
//     BRL: { locale: 'pt-BR', currency: 'BRL', symbol: 'R$' },
//     USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
//     EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
//     GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
//     JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
//     AUD: { locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
//     CAD: { locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
//     CHF: { locale: 'de-CH', currency: 'CHF', symbol: 'CHF' },
//     CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
//     SEK: { locale: 'sv-SE', currency: 'SEK', symbol: 'kr' },
//     NZD: { locale: 'en-NZ', currency: 'NZD', symbol: 'NZ$' },
//     MXN: { locale: 'es-MX', currency: 'MXN', symbol: '$' },
//     SGD: { locale: 'en-SG', currency: 'SGD', symbol: 'S$' },
//     HKD: { locale: 'zh-HK', currency: 'HKD', symbol: 'HK$' },
//     NOK: { locale: 'nb-NO', currency: 'NOK', symbol: 'kr' },
//     KRW: { locale: 'ko-KR', currency: 'KRW', symbol: '₩' },
//     TRY: { locale: 'tr-TR', currency: 'TRY', symbol: '₺' },
//     RUB: { locale: 'ru-RU', currency: 'RUB', symbol: '₽' },
//     INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
//     ZAR: { locale: 'en-ZA', currency: 'ZAR', symbol: 'R' },
// };

// export interface InputMoneyProps extends HTMLAttributes<HTMLDivElement & HTMLInputElement> {
//     styles?: Styles;
//     control?: ControllerProps<FieldValues>['control'];
//     name?: string;
//     label?: string;
//     errors?: Record<string, any>;
//     errorMsg?: string;
//     className?: string;
//     placeholder?: string;
//     disabled?: boolean;
//     width?: string;
//     shouldUnregister?: boolean;
//     value?: string | number;
//     onValueChange?: (value: string) => void;
//     onFocus?: ReactEventHandler<HTMLInputElement>;
//     onBlur?: ReactEventHandler<HTMLInputElement>;
//     currencyType?: keyof typeof CurrencyEnum;
// }

// export const defaultInputMoneyStyles: Styles = {
//     errorMsg: {
//         color: 'red',
//         fontSize: '12px',
//         marginBottom: '-14px',
//         marginTop: '0px',
//     },
//     mainDiv: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//     },
//     input: {
//         padding: '10px',
//         border: '1px solid lightgray',
//         borderRadius: '5px',
//         width: '100%',
//     },
// };

// export const InputMoney: FC<InputMoneyProps> = ({
//     styles = defaultInputMoneyStyles,
//     control,
//     name,
//     label,
//     errors,
//     placeholder = 'R$ 0,00',
//     disabled = false,
//     width,
//     shouldUnregister = false,
//     errorMsg,
//     onValueChange,
//     onFocus,
//     onBlur,
//     currencyType = 'BRL',
// }) => {

//     const [inputValue, setInputValue] = React.useState<any>();
//     const { locale, currency, symbol } = CurrencyEnum[currencyType];

//     function formattedCurrency(value: number) {
//         const valor = value?.toLocaleString(locale, {
//             style: "currency",
//             currency: currency,
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         });

//         if(!valor) { return null } else return `${symbol} ${VMasker.toMoney(valor)}`;
//     }

//     const handleChangeControl = (
//         evento: React.ChangeEvent<HTMLInputElement>,
//         onChange: (value: string | number | any) => void
//     ) => {
//         let valor = evento.currentTarget.value.replace(symbol, "").trim() || "0";

//         valor = VMasker.toMoney(valor).toString();
//         valor = valor.replaceAll(".", "").replace(",", ".").replace(symbol, "").trim() || "0";
//         if (parseFloat(valor) <= 1000000000000) {
//             onChange(valor);
//         }
//     };

//     const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
//         let valor = evento.currentTarget.value.replace(symbol, "").trim();
//         valor = VMasker.toMoney(valor);
//         valor = valor.replaceAll(".", "").replace(",", ".").replace(symbol, "").trim() || "0";
//         if (parseFloat(valor) <= 1000000000000) {
//             setInputValue(valor);
//             onValueChange && onValueChange(valor);
//         }
//     };

//     return (
//         <>
//             {control ? 
//                 <div style={{ ...defaultInputMoneyStyles.mainDiv, ...styles.mainDiv, width: width }}>
//                     {label && <label style={{ ...defaultInputMoneyStyles.mainDiv, ...styles.label }} htmlFor={name}>{label}</label>}
//                     <Controller
//                         control={control}
//                         name={name || 'money'}
//                         shouldUnregister={shouldUnregister}
//                         render={({ field: { onChange, value: controlValue, name, ref } }) => (
//                             <input
//                                 type="text"
//                                 placeholder={placeholder}
//                                 ref={ref}
//                                 onBlur={(e) => {
//                                     onBlur && onBlur(e);
//                                 }}
//                                 disabled={disabled}
//                                 onChange={(e) => {
//                                     handleChangeControl(e, onChange);
//                                     onValueChange && onValueChange(e.currentTarget.value);
//                                 }}
//                                 value={formattedCurrency(controlValue) as any}
//                                 name={name}
//                                 id={name}
//                                 onFocus={onFocus ? (e) => { onFocus(e); } : undefined}
//                                 style={{ ...defaultInputMoneyStyles.input, ...styles.input }}
//                             />
//                         )}
//                     />
//                     {errors && errors[name || 'money'] && <p style={{ ...defaultInputMoneyStyles.errorMsg, ...styles.errorMsg }}>* {errors[name || 'money'].message}</p>}
//                 </div>
//                 :
//                 <div style={{ ...defaultInputMoneyStyles.mainDiv, ...styles.mainDiv, width: width }}>
//                     {label && <label style={{ ...defaultInputMoneyStyles.mainDiv, ...styles.label }} htmlFor={name}>{label}</label>}
//                     <input
//                         type="text"
//                         placeholder={placeholder || 'R$ 0,00'}
//                         onBlur={(e) => {
//                             onBlur && onBlur(e);
//                         }}
//                         disabled={disabled}
//                         onChange={(e) => {
//                             handleChange(e);
//                         }}
//                         value={formattedCurrency(inputValue as number) as any}
//                         name={name}
//                         id={name}
//                         onFocus={onFocus ? (e) => { onFocus(e); } : undefined}
//                         style={{ ...defaultInputMoneyStyles.input, ...styles.input }}
//                     />
//                     {errorMsg && <p style={{ ...defaultInputMoneyStyles.errorMsg, ...styles.errorMsg }}>* {errorMsg}</p>}
//                 </div>
//             }
//         </>
//     );
// };

// //#endregion