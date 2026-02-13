// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract WagmiClinicSBT is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;

    // Struct to store patient data
    struct Diagnosis {
        string status; // e.g. "CRITICAL"
        string score;  // e.g. "32"
        string roast;  // e.g. "Paper Hands"
        uint256 date;
    }

    mapping(uint256 => Diagnosis) public patientRecords;

    // A cool generic cyberpunk card image (hosted on imgur)
    string constant IMAGE_URL = "https://i.imgur.com/3PXR3nD.jpeg";

    constructor() ERC721("Wagmi Clinic Patient", "WAGMI") Ownable(msg.sender) {}

    // Mint Function - Takes the data strings
    function mintDiagnosis(string memory _status, string memory _score, string memory _roast) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        patientRecords[tokenId] = Diagnosis({
            status: _status,
            score: _score,
            roast: _roast,
            date: block.timestamp
        });
    }

    // The Magic: Generating the JSON on-chain
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        Diagnosis memory record = patientRecords[tokenId];

        // Build the JSON parts
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Wagmi Patient #', tokenId.toString(), '",',
                '"description": "Official Medical Record from Wagmi Clinic. Diagnosis: ', record.roast, '",',
                '"image": "', IMAGE_URL, '",',
                '"attributes": [',
                    '{ "trait_type": "Status", "value": "', record.status, '" },',
                    '{ "trait_type": "Health Score", "value": "', record.score, '" },',
                    '{ "trait_type": "Diagnosis", "value": "', record.roast, '" }',
                ']',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    // Soulbound: Block Transfers
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Dr. Wagmi says: This medical record is non-transferable.");
        }
        return super._update(to, tokenId, auth);
    }
}