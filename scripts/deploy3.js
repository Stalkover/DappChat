const hre = require("hardhat");

async function main() {
  const ChatApp = await hre.ethers.deployContract("ChatApp");
  await chatApp.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${chatApp.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
