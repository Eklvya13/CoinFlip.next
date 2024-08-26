import * as React from 'react';
import {
  type BaseError,
  useWriteContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import { parseEther } from 'viem';
import {
  FormControl, FormLabel,
  Input, Button,
  FormErrorMessage,
  FormHelperText, Box,
  Spinner, Text,
  RadioGroup, Radio, Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import SendTransaction from './SendTransaction';
import CoinFlipGame from './CoinFlipGame';


function Game() {
  const [betPlaced, setBetPlaced] = React.useState(false);
  const [transactionComplete, setTransactionComplete] = React.useState(false);
  const [betAmount, setBetAmount] = React.useState<string>('');

  // Handle when the transaction (bet) is complete
  const onComplete = (amount: string) => {
    setBetAmount(amount); // Set bet amount
    setTransactionComplete(true); // Move to coin flip game after confirming transaction
  };

  // Reset the game after coin flip
  const resetGame = () => {
    setBetPlaced(false);
    setTransactionComplete(false);
    setBetAmount('');
  };

  return (
    <Box>
      {!betPlaced ? (
        // Bet Form (SendTransaction)
        <SendTransaction
          onComplete={(amount) => {
            setBetPlaced(true); // Bet placed
            onComplete(amount); // Trigger completion logic
          }}
        />
      ) : !transactionComplete ? (
        // Loading until the transaction completes
        <Text>Waiting for the transaction to complete...</Text>
      ) : (
        // Coin Flip Game
        <CoinFlipGame
          onFlipComplete={resetGame} // Reset game after coin flip
          betAmount={betAmount} // Pass the bet amount
        />
      )}
    </Box>
  );
}
export default Game;
