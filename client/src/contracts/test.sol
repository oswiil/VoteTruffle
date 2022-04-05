// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title Urnas
 * @dev Implements voting process along with vote delegation
 */
contract Urnas {
    struct Voto {
        address id_Votante; // address candidato
        bytes32 id_Votacion; // hash votacion
        int32 weigth; // candidato elegido
    }

    struct Votante {
        address addres; // adress wallet
        bytes32[] voted; // id de votacion + if true, that person already voted
        uint256 weight; // vote value
    }

    struct Votacion {
        // If you can limit the length to a certain number of bytes,
        // always use one of bytes1 to bytes32 because they are much cheaper
        uint256 id; // hash
        bytes32 name; // short name (up to 32 bytes)
        bytes32[] candidatos; // Array de int
    }

    address public chairperson;
    mapping(address => Votante) public votantes;
    mapping(uint256 => Votacion) votacionById;
    Votacion[] public votaciones;

    /**
     * @dev Return the list of options of the porposal.
     * @param name name of porposal
     * @param candidatos name of porposal
     */
    function crearVotacion(bytes32 name, bytes32[] memory candidatos) public {
        chairperson = msg.sender;
        uint256 id_ = uint256(keccak256(abi.encodePacked(msg.sender)));
        Votacion memory votacionTest;
        votacionTest.id = id_;
        votacionTest.name = name;
        votacionTest.candidatos = candidatos;
        votaciones.push(votacionTest);
        // votantes[chairperson].weight = 1;
        // 'Proposal({...})' creates a temporary
        // Proposal object and 'proposals.push(...)'
        // appends it to the end of 'proposals'.
    }

    event FCalled(Votacion _a);

    function showAllVotaciones() public {
        for (uint256 i = 0; i < votaciones.length; i++) {
            emit FCalled(votaciones[i]);
        }
    }
    // function getData()
    //     external
    //     view
    //     returns (bytes32 name, bytes32[] memory candidatos)
    // {
    //     for (uint256 i = 0; i < votaciones.length;  {
    //         Votacion memory votacion = votaciones[i];
    //         votacion.name = name;
    //         votacion.candidatos = candidatos;

    //         return (name, candidatos);
    //     }
    // }

    // /**
    //  * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
    //  * @param candidatos data de la votacion
    //  */
    // function getVotacion(bytes32 votacionHash)
    //     public
    //     view
    //     returns (bytes32[] memory candidatos)
    // {
    //     for (uint256 i = 0; i < votaciones.length; i++) {
    //         if (votaciones[i].id == votacionHash) {
    //             Votacion storage sender = votaciones[i];

    //             candidatos = sender.candidatos;
    //         }
    //     }

    //     return (candidatos);
    // }

    // /**
    //  * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
    //  * @param votante address of voter
    //  */
    // function giveRightToVote(address votante) public {
    //     require(
    //         msg.sender == chairperson,
    //         "Only chairperson can give right to vote."
    //     );
    //     require(!votantes[votante].voted, "The voter already voted.");
    //     require(votantes[votante].weight == 0);
    //     votantes[votante].weight = 1;
    // }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param votacion index of proposal in the proposals array
     */

    // function vote(bytes32[] calldata votacion, uint256 weight) public {
    //     Votante storage sender = votantes[msg.sender];
    //     require(sender.weight != 0, "No tienes permiso para votar.");

    //     sender.Votacion[1] = votacion;
    //     sender.weight = weight;
    //     // If 'proposal' is out of the range of the array,
    //     // this will throw automatically and revert all
    //     // changes.
    //     votaciones[votacion].voteCount += sender.weight;
    // }

    // /**
    //  * @dev Computes the winning proposal taking all previous votes into account.
    //  * @return winningProposal_ index of winning proposal in the proposals array
    //  */
    // function winningProposal() public view returns (uint256 winningProposal_) {
    //     uint256 winningVoteCount = 0;
    //     for (uint256 v = 0; v < votaciones.length; v++) {
    //         if (votaciones[v].voteCount > winningVoteCount) {
    //             winningVoteCount = votaciones[v].voteCount;
    //             winningProposal_ = v;
    //         }
    //     }
    // }

    // /**
    //  * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
    //  * @return winnerName_ the name of the winner
    //  */
    // function winnerName() public view returns (bytes32 winnerName_) {
    //     winnerName_ = votaciones[winningProposal()].name;
    // }
}
