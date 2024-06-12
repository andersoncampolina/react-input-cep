'use client'

import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../../../src/index'
import { useState } from 'react';

export default function InputTextPage() {

  const cepSchema = z.object({
    fone: z.string({ errorMap: () => ({ message: 'Fone é obrigatório' }) }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(cepSchema),
  });

  const onSubmit = (submitData: any) => {
    console.log(submitData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        label="Fone"
        placeholder="Informe o Fone"
        name="fone"
        control={control}
        errors={errors} 
        mask='(99)99999-9999'
      /> 
      <button style={{marginTop: 30, padding: 15}} type="submit">Enviar</button>
    </form>
  );
}
