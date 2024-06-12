'use client'

import { InputCep } from '../../../../src/index'
import { useState } from 'react'

export default function InputCepPage() {

  const [isCepLoading, setIsCepLoading] = useState(false)
  const [cepData, setCepData] = useState<any>({})
  const [cep, setCep] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!cep) {
      setErrorMsg('CEP é obrigatório')
      return
    }
    console.log(cep);
    console.log(cepData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputCep
        label="CEP"
        placeholder="Informe o CEP"
        name="cep"
        onValueChange={value => setCep(value)}
        onLoading={(loadingStatus) => setIsCepLoading(loadingStatus)}
        onCepDataFetch={data => setCepData(data)}
        disabled={isCepLoading}
        errorMsg={errorMsg}
      /> 
      <button style={{marginTop: 30, padding: 15}} type="submit">Enviar</button>
    </form>
  );
}
