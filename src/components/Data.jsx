import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Data.css'; // Import CSS file for styling
import Web3 from 'web3'; // Import Web3.js
import myContractABI from '../../build/contracts/MyContract.json'; // Import the ABI JSON file for your smart contract

const web3 = new Web3('http://localhost:8545'); // Connect to your local blockchain node
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your smart contract address
const abi = myContractABI.abi; // Extract ABI from the imported JSON file

function Data() {
    const [switches, setSwitches] = useState([]);
    const [flows, setFlows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const contract = new web3.eth.Contract(abi, contractAddress);

                // Get switch count
                const switchCount = await contract.methods.switch_count().call();

                // Fetch switch data
                const switchData = [];
                for (let i = 1; i <= switchCount; i++) {
                    const switchInfo = await contract.methods.getSwitch(i).call();
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
                for (const switchInfo of switchData) {
                    const switchFlows = [];
                    const ruleCount = switchInfo.rule_count;
                    for (let i = 1; i <= ruleCount; i++) {
                        const flowInfo = await contract.methods.getRule(switchInfo.switch_id, i).call();
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
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
