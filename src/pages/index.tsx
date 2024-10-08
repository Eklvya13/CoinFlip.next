import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { background, Box, Heading, Text } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import Game from './components/Game';
import LottieCoinFlip from './components/LottieCoinFlip';
import bg from '../public/background.png';

const Home: NextPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
      className={styles.container}
    >
      <Head>
        <title>CoinFlip 🤑</title>
        <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Heading as="h2" size="2xl" mb={4} color="teal.500">
          Welcome to CoinFlip.Next
        </Heading>

        <Heading as="h4" size="md" mb={6} color="gray.600">
          Try your luck and win double!
        </Heading>

        <Box mb={6}>
          <ConnectButton />
        </Box>

        <Box width="100%" maxW="640px" mx="auto" mb={8}>
          <LottieCoinFlip />
          <Game />
        </Box>
      </main>

      <footer className={styles.footer}>
        <Text color="gray.500" fontSize="sm">
          Made with ❤️ by{' '}
          <a href="https://github.com/Eklvya13" rel="noopener noreferrer" target="_blank" style={{ color: 'teal' }}>
            Hari Acharya
          </a>
        </Text>
      </footer>
    </div>
  );
};

export default Home;
