// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {

    struct Flow_info {
        uint rule_id;
        string inport;
        string src_mac;
        string dst_mac;
        string priority;
        string outport;
    }

    struct Switch {
        uint256 id;
        string name;
        string ip_address;
        uint rule_count;
        mapping(uint => Flow_info) rules;
    }

    mapping(uint => Switch) public switches;
    uint public switch_count = 0;

    uint public constant T = 5;
    uint public constant F = 1;

    constructor() {
        addSwitch(1, "S1", "192.168.128.3");
    }

    function addSwitch(uint switch_id, string memory _name, string memory _ip_address) public {
        switch_count++;
        Switch storage newSwitch = switches[switch_id];
        newSwitch.id = switch_id;
        newSwitch.name = _name;
        newSwitch.ip_address = _ip_address;
        newSwitch.rule_count = 0;
    }

    function getSwitch(uint _switch_id) view public returns (uint, string memory, string memory, uint) {
        Switch storage s = switches[_switch_id];
        return (s.id, s.name, s.ip_address, s.rule_count);
    }

    function addRule(
        uint _switch_id, 
        string memory _inport, 
        string memory _src_mac, 
        string memory _dst_mac, 
        string memory _priority, 
        string memory _outport
    ) public {
        Switch storage s = switches[_switch_id];
        s.rule_count++;
        s.rules[s.rule_count] = Flow_info(s.rule_count, _inport, _src_mac, _dst_mac, _priority, _outport);
    }

    function getRule(uint _switch_id, uint _rule_id) view public returns (
        uint, 
        string memory, 
        string memory, 
        string memory, 
        string memory, 
        string memory
    ) {
        Flow_info storage r = switches[_switch_id].rules[_rule_id];
        return (r.rule_id, r.inport, r.src_mac, r.dst_mac, r.priority, r.outport);
    }

    function getRuleCount(uint _switch_id) view public returns(uint) {
        return switches[_switch_id].rule_count;
    }

    function verifyFlowRules(
        uint _switch_id, 
        string memory _INPORT, 
        string memory _SRC, 
        string memory _DST, 
        string memory _priority, 
        string memory _OUTPORT
    ) view public returns(uint) {
        uint n = getRuleCount(_switch_id);

        for (uint i = 1; i <= n; i++) {
            Flow_info storage r = switches[_switch_id].rules[i];
            if (
                compareStrings(r.inport, _INPORT) &&
                compareStrings(r.src_mac, _SRC) &&
                compareStrings(r.dst_mac, _DST) &&
                compareStrings(r.priority, _priority) &&
                compareStrings(r.outport, _OUTPORT)
            ) {
                return T;
            }
        }
        return F;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }
}
