pragma solidity ^0.8.12;
// SPDX-License-Identifier: Campaign
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
}
contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    uint256 numRequests = 0;
    mapping (uint256 => Request) public requests;

    modifier restricted {
        require(msg.sender == manager);
        _;
    }
    modifier enoughMoney {
        require(msg.value > minimumContribution);
        _;
    }
    mapping(uint => Request) public approvals;

    constructor(uint _minimum, address creator) {
        manager = creator;
        minimumContribution = _minimum;
    }
    function contribute() public payable enoughMoney {
        approvers[msg.sender] = true;
        approversCount++;
    }
    function creatRequest(
        string memory _description, 
        uint _value, 
        address payable _recipient) 
    restricted payable public {
        require(approvers[msg.sender]);
        Request storage request = requests[numRequests];
        numRequests++;
        request.description = _description;
        request.value = _value;
        request.recipient = _recipient;
        request.complete = false;
        request.approvalCount =  0;
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount >= (approversCount / 2));
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}