pragma solidity ^0.4.17; //Specifies version of Solidity

contract Campaign {
    address public manager;
    unint public minimumContribution;
    address[] public approvers;
    
    //On initialization, save the contract creator as the manager
    function Campaign(unint minimum) public {
        manager = msg.sender;
        minimumContribution = 
    }
}