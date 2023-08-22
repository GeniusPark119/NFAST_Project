// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Nfast.sol";
import "./Sale.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SaleFactory is Ownable {
    address public admin;
    address[] public sales = [address(0)];

    address private nftAddress;
    address private tokenAddress;

    event NewSale(address indexed _saleContract, address indexed _owner, uint256 indexed _workId);

    constructor(address _nftAddress, address _tokenAddress) {
        admin = msg.sender;
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
    }

    function createAllSale(uint256[] calldata _nftIds, uint256 _price, uint256 _startTime, uint256 _endTime)
    public
    returns (bool)
    {
        for (uint256 i = 0; i < _nftIds.length; i++) {
            createSale(_nftIds[i],_price,_startTime,_endTime);
        }
        return true;
    }

    function createSale(uint256 _nftId, uint256 _price, uint256 _startTime, uint256 _endTime)
    public
    returns (address) {
        address seller = msg.sender;
        require(Nfast(nftAddress).ownerOf(_nftId) == seller,"only owner can create sale.");

        // 사장인지 거래인지 구분
        bool isStore = false;
        if (Nfast(nftAddress).getStoreAddress(_nftId) == seller) isStore = true;
        
        Sale newSale = new Sale(_nftId, _price, isStore, _startTime, _endTime, tokenAddress, nftAddress, seller ,address(this));
        sales.push(address(newSale));

        emit NewSale(address(newSale), seller, _nftId);
        return address(newSale);
    }

    function getNftAddress()
    public
    view
    returns (address)
    {
        return nftAddress;
    }

    function getTokenAddress()
    public
    view
    returns (address)
    {
        return tokenAddress;
    }
    function allSales()
    public
    view
    returns (address[] memory) {
        return sales;
    }
    function getSale(uint _nftId)
    public
    view
    returns (address) {
        return sales[_nftId];
    }
}
