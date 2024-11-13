async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleBank = await ethers.getContractFactory("SimpleBank");
  const simpleBank = await SimpleBank.deploy(100); // Asignar el fee (por ejemplo, 100 = 1%)

  await simpleBank.waitForDeployment();

  console.log("SimpleBank contract deployed to:", simpleBank.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/* async function main() {
  const fee = 100; // 1% de fee
  const SimpleBank = await ethers.getContractFactory('SimpleBank');
  const simpleBank = await SimpleBank.deploy(fee);
  await simpleBank.deployed();
  console.log('SimpleBank deployed to:', simpleBank.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 */