const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
  it("Should be able to guess the exact number", async function () {
    // Deploy the Game contract
    const Game = await ethers.getContractFactory("Game");
    const _game = await Game.deploy({ value: utils.parseEther("0.1") });
    await _game.deployed();

    console.log("Game contract address", _game.address);

    // Deploy the attack contract
    const Attack = await ethers.getContractFactory("Attack");
    const _attack = await Attack.deploy(_game.address);

    console.log("Attack contract address", _attack.address);

    // Attack the Game contract
    const tx = await _attack.attack();
    await tx.wait();

    const balanceGame = await _game.getBalance();
    // Balance of the Game contract should be 0
    expect(balanceGame).to.equal(BigNumber.from("0"));
  });
});

/*
//  Attack
Game contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3
Attack contract address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

*/