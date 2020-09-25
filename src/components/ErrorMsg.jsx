import React from 'react'
import styled, { keyframes } from 'styled-components'

const animate = keyframes`
    0%{
        top: -200px;
        opacity: 0.1;
    }
    20%{
        top: -100px;
        opacity: 0.3;
    }
    40%{
        top: 0px;
        opacity: 0.7;
    }
    60%{
        top: 0px;
        opacity: 1;
    }
    80%{
        top: 0px;
        opacity: 1;
    }
    100%{
        top: -200px;
        opacity: 0;
    }
`

const ErrorMsg = styled.div`
    width: 100px;
    height: auto;
    position: fixed;
    opacity: 0;
    left: calc(50% - 50px);
    top: -200px;
    text-align: center;
    border: 1px solid black;
    border-radius: 8px;
    background: red;
    color: white;
    z-index: 3;
    font-size: 0.8rem;

    &.show{
        animation: ${animate} 4s;
    }
`

export default () => {
    return(
        <ErrorMsg id='errorMsg'>
            <p></p>
        </ErrorMsg>
    )
}