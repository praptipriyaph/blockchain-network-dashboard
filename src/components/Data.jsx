import React from 'react';
import { Link } from 'react-router-dom';
import './Data.css'; // Import CSS file for styling

function Data() {
    // Dummy data for device info
    const switches = [
        { switch_id: 1, name: 'Switch 1', ip_address: '192.168.1.1', rule_count: 5 },
        { switch_id: 2, name: 'Switch 2', ip_address: '192.168.1.2', rule_count: 3 },
        { switch_id: 3, name: 'Switch 3', ip_address: '192.168.1.3', rule_count: 7 }
    ];

    // Dummy data for flow info
    const flows = [
        [
            { rule_id: 1, inport: 'eth0', src_mac: '00:11:22:33:44:55', dst_mac: 'aa:bb:cc:dd:ee:ff', priority: 'high', outport: 'eth1' },
            { rule_id: 2, inport: 'eth1', src_mac: 'aa:bb:cc:dd:ee:ff', dst_mac: '00:11:22:33:44:55', priority: 'low', outport: 'eth0' }
        ],
        [], // Placeholder for Switch 2
        []  // Placeholder for Switch 3
    ];

    return (
        <div className="data-page">
            <header className="header">
                <h1>SDN Network Dashboard</h1>
                <div className="header-actions">
                    <Link to="/">Blockchain Info.</Link>
                </div>
            </header>

            <section className="device-info-container">
                <h1 className="section-heading">Device Info</h1>
                <div className="device-info">
                    {switches.map((switchData, index) => (
                        <div key={index} className="device-card">
                            <h3>{switchData.name}</h3>
                            <p><strong>Switch ID:</strong> {switchData.switch_id}</p>
                            <p><strong>IP Address:</strong> {switchData.ip_address}</p>
                            <p><strong>Rule Count:</strong> {switchData.rule_count}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flow-info-container">
                <h1 className="section-heading">Flow Info</h1>
                <div className="switch-flow-container">
                    {switches.map((switchData, index) => (
                        <div key={index} className="switch-flow-card">
                            <h3>{switchData.name}</h3>
                            <ul>
                                {flows[index].map((flow, idx) => (
                                    <li key={idx}>
                                        <strong>Rule ID:</strong> {flow.rule_id}<br />
                                        <strong>Inport:</strong> {flow.inport}<br />
                                        <strong>Src MAC:</strong> {flow.src_mac}<br />
                                        <strong>Dst MAC:</strong> {flow.dst_mac}<br />
                                        <strong>Priority:</strong> {flow.priority}<br />
                                        <strong>Outport:</strong> {flow.outport}<br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Data;
