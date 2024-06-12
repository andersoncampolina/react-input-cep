'use client'

import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputCep, InputText } from '../../../../src/index'
import { useState } from 'react';

export default function FormularioPage() {

    const [isCepLoading, setIsCepLoading] = useState(false);

    const formularioSchema = z.object({
        cep: z.string({ errorMap: () => ({ message: 'CEP é obrigatório' }) }).min(8, { message: 'CEP é obrigatório e deve ter 8 caracteres' }),
        logradouro: z.string({ errorMap: () => ({ message: 'Logradouro é obrigatório' }) }).min(3, { message: 'Logradouro é obrigatório e deve ter mais de 3 caracteres' }),
        numero: z.string({ errorMap: () => ({ message: 'Número é obrigatório' }) }).min(1, { message: 'Número é obrigatório e deve ter mais de 1 caracteres' }),
        complemento: z.string().optional(),
        bairro: z.string({ errorMap: () => ({ message: 'Bairro é obrigatório' }) }).min(3, { message: 'Bairro é obrigatório e deve ter mais de 3 caracteres' }),
        cidade: z.string({ errorMap: () => ({ message: 'Cidade é obrigatório' }) }).min(3, { message: 'Cidade é obrigatório e deve ter mais de 3 caracteres' }),
        estado: z.string({ errorMap: () => ({ message: 'UF obrigatório' }) }).min(2, { message: 'Estado é obrigatório e deve ter mais de 2 caracteres' }),
    });

    const { setValue, setFocus, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formularioSchema),
    });

    const handleCepDataFetch = (data: any) => {
        setValue('logradouro', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        setFocus('numero')
    }

    const onSubmit = (submitData: any) => {
        console.log(submitData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{padding: 100, display: 'flex', flexDirection: 'column', gap: 25}}>
            <section style={{display: 'flex', gap: 20}}>
                <InputCep
                    width='50%'
                    label="CEP"
                    placeholder="Informe o CEP"
                    name="cep"
                    control={control}
                    errors={errors}
                    onLoading={(loadingStatus) => setIsCepLoading(loadingStatus)}
                    onCepDataFetch={handleCepDataFetch}
                    disabled={isCepLoading}
                />
                <InputText
                    width='100%'
                    label="Logradouro"
                    placeholder="Informe o Logradouro"
                    name="logradouro"
                    control={control}
                    errors={errors}
                    disabled={isCepLoading}
                />
                <InputText
                    width='50%'
                    label="Número"
                    placeholder="Informe o Número"
                    name="numero"
                    control={control}
                    errors={errors}
                />
            </section>
            <section style={{display: 'flex', gap: 20}}>
                <InputText
                    width='100%'
                    label="Complemento"
                    placeholder="Informe o Complemento"
                    name="complemento"
                    control={control}
                    errors={errors}
                    disabled={isCepLoading}
                />
                <InputText
                    width='100%'
                    label="Bairro"
                    placeholder="Informe o Bairro"
                    name="bairro"
                    control={control}
                    errors={errors}
                    disabled={isCepLoading}
                />
                <InputText
                    width='100%'
                    label="Cidade"
                    placeholder="Informe a Cidade"
                    name="cidade"
                    control={control}
                    errors={errors}
                    disabled={isCepLoading}
                />
                <InputText
                    width='25%'
                    label="Estado"
                    placeholder="UF"
                    name="estado"
                    control={control}
                    errors={errors}
                    disabled={isCepLoading}
                />
            </section>
            <button style={{padding: 10}} type="submit">Enviar Dados</button>
        </form>
    )
}