import { sendReward } from '../../../sendReward'; // Assuming you have a separate utility for sending rewards

export default async function handler(req, res) {
  console.log(1)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { recipientAddress, amount } = req.body; // You will send recipientAddress and amount from the frontend
    console.log(recipientAddress, amount)
    if (!recipientAddress || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call the sendReward function
    const txHash = await sendReward(recipientAddress, amount);
    // Respond with success
    return res.status(200).json({ message: 'Reward sent successfully', txHash });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send reward', error: error.message });
  }
}