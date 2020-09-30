import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

import showErrorFunction from '../utils/ErrorMsg'
import {CatchInputsData} from '../utils/catchInputsData'

const RegisterLogin = styled.div`
    grid-area: login;
`

export default props => {
    const login = async e => {
        e.preventDefault()
        const{whatsapp, senha} = CatchInputsData(e)

        const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
            query: `
            {
                login(whatsapp:${whatsapp}, senha:"${senha}")
            }
            `
        })

        if (!!res.data.errors) {
            const {message} = res.data.errors[0]
            showErrorFunction(message)
            return false
        }

        const { login: token } = res.data.data
        
        localStorage.setItem('authorization', token)

        props.setLogged(token)
    }

    const register = async e => {
        e.preventDefault()
        const {whatsapp, senha, nome, casa, email} = CatchInputsData(e)

        const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
            query: `
            mutation{
                register(whatsapp:${whatsapp}, senha:"${senha}", casa:${casa}, nome:"${nome}", email:"${email}")
            }
            `
        })

        if (!!res.data.errors) {
            const {message} = res.data.errors[0]
            showErrorFunction(message)
            return false
        }

        const { register: token } = res.data.data

        localStorage.setItem('authorization', token)

        props.setLogged(token)
    }

    return (
        <RegisterLogin>
            {!props.register &&
                <>
                    <form onSubmit={e => login(e)}>
                        <input type="number" name="whatsapp" id="whatsapp" placeholder='Whatsapp' />
                        <input type="password" name="senha" id="senha" placeholder='Senha' />

                        <button type="submit">Logar</button>
                    </form>

                    <Link to='/register'>Registrar-se</Link><br/>
                    <Link to='/recovery'>Esqueci minha senha</Link>
                </>
            }
            {!!props.register &&
                <>
                    <form onSubmit={e => register(e)}>
                        <input type="text" name="nome" id="nome" placeholder='Nome completo' />
                        <input type="number" name="casa" id="casa" placeholder='Casa' />
                        <input type="number" name="whatsapp" id="whatsapp" placeholder='Whatsapp' />
                        <input type="text" name="email" id="email" placeholder='Email' />
                        <input type="password" name="senha" id="senha" placeholder='Senha' />

                        <button type="submit">Registrar</button>
                    </form>

                    <Link to='/'>Já tenho uma conta</Link>
                </>
            }

        </RegisterLogin>
    )
}