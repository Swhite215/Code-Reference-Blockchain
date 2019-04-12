pragma solidity ^0.4.17; //Specifies version of Solidity

contract Campaign {
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    
    //On initialization, save the contract creator as the manager
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    //Payable, expecting some money possible w/ require of minimum
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers.push(msg.sender);
    }
}