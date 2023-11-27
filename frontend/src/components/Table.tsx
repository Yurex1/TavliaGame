import React from 'react'

function Schore() {
    return(<div className="schore">
        <div>White: +5</div>
        <div>Time: +5</div>
    </div>);
}

function History() {
    return(<div className="history">
        <div>HHH</div>
        <div>EEE</div>
    </div>);
}

export default function Table() {
    return(
        <div className="table">
            <div className="row">
                <Schore />
                <Schore />
            </div>
            <div className="HISTORY">History:</div>
            <div className="row">
                <History />
                <History />
            </div>
        </div>
    )
}