import React, { useState } from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

import ErrorMsg from '../utils/ErrorMsg'

const Div = styled.div`
    grid-area: login;
    display: flex;
    align-items:center;
    justify-content: center;

    .content{
        min-width: 100px;
        min-height: 100px;
    }

    .confirm {
        display: none;
    }

    .confirm.show{
        display: inline;
    }

`

export default () => {
    const [horarios, setHorarios] = useState()
    const [produtoDia, setProdutoDia] = useState()

    let produto, dia

    const getHours = async (produto, dia) => {
        const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
            query: `
            {
                checkTimes(produto: "${produto}", dia: "${dia}") {
                    hora
                }
            }
            `
        })
        setProdutoDia({produto, dia})
        setHorarios(res.data.data.checkTimes)
    }

    const confirmHour = (hour) => {
        const button = document.querySelector('.confirm')

        button.innerHTML = `Confirmar para as ${hour}`
        button.value= hour

        button.classList.add('show')
    }

    const markHour = async (hour) => {
        const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
            query: `
            mutation{
                markHour(produto: "${produtoDia.produto}", dia: "${produtoDia.dia}", horario:"${hour}", token:"${localStorage.getItem('authorization')}")
            }
            `
        })
        ErrorMsg(res.data.data.markHour)
    }

    return (
        <>
            <Div className="form">
                <div className="content">
                    <select name="produtos" id="produtos" onChange={e => !!e.target.value.trim() ? produto = e.target.value : e.target.value = produto}>
                        <option value=""></option>
                        <option value="FlaFlu">FlaFlu</option>
                        <option value="PingPong">PingPong</option>
                    </select><br />
                    {!!horarios && horarios.map(hora =>
                        <button key={hora.hora} onClick={e => confirmHour(e.target.innerHTML)}>
                            {hora.hora}
                        </button>
                    )}
                    <button className='confirm' onClick={e => markHour(e.target.value)}></button>
                </div>
            </Div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{ start: 'today', right: 'next' }}
                validRange={{ start: Date.now() }}
                dateClick={e => {
                    if (!produto) return ErrorMsg('Selecione um produto antes')

                    dia = e.dateStr
                    getHours(produto, dia)
                }}
            />
        </>
    )
}