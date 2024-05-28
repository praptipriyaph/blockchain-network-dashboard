import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Data.css'; // Import CSS file for styling
import Web3 from 'web3'; // Import Web3 library
import MyContract from '../../build/contracts/MyContract.json'; // Import ABI of the smart contract

function Data() {
    const [switches, setSwitches] = useState([]);
    const [flows, setFlows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Connect to Web3 provider
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            // Retrieve the deployed contract instance
            const contractInstance = new web3.eth.Contract(MyContract.abi, 'CONTRACT_ADDRESS');
            
            // Fetch switch data
            const switchCount = await contractInstance.methods.switch_count().call();
            const switchData = [];
            for (let i = 1; i <= switchCount; i++) {
                const switchInfo = await contractInstance.methods.getSwitch(i).call();
                switchData.push({
                    switch_id: switchInfo[0],
                    name: switchInfo[1],
                    ip_address: switchInfo[2],
                    rule_count: switchInfo[3]
                });
            }
            setSwitches(switchData);

            // Fetch flow data
            const flowData = [];
            for (let i = 0; i < switchCount; i++) {
                const flowCount = await contractInstance.methods.getRuleCount(i + 1).call();
                const switchFlows = [];
                for (let j = 1; j <= flowCount; j++) {
                    const flowInfo = await contractInstance.methods.getRule(i + 1, j).call();
                    switchFlows.push({
                        rule_id: flowInfo[0],
                        inport: flowInfo[1],
                        src_mac: flowInfo[2],
                        dst_mac: flowInfo[3],
                        priority: flowInfo[4],
                        outport: flowInfo[5]
                    });
                }
                flowData.push(switchFlows);
            }
            setFlows(flowData);
        };

        fetchData();
    }, []);

    return (
        <div className="data-page">
            <header className="header">
                <h1>SDN Network Dashboard</h1>
                <div className="header-actions">
                    <Link to="/">Blockchain Info.</Link>
                </div>
            </header>

            <section className="device-info-container">
                <h1 className="section-heading">Devices</h1>
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
                    {switches.map((_, index) => (
                        <div key={index} className="switch-flow-card">
                            <h3>{switches[index].name}</h3>
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
