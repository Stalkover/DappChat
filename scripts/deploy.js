const hre = require("hardhat");

async function main() {
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    await chatApp.waitForDeployment();

    console.log(
        `Contract Address Key: ${chatApp.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})