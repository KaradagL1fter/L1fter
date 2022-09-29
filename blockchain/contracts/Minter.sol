// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract L1fter is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;
uint256 public maxSupply=10000;
    bool public publicMintOpen=false;
    bool public allowListMintOpen=false;
    mapping(address => bool) public allowList;
    mapping(uint256 => string) _tokenURIs;
    struct RenderToken {
    uint256 id;
    string uri;
  }
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("L1fter", "L1FT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/";
    }
   function _setTokenURI(uint256 tokenId,string memory _tokenURI )internal {
       _tokenURIs[tokenId] = _tokenURI;
   }
   function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
       require(_exists(tokenId));
       string memory _tokenURI = _tokenURIs[tokenId];
       return _tokenURI;
   }
   function getAllTokens() public view returns (RenderToken[] memory) {
    uint256 lastestId = _tokenIdCounter.current();
    uint256 counter = 0;
    RenderToken[] memory res = new RenderToken[](lastestId);
    for (uint256 i = 0; i < lastestId; i++) {
      if (_exists(counter)) {
        string memory uri = tokenURI(counter);
        res[counter] = RenderToken(counter, uri);
      }
      counter++;
    }
    return res;
  }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function allowListMint(string memory uri, uint256 _mintAmount) public payable  {
        require(allowListMintOpen,  "Allowlist mint closed");
        require(allowList[msg.sender],"You are not on the allow list");
        
        require(totalSupply()< maxSupply,"Sorry we are sold out");
        if (msg.sender!=owner()){
            require(msg.value == _mintAmount*(1000000000000000) ,"Not enough funds");
        }
        for (uint256 i=1; i<=_mintAmount;i++){
            uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId,uri);
        }
        
        
    }
    function publicMint(string memory uri, uint256 _mintAmount) public payable returns (uint256){
        require(publicMintOpen,"public mint closed");
        require(totalSupply() + _mintAmount< maxSupply,"Sorry we are sold out");
        if (msg.sender!=owner()){
            require(msg.value == _mintAmount*(100000000000000) ,"Not enough funds");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId,uri);
        return tokenId;
    }
    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }
    function editMintWindows(
        bool _publicMintOpen,
        bool _allowListMintOpen
    ) external onlyOwner {
        publicMintOpen = _publicMintOpen;
        allowListMintOpen = _allowListMintOpen;
    }
    function setAllowList(address[] calldata addresses) external onlyOwner {
        for(uint256 i =0; i<addresses.length;i++){
            allowList[addresses[i]]=true;
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
