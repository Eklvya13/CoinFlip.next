import React, { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt, BaseError } from 'wagmi';
import { parseEther } from 'viem';
import {
  FormControl, FormLabel, Input, Button,
  FormErrorMessage, FormHelperText, Box,
  Spinner, Text
} from '@chakra-ui/react';

interface SendTransactionProps {
  onComplete: (amount: string) => void;
}

function SendTransaction({ onComplete }: { onComplete: (amount: string) => void }) {
    const {
      data: txHash,
      error,
      isPending,
      sendTransaction
    } = useSendTransaction();
  
    const [value, setValue] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);
  
    async function submit(e: React.FormEvent<HTMLFormElement>) { 
      e.preventDefault(); 
      const amount = parseFloat(value);
  
      // Validate if amount is less than 0.01
      if (isNaN(amount) || amount < 0.01) {
        setFormError('Minimum transaction amount is 0.01 ETH');
        return;
      }
      
      setFormError(null);
      const to = "0x75aB5177C9f44eed4302d959f9f2BB0f3102c0bD" as `0x${string}`; 
      sendTransaction({ to, value: parseEther(value) });
    } 
    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
      useWaitForTransactionReceipt({ 
        hash: txHash
      });
    
    React.useEffect(() => {
      if (isConfirmed) {
        console.log('test')
        onComplete((parseFloat(value) * 2).toString());
      }
    }, [isConfirmed, onComplete, value]);
  
    return (
      <Box p={4} borderWidth="1px" borderRadius="md" maxW="md" mx="auto">
        <form onSubmit={submit}>
          <FormControl isRequired mb={4} isInvalid={!!formError}>
            <FormLabel>Amount (ETH)</FormLabel>
            <Input 
              name="value" 
              placeholder="0.05" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              min={0.01}
              step={0.01} // Ensure the input step matches the minimum value
            />
            <FormHelperText>Place Bet!.</FormHelperText>
            {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
          </FormControl>
  
          <Button 
            type="submit" 
            colorScheme="teal" 
            isDisabled={isPending}
          >
            {isPending ? <Spinner size="sm" mr={2} /> : null}
            {isPending ? 'Confirming...' : 'Send'}
          </Button>
  
          {txHash && (
            <Box mt={4}>
              <Text>Transaction Hash: {txHash}</Text>
            </Box>
          )}
  
          {isConfirming && (
            <Box mt={4}>
              <Text>Waiting for confirmation...</Text>
            </Box>
          )}
  
          {isConfirmed && (
            <Box mt={4}>
              <Text color="green.500">Bet Placed!</Text>
            </Box>
          )}
  
          {error && (
            <FormErrorMessage mt={4}>
              Error: {(error as BaseError).shortMessage || error.message}
            </FormErrorMessage>
          )}
        </form>
      </Box>
    );
  }
export default SendTransaction;