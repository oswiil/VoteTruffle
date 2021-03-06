// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title Urnas
 * @dev Implements voting process along with vote delegation
 */
contract Urnas {
    struct Votante {
        uint256 weight; // vote value
        address addres; // adress wallet
        bool voted; // id de votacion. if true, that person already voted
    }

    struct Votacion {
        // If you can limit the length to a certain number of bytes,
        // always use one of bytes1 to bytes32 because they are much cheaper
        uint256 id; // hash
        bytes32 name; // short name (up to 32 bytes)
        bytes debate;
        bytes32[] candidatos; // Array de int
        uint256 voteCount;
    }

    struct Urna {
        uint256 id; // id votacion
        uint256 si;
        uint256 no;
        uint256 abstencion;
        address[] addresses;
    }

    address public chairperson;
    uint256 randNonce = 0;
    mapping(uint256 => Urna) public urnas;
    mapping(address => Votante) public votantes;
    // mapping(address => Votacion) public votaciones;
    mapping(uint256 => Votacion) public votaciones;
    uint256[] ids;
    bytes32[] names;
    Votacion[] proposals;
    Urna[] urna;

    // Votacion[] proposals;

    // Votacion[] public votaciones;

    /**
     * @dev Return the list of options of the porposal.
     * @param _id id of porposal
     * @param _name name of porposal
     * @param _candidatos name of porposal
     */
    function crearVotacion(
        uint256 _id,
        bytes32 _name,
        bytes memory _debate,
        bytes32[] memory _candidatos
    ) public {
        votaciones[_id].id = _id;
        votaciones[_id].name = _name;
        votaciones[_id].debate = _debate;
        votaciones[_id].candidatos = _candidatos;
        ids.push(_id);
        names.push(_name);
        proposals.push(
            Votacion({
                id: _id,
                name: _name,
                debate: _debate,
                candidatos: _candidatos,
                voteCount: 0
            })
        );

        // votantes[chairperson].weight = 1;
        // 'Proposal({...})' creates a temporary
        // Proposal object and 'proposals.push(...)'
        // appends it to the end of 'proposals'.
    }

    // function showVotacion(uint256 _id) public view returns (Votacion memory) {
    //     return votaciones[_id];
    // }

    function showVotacion(uint256 _id) public view returns (Votacion memory) {
        return proposals[_id];
    }

    // function showVotaciones() public view returns (Votacion[] memory) {
    //     return votaciones;
    // }

    function showIds() public view returns (uint256[] memory id) {
        return ids;
    }

    function showNames() public view returns (bytes32[] memory name) {
        return names;
    }

    function vote(uint256 proposal, uint256 weigth) public {
        Votante storage sender = votantes[msg.sender];
        sender.voted = true;
        sender.weight = weigth;
        urnas[proposal].id = proposal;
        if (weigth == 0) {
            urnas[proposal].si += 1;
            urnas[proposal].no += 0;
            urnas[proposal].abstencion += 0;
        } else if (weigth == 1) {
            urnas[proposal].si += 0;
            urnas[proposal].no += 1;
            urnas[proposal].abstencion += 0;
        } else if (weigth == 2) {
            urnas[proposal].si += 0;
            urnas[proposal].no += 0;
            urnas[proposal].abstencion += 1;
        }
        urnas[proposal].addresses.push(msg.sender);
        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
    }

    function getVotes(uint256 proposal)
        public
        view
        returns (Urna memory results_)
    {
        return urnas[proposal];
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 v = 0; v < proposals.length; v++) {
            if (votaciones[v].voteCount > winningVoteCount) {
                winningVoteCount = votaciones[v].voteCount;
                winningProposal_ = v;
            }
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

    // /**
    //  * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
    //  * @return winnerName_ the name of the winner
    //  */
    // function winnerName() public view returns (bytes32 winnerName_) {
    //     winnerName_ = votaciones[winningProposal()].name;
    // }
}
