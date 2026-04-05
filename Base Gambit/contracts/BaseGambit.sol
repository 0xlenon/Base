// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BaseGambit
 * @dev Fully on-chain chess tournament and competition protocol.
 */
contract BaseGambit is ReentrancyGuard, Ownable {
    
    enum GameStatus { WAITING, ACTIVE, COMPLETED, CANCELLED }

    struct Game {
        uint256 id;
        address whitePlayer;
        address blackPlayer;
        uint256 entryFee;
        uint256 prizePool;
        GameStatus status;
        address winner;
        string lastFen; // Store the last FEN for on-chain verification if needed
    }

    uint256 public nextGameId;
    mapping(uint256 => Game) public games;
    mapping(address => uint256) public eloRatings;
    
    event GameCreated(uint256 indexed gameId, address indexed creator, uint256 entryFee);
    event GameJoined(uint256 indexed gameId, address indexed joiner);
    event GameEnded(uint256 indexed gameId, address indexed winner, uint256 prize);
    event EloUpdated(address indexed player, uint256 newElo);

    constructor() Ownable(msg.sender) {
        nextGameId = 1;
    }

    /**
     * @dev Create a new game with an entry fee.
     */
    function createGame(uint256 _entryFee) external payable {
        require(msg.value == _entryFee, "Incorrect entry fee sent");
        
        uint256 gameId = nextGameId++;
        games[gameId] = Game({
            id: gameId,
            whitePlayer: msg.sender,
            blackPlayer: address(0),
            entryFee: _entryFee,
            prizePool: msg.value,
            status: GameStatus.WAITING,
            winner: address(0),
            lastFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        });

        emit GameCreated(gameId, msg.sender, _entryFee);
    }

    /**
     * @dev Join an existing game.
     */
    function joinGame(uint256 _gameId) external payable {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.WAITING, "Game is not waiting");
        require(msg.value == game.entryFee, "Incorrect entry fee sent");
        require(game.whitePlayer != msg.sender, "Cannot play against yourself");

        game.blackPlayer = msg.sender;
        game.prizePool += msg.value;
        game.status = GameStatus.ACTIVE;

        emit GameJoined(_gameId, msg.sender);
    }

    /**
     * @dev Report the winner of a game. In a real scenario, this would be validated by GameLogic.sol
     * or a decentralized judge system. For this MVP, we use a simplified version.
     */
    function endLevel(uint256 _gameId, address _winner) external onlyOwner {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.ACTIVE, "Game is not active");
        require(_winner == game.whitePlayer || _winner == game.blackPlayer, "Invalid winner");

        game.status = GameStatus.COMPLETED;
        game.winner = _winner;

        uint256 prize = game.prizePool;
        game.prizePool = 0;

        (bool success, ) = payable(_winner).call{value: prize}("");
        require(success, "Transfer failed");

        // Update ELO (Simplified)
        eloRatings[_winner] += 15;
        address loser = (_winner == game.whitePlayer) ? game.blackPlayer : game.whitePlayer;
        if (eloRatings[loser] >= 10) {
            eloRatings[loser] -= 10;
        }

        emit GameEnded(_gameId, _winner, prize);
        emit EloUpdated(_winner, eloRatings[_winner]);
        emit EloUpdated(loser, eloRatings[loser]);
    }

    /**
     * @dev Get player ELO rating.
     */
    function getElo(address _player) external view returns (uint256) {
        return eloRatings[_player] == 0 ? 1000 : eloRatings[_player];
    }
}
