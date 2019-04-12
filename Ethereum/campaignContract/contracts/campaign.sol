pragma solidity ^0.4.17; //Specifies version of Solidity

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    //createCampaign method, creates and deploys a new campaign contract
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    //getDeployedCampaigns method, returns list of all deployed campaigns
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    //Struct - Definitions
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    //Variables
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    
    //Modifiers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    //constructor, save the contract creator as the manager
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    //contribute method, payable, require contribution, add to approvers
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    //createRequest method, creates request struct and adds it to request array
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    //approveRequest method, approves a specific request if user is approver
    function approveRequest(uint index) public {
        Request storage request = requests[index]; //Grab specific request
        require(approvers[msg.sender]); //Check person is a donator
        require(!request.approvals[msg.sender]); //Check person has not voted
        
        request.approvalCount++; //Increment the number of approved votes
        request.approvals[msg.sender] = true; //Make sure person is counted as having voted
    }
    
    //finalizeRequest method, confirms approving request and sends money
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index]; //Grab specific request
        require(!request.complete);//Make sure requests is not complete
        require(request.approvalCount > (approversCount / 2)); //Make sure half of approvers approve the request
       
        request.recipient.transfer(request.value); //Send to the recipient the value of the request
        request.complete = true; //Mark the requests as complete
    }
    
    
}