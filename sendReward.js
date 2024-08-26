import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

// Send reward function
export async function sendReward(recipientAddress, amount) {
    console.log("entry")
  const { ALCHEMY_API_URL, MAIN_WALLET_PRIVATE_KEY } = process.env;

  // Create transport and client
  const transport = http(ALCHEMY_API_URL);
  const client = createWalletClient({
    chain: sepolia,
    transport: transport,
  });

  // Convert private key to account
  const account = privateKeyToAccount(MAIN_WALLET_PRIVATE_KEY);

  // Create and send the transaction
  const hash = await client.sendTransaction({
    account,
    to: recipientAddress,
    value: parseEther(amount),
  });
  console.log(hash)
  return hash; // Return the transaction hash
}