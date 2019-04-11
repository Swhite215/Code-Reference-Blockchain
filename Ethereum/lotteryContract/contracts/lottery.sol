pragma solidity ^0.4.17; //Specifies version of Solidity

contract Lottery {
    //Type -> Visibility -> Name
    address public manager;
    address[] public players;
    
    function Lottery() public {
        //Utilize msg global variable to get sender address
        manager = msg.sender;
    }
    
    //enter method, player must provide ether = payable type
    function enter() public payable {
        require(msg.value > .01 ether); //Evaluates to true - keeps running, or false - ends execution
        
        //utilize msg global variable to get sender address
        players.push(msg.sender);
    }
    
    //pickWinner method, restricted to manager with modifier, sends full balance to random player and clears players
    function pickWinner() public restricted {
        uint index = random() % players.length; //Generate a pseudorandom number
        players[index].transfer(this.balance); //A player address, transfer all the contracts money
        players = new address[](0); //Set players array equal to new empty address array with initial size of 0
    }
    
    //getPlayers method, returns all players addresses
    function getPlayers() public view returns(address[]) {
        return players;
    }
    
    //Helper Functions and Modifiers
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    //modifier name, _; indicates where extra code will be placed
    modifier restricted() {
        require(msg.sender == manager);//Check if caller is the manager
        _; //
    }
    
}
