import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import whats from '../assets/images/whats.png'

const Header = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;

    .whats{
        width: auto;
        height: auto;
        border-radius: 50%;
        margin-left: 17%;
        
        img{
            float: left;
        }

        h3{
            float: right;
        }
    }
`

export default props => {
    const logout = () => {
        localStorage.clear()
        props.setLogged(false)
    }
    return (
        <>
            <Header>
                {!!props.setLogged && <button onClick={logout}>Logout</button>}
                <h1><Link to='/'>Bob's House</Link></h1>

                <a className="whats" href=''>
                    <img src={whats} alt="992605966"/>
                    <h3>992605966</h3>
                </a>
            </Header>
        </>
    )
}