import React from 'react'

function ConnectionStatus(props) {

    const status = props.connected ? 'Connected' : 'Disconnected';
    return (
        <div className="connectionStatus">
            <strong>Status:</strong> {status}
        </div>
    )
}

export default ConnectionStatus
