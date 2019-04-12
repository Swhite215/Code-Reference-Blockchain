pragma solidity ^0.4.17; //Specifies version of Solidity

contract Campaign {
    //Struct - Definitions
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    
    //Variables
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;
    
    //Modifiers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    //constructor, save the contract creator as the manager
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    //contribute method, payable, require contribution, add to approvers
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers.push(msg.sender);
    }
    
    //createRequest method, creates request struct and adds it to request array
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false
        });
        
        requests.push(newRequest);
    }
}