# InputCep

O `<InputCep>` é um componente moderno de estilo primitivo personalizável de input para CEP do Brasil com máscara, que ao perder o foco (evento `onBlur`), busca automaticamente os dados do logradouro utilizando a API do ViaCEP, que podem ser capturadas através da propriedade `onCepDataFetch`. 

**Importante: Funciona com o react-hook-form + zod**

![react-input-cep](https://media.licdn.com/dms/image/D4D22AQH-1QIG_l-wDQ/feedshare-shrink_160/0/1718052835338?e=1720656000&v=beta&t=oerOQbMSHbtjT-24HZVkVAD8LxrVChm38yDX5QrY3Nw "react-input-cep")

## Instalação

```bash
npm install react-input-cep
```

## Exemplos de uso

### Sem react-hook-form

Como usar o componente da forma basica, sem o react-hook-form:

```javascript
'use client' // Remover caso não esteja usando o Next13+

import { InputCep } from 'react-input-cep'
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
```

### Com react-hook-form

Como usar o componente com Zod + react-hook-form:

- Primeiramente, instale as dependências:

```bash
npm install zod @hookform/resolvers react-hook-form
```

Após, crie o caminho app/pages.tsx em seu Next.js e implemente o seguinte código:

```javascript
'use client' // Remover caso não esteja usando o Next13+

import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputCep } from 'react-input-cep'
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
```

## Como aplicar styles / css ao componente

Os estilos padrões do componente podem ser incrementados usando css-inline passando um objeto styles com as propriedades desejadas. Os estilos padrão são:

```javascript
const styles = {
  errorMsg: {
    color: 'red',
    fontSize: '12px',
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
  label: {
    fontWeight: 'normal', 
  }
};
```

Fique a vontade para trocar e adicionar outros estilos, passando ao objeto. Segue exemplo:

```javascript
const styles = {
  errorMsg: {
    color: 'darkgray',
  },
  mainDiv: {
    gap: '5px',
  },
  input: {
    padding: '5px',
    border: '2px solid purple',
    borderRadius: '15px',
    width: '20%',
  },
  label: {
    fontWeight: 'lighter',
    color: 'purple'
  }
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <InputCep
      styles={styles}
    /> 
  </form>
)
```

## Parametros do componente

| Propriedade        | Tipo                                                   | Descrição                                                                                |
|--------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------|
| `styles`           | `Styles`                                               | Estilos personalizados para o componente.                                                |
| `control`          | `ControllerProps<FieldValues>['control']`              | Controle do `react-hook-form`.                                                           |
| `name`             | `string`                                               | Nome do campo no formulário.                                                             |
| `label`            | `string`                                               | Rótulo do campo.                                                                         |
| `errors`           | `Record<string, any>`                                  | Objeto de erros do formulário.                                                           |
| `errorMsg`         | `string`                                               | Mensagem de erro personalizada.                                                          |
| `className`        | `string`                                               | Classe CSS personalizada.                                                                |
| `placeholder`      | `string`                                               | Texto placeholder do campo.                                                              |
| `disabled`         | `boolean`                                              | Desabilita o campo de input.                                                             |
| `width`            | `string`                                               | Largura do campo de input.                                                               |
| `shouldUnregister` | `boolean`                                              | Se `true`, o campo será desregistrado quando desmontado.                                 |
| `value`            | `string`                                               | Valor do campo.                                                                          |
| `onValueChange`    | `(value: string) => void`                              | Callback quando o valor do campo muda.                                                   |
| `onCepDataFetch`   | `(data: any) => void`                                  | Callback quando os dados do logradouro são buscados com sucesso.                         |
| `onBlur`           | `ReactEventHandler<HTMLInputElement>`                  | Callback para o evento de perda de foco.                                                 |
| `onLoading`        | `(loading: boolean) => void`                           | Callback para o estado de carregamento durante a busca dos dados do logradouro.          |


---

Exemplo de formulário avançado completo com auto-preenchimento dos dados, com RHF + Zod
Utilizaremos outro componente built-in genérico chamado `<InputText>`

```javascript
'use client'

import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputCep, InputText } from 'react-input-cep'
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
```

---

### InputText

O `<InputText>` é um componente genérico que acrescentei à lib do react-input-cep para auxiliar a confeccionar o formulário de endereço, conforme exemplo acima.
Ele é um componente coringa, que pode ter `máscara personalizada` e também funciona com e sem react-hook-form e zod!

Veja o exemplo abaixo de uma implementação com máscara para Data e CPF por exemplo:

```javascript
<InputText
  label="Data"
  placeholder="Informe a data de nascimento"
  name="data"
  control={control}
  errors={errors} 
  mask='99/99/9999'
/> 

<InputText
  label="CPF / CNPJ"
  placeholder="Informe o CPF ou o CNPJ"
  name="cpf"
  control={control}
  errors={errors} 
  mask={['999.999.999-99', '99.999.999/9999-99']}
/> 
```

Como observado, você pode colocar uma combinação de masks em uma array, que ele vai aceitar todas, comecando pela que tiver o menor numero de digitos e mudando para a maior assim que ultrapassar o numero de digitos da menor! Bem conveniente!


---


Qualquer dúvida ou necessidade de melhoria, deixe nos comentários ou entre em contato pelo meu Linkedin!

>Desenvolvido com **♥️** por `Anderson Carlos Campolina` para toda a comunidade brasileira de desenvolvedores!

>My linkedin: `https://www.linkedin.com/in/anderson-campolina-688175225/`