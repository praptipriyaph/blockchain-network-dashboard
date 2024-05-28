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
        { rule_id: 1, inport: 'eth0', src_mac: '00:11:22:33:44:55', dst_mac: 'aa:bb:cc:dd:ee:ff', priority: 'high', outport: 'eth1' },
        { rule_id: 2, inport: 'eth1', src_mac: 'aa:bb:cc:dd:ee:ff', dst_mac: '00:11:22:33:44:55', priority: 'low', outport: 'eth0' }
    ];



    return (
        <div className="data-page">
            <header className="header">
                <h1>SDN Network Dashboard</h1>
                <div className="header-actions">
                    <Link to="/">Blockchain Info.</Link>
                    
                </div>
            </header>

            <section className="device-info">
                <h2>Device Info</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Switch ID</th>
                            <th>Name</th>
                            <th>IP Address</th>
                            <th>Rule Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {switches.map((switchData, index) => (
                            <tr key={index}>
                                <td>{switchData.switch_id}</td>
                                <td>{switchData.name}</td>
                                <td>{switchData.ip_address}</td>
                                <td>{switchData.rule_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


            <section className="flow-info">
                <h2>Flow Info</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rule ID</th>
                            <th>Inport</th>
                            <th>Src MAC</th>
                            <th>Dst MAC</th>
                            <th>Priority</th>
                            <th>Outport</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flows.map((flowData, index) => (
                            <tr key={index}>
                                <td>{flowData.rule_id}</td>
                                <td>{flowData.inport}</td>
                                <td>{flowData.src_mac}</td>
                                <td>{flowData.dst_mac}</td>
                                <td>{flowData.priority}</td>
                                <td>{flowData.outport}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Data;
