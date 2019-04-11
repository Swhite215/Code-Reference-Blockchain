pragma solidity ^0.4.17; //Specifies version of Solidity

contract Inbox { //Definition of contract class
    string public message; //Variable declaration and their types, also generates get method
    
    //Contract Member - Same Name, Constructor, Called Once
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    //Contract Member
    function setMessage(string newMessage) public {
        message = newMessage;
    }

}

