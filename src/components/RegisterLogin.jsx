import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const RegisterLogin = styled.div`
    grid-area: login;
`

export default props => {

    return (
        <RegisterLogin>
            {!props.register &&
                <>
                    <form>
                        <input type="text" name="whatsapp" id="whatsapp" placeholder='Whatsapp' />
                        <input type="password" name="senha" id="senha" placeholder='Senha' />

                        <button type="submit"></button>
                    </form>

                    <Link to='/register'>Registrar-se</Link>
                </>
            }
            {!!props.register &&
                <>
                    <form>
                        <input type="text" name="nome" id="nome" placeholder='Nome completo' />
                        <input type="text" name="casa" id="casa" placeholder='Casa' />
                        <input type="text" name="whatsapp" id="whatsapp" placeholder='Whatsapp' />
                        <input type="password" name="senha" id="senha" placeholder='Senha' />

                        <button type="submit"></button>
                    </form>

                    <Link to='/'>Já tenho uma conta</Link>
                </>
            }

        </RegisterLogin>
    )
}