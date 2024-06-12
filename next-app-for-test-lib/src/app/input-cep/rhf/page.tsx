'use client'

import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputCep } from '../../../../../src/index'
import { useState } from 'react';

export default function InputCepPage() {

  const [isCepLoading, setIsCepLoading] = useState(false);
  const [cepData, setCepData] = useState<any>({});

  const cepSchema = z.object({
    cep: z.string({ errorMap: () => ({ message: 'CEP é obrigatório' }) })
         .min(8, { message: 'CEP é obrigatório e deve ter 8 caracteres' }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(cepSchema),
  });

  const onSubmit = (submitData: any) => {
    console.log(submitData)
    console.log(cepData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputCep
        label="CEP"
        placeholder="Informe o CEP"
        name="cep"
        control={control}
        errors={errors}
        onLoading={(loadingStatus) => setIsCepLoading(loadingStatus)}
        onCepDataFetch={data => setCepData(data)}
        disabled={isCepLoading}
      /> 
      <button style={{marginTop: 30, padding: 15}} type="submit">Enviar</button>
    </form>
  );
}
