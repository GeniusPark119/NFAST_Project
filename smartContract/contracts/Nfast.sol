// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nfast is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;
    //URI에 들어가는 정보
    //{가게 주소, 초기값, 사용가능날짜, 가게이름}이 포함된 ipfs 주소
    mapping(uint256 => string) tokenURIs;
    //사용여부
    mapping(uint256 => bool) isUse;
    //가게 주소
    mapping(uint256 => address) storeAddress;
    //사용가능날짜
    mapping(uint256 => uint256) date;
    //시작시간
    mapping(uint256 => uint256) startTime;
    //종료시간
    mapping(uint256 => uint256) endTime;
    //점심, 저녁 구분
    mapping(uint256 => bool) mealType;
    //초기값
    mapping(uint256 => uint256) price;
    //수수료
    mapping(uint256 => uint) charge;
    //판매 관리 객체
    address private _saleFactoryAddress;


    event CreateAll(address indexed _store, uint256[] tokenIds);

    constructor(string memory name_, string memory symbol_)
    ERC721(name_, symbol_)
    {
    }

    function current() public view returns (uint256) {
        return tokenIds.current();
    }

    function setSaleFactoryAddress(address saleFactoryAddress) public {
        _saleFactoryAddress = saleFactoryAddress;
    }

    // 이건 SaleFactory 객체에서 이용하기 위해 생성
    function approveSaleFactory(address owner) public {
        _setApprovalForAll(owner, _saleFactoryAddress, true);
    }

    function create(address _to, string memory _tokenURI, address _storeAddress, uint256 _date, bool _mealType, uint256 _startTime, uint256 _endTime, uint256 _price, uint _charge)
    public
    returns (uint256)
    {

        tokenIds.increment();
        uint256 newTokenId = tokenIds.current();
        _mint(msg.sender, newTokenId);

        tokenURIs[newTokenId] = _tokenURI;
        isUse[newTokenId] = false;
        storeAddress[newTokenId] = _storeAddress;
        date[newTokenId] = _date;
        startTime[newTokenId] = _startTime;
        endTime[newTokenId] = _endTime;
        mealType[newTokenId] = _mealType;
        price[newTokenId] = _price;
        charge[newTokenId] = _charge;

        return newTokenId;
    }

    function approveAndTransfer(address _from, address _to, uint256 _tokenId) public {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "ERC721: transfer caller is not owner nor approved");

        _approve(_to, _tokenId);
        transferFrom(_from, _to, _tokenId);
    }

    function createAll(uint256 _numTokens, address  _to, string  calldata _tokenURI, address  _storeAddress, uint256  _date, bool  _mealType, uint256  _startTime, uint256  _endTime, uint256  _price, uint256  _charge
    )
    public
    returns (uint256[] memory) {
        require(_numTokens > 0, "Number of tokens must be greater than zero");

        uint256[] memory returnTokenIds = new uint256[](_numTokens);

        for (uint256 i = 0; i < _numTokens; i++) {
            returnTokenIds[i] = create(
                _to,
                _tokenURI,
                _storeAddress,
                _date,
                _mealType,
                _startTime,
                _endTime,
                _price,
                _charge
            );
        }

        emit CreateAll(_storeAddress,returnTokenIds);
        return returnTokenIds;
    }

    function _burn(uint256 _tokenId)
    internal
    virtual
    override {
        super._burn(_tokenId);
    }

    function setIsUse(uint256 _tokenId)
    public
    onlyNotUse(_tokenId) {
        isUse[_tokenId] = true;
    }

    function getTokenURI(uint256 _tokenId)
    public
    view
    returns (string memory)
    {
        return tokenURIs[_tokenId];
    }

    function getIsUse(uint256 _tokenId)
    public
    view
    returns (bool)
    {
        return isUse[_tokenId];
    }

    function getStoreAddress(uint256 _tokenId)
    public
    view
    returns (address)
    {
        return storeAddress[_tokenId];
    }

    function getDate(uint256 _tokenId)
    public
    view
    returns (uint256)
    {
        return date[_tokenId];
    }

    function getStartTime(uint256 _tokenId)
    public
    view
    returns (uint256)
    {
        return startTime[_tokenId];
    }

    function getEndTime(uint256 _tokenId)
    public
    view
    returns (uint256)
    {
        return endTime[_tokenId];
    }

    function getMealType(uint256 _tokenId)
    public
    view
    returns (bool)
    {
        return mealType[_tokenId];
    }

    function getPrice(uint256 _tokenId)
    public
    view
    returns (uint256)
    {
        return price[_tokenId];
    }

    function getCharge(uint256 _tokenId)
    public
    view
    returns (uint)
    {
        return charge[_tokenId];
    }
    modifier onlyNotUse(uint256 _tokenId){
        require(isUse[_tokenId] == false, "already used");
        _;
    }

    modifier onlyStoreAddressInNfast(uint256 _tokenId){
        require(msg.sender == storeAddress[_tokenId], "only store address in nfast");
        _;
    }
}