import React, { useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

import { CatchInputsData } from '../utils/catchInputsData'
import showErrorFunction from '../utils/ErrorMsg'
import { Redirect } from 'react-router-dom'

const Recovery = styled.div`
    grid-area: login;
`

export default () => {
    const [recovery, setRecovery] = useState(false)

    const sendCode = async e => {
        e.preventDefault()
        const { email } = CatchInputsData(e)

        const res = await Axios.post('http://localhost:8081/graphql', {
            query: `
            mutation{
                forgetPassword(email:"${email}")
            }
            `
        })

        if (!!res.data.errors) {
            const { message } = res.data.errors[0]
            showErrorFunction(message)
            return false
        }

        setRecovery({ email })
    }

    const verifyCode = async e => {
        e.preventDefault()
        const { key } = CatchInputsData(e)

        const res = await Axios.post('http://localhost:8081/graphql', {
            query: `
            mutation{
                verifyCodePassword(key:"${key}", email:"${recovery.email}")
            }
            `
        })

        if (!!res.data.errors) {
            const { message } = res.data.errors[0]
            showErrorFunction(message)
            return false
        }

        if (res.data.data.verifyCodePassword) return setRecovery({ ...recovery, changePassword: res.data.data.verifyCodePassword })

        return showErrorFunction('Código incorreto')
    }

    const changePassword = async e => {
        e.preventDefault()
        const { senha, senha1 } = CatchInputsData(e)

        if (senha !== senha1) return showErrorFunction('As senhas não coincidem')

        const res = await Axios.post('http://localhost:8081/graphql', {
            query: `
            mutation{
                changePassword(email:"${recovery.email}", password:"${senha}")
            }
            `
        })

        if (!!res.data.errors) {
            const { message } = res.data.errors[0]
            showErrorFunction(message)
            return false
        }

        if (res.data.data.changePassword) return setRecovery({concluded: true})
    }

    return (
        <Recovery>
            {!recovery &&
                <>
                    <p>Digite seu email para enviarmos um código</p><br />
                    <label htmlFor="email">Email: </label>
                    <form onSubmit={e => sendCode(e)}>
                        <input type="text" name="email" id="email" placeholder='Email' />
                        <input type="submit" value="Enviar código" />
                    </form>
                </>
            }

            {!!recovery.email && !recovery.changePassword &&
                <>
                    <p>Digite o código que você recebeu no email: {`${recovery.email}`}</p><br />
                    <form onSubmit={e => verifyCode(e)}>
                        <input type="text" name="key" id="key" />
                        <input type="submit" value="verificar" />
                    </form>
                </>
            }

            {!!recovery.email && recovery.changePassword &&
                <>
                    <p>Digite sua nova senha: </p><br />
                    <form onSubmit={e => changePassword(e)}>
                        <input type="password" name="senha" id="senha" placeholder='Senha' />
                        <input type="password" name="senha1" id="senha1" placeholder='Repita ela aqui' />
                        <input type="submit" value="Mudar" />
                    </form>
                </>
            }

            {!!recovery.concluded && <Redirect to='/' />}
        </Recovery>
    )
}