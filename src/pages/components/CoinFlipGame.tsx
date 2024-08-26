import React, { useState } from 'react';
import { Button, Box, FormControl, FormLabel, RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';

interface CoinFlipGameProps {
    onFlipComplete: () => void;
    betAmount: string; // Add betAmount
  }
  
  function CoinFlipGame({ onFlipComplete, betAmount }: CoinFlipGameProps) {
    const { address } = useAccount(); // Use the account hook to get the address
    const [choice, setChoice] = React.useState<string | null>(null);
    const [isFlipping, setIsFlipping] = React.useState(false);
    const [result, setResult] = React.useState<string | null>(null);
    const [rewardStatus, setRewardStatus] = React.useState<string | null>(null); // For reward status
  
    const handleFlip = () => {
      if (!choice) return; // Ensure the user makes a choice before flipping
      setIsFlipping(true);
      setResult(null);
      setRewardStatus(null); // Reset reward status
  
      // Simulate the coin flip result after 3 seconds
      setTimeout(async () => {
        const flipResult = 'heads'; // Replace with Math.random() < 0.5 ? 'heads' : 'tails';
        setResult(flipResult);
        setIsFlipping(false);
  
        // If the player wins
        if (flipResult === choice) {
          setRewardStatus('You won! Sending reward...');
  
          // Call the backend API to send the reward
          try {
            const response = await fetch('/api/sendReward', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recipientAddress: address, // Use the address from useAccount
                amount: betAmount, // Use the bet amount
              }),
            });
  
            const result = await response.json();
            if (response.ok) {
              setRewardStatus(`Reward sent! Transaction hash: ${result.transactionHash}`);
            } else {
              setRewardStatus(`Error sending reward: ${result.message}`);
            }
          } catch (error) {
            setRewardStatus('Failed to send reward.');
          }
        } else {
          setRewardStatus('You lost! Better luck next time.');
        }
  
        // Trigger onFlipComplete after displaying result
        setTimeout(() => {
          onFlipComplete();
        }, 3000); // Give time to show the result before resetting
      }, 3000);
    };
  
    return (
      <Box textAlign="center" mt={8}>
        <FormControl as="fieldset" isRequired mt={4}>
          <FormLabel as="legend">Choose Heads or Tails</FormLabel>
          <RadioGroup onChange={setChoice} value={choice || " "}>
            <Stack direction="row" justify="center">
              <Radio value="heads">Heads</Radio>
              <Radio value="tails">Tails</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
  
        <Button
          mt={6}
          colorScheme="teal"
          onClick={handleFlip}
          isLoading={isFlipping}
          loadingText="Flipping..."
          disabled={!choice || isFlipping}
        >
          Flip the Coin
        </Button>
  
        {result && (
          <Text mt={4} fontSize="xl">
            {result === choice ? 'You won!' : 'You lost!'} The coin landed on {result}.
          </Text>
        )}
  
        {rewardStatus && (
          <Text mt={4} color="green.500">
            {rewardStatus}
          </Text>
        )}
      </Box>
    );
  }
export default CoinFlipGame;
