// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title Urnas
 * @dev Implements voting process along with vote delegation
 */
contract Urnas {
    struct Votante {
        address addres;
        bool voted; // if true, that person already voted
        uint256 weight;
        uint256 vote; // index of the voted proposal
        uint256 option; //index of candidate choosen
    }

    struct Votacion {
        // If you can limit the length to a certain number of bytes,
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 id; //
        bytes32 name; // short name (up to 32 bytes)
        uint256 voteCount; // number of accumulated votes
        bytes32[] candidatos;
    }

    address public chairperson;
    mapping(address => Votante) public votantes;
    Votacion[] public votaciones;

    /**
     * @dev Return the list of options of the porposal.
     * @param name name of porposal
     * @param candidatos name of porposal
     */
    function crearVotacion(bytes32 name, bytes32[] memory candidatos) public {
        uint256 voteCount;

        chairperson = msg.sender;
        bytes32 id_ = bytes32(keccak256(abi.encodePacked(msg.sender)));

        votantes[chairperson].weight = 1;
        // 'Proposal({...})' creates a temporary
        // Proposal object and 'proposals.push(...)'
        // appends it to the end of 'proposals'.
        for (uint256 i = 0; i < votaciones.length; i++) {
            votaciones.push(
                Votacion({
                    id: id_,
                    name: name,
                    voteCount: 0,
                    candidatos: candidatos
                })
            );
        }
    }

    /**
     * @dev Return the list of options of the porposal.
     * @param nombreVotacion address of voter
     */
    function getCandidatos(bytes32 nombreVotacion)
        public
        view
        returns (bytes32[] memory opciones)
    {
        for (uint256 i = 0; i < votaciones.length; i++) {
            if (votaciones[i].name == nombreVotacion) {
                Votacion storage sender = votaciones[i];
                opciones = sender.candidatos;
            }
        }
    }

    /**
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param votacion address of voter
     */
    function getVotacion(uint256 votacion)
        public
        view
        returns (
            bytes32 nombreVotacion,
            uint256 voteCount,
            bytes32[] memory candidatos
        )
    {
        nombreVotacion = votaciones[votacion].name;
        voteCount = votaciones[votacion].voteCount;
        candidatos = votaciones[votacion].candidatos;

        return (nombreVotacion, voteCount, candidatos);
    }

    /**
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param votante address of voter
     */
    function giveRightToVote(address votante) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(!votantes[votante].voted, "The voter already voted.");
        require(votantes[votante].weight == 0);
        votantes[votante].weight = 1;
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param votacion index of proposal in the proposals array
     */

    function vote(uint256 votacion, uint256 opcion) public {
        Votante storage sender = votantes[msg.sender];
        require(sender.weight != 0, "No tienes permiso para votar.");
        require(!sender.voted, "Ya has votado.");
        sender.voted = true;
        sender.vote = votacion;
        sender.option = opcion;
        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        votaciones[votacion].voteCount += sender.weight;
    }

    /**
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 v = 0; v < votaciones.length; v++) {
            if (votaciones[v].voteCount > winningVoteCount) {
                winningVoteCount = votaciones[v].voteCount;
                winningProposal_ = v;
            }
        }
    }

    /**
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = votaciones[winningProposal()].name;
    }
}
