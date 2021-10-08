import React, { FC, createContext, useContext, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import { formatUSD } from 'web3/utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export enum KnownTokens {
  ETH = 'ETH',
  LEAG = 'LEAG',
  ENTR = 'ENTR',
  XYZ = 'XYZ',
  USDC = 'USDC',
  BOND = 'BOND',
  IONX = 'IONX',
  AAVE = 'AAVE',
  LINK = 'LINK',
  SUSHI = 'SUSHI',
  SNX = 'SNX',
  ILV = 'ILV',
  USDC_LEAG_SLP = 'USDC_LEAG_SUSHI_LP',
}

export type TokenMeta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: TokenIconNames;
  iconLight?: TokenIconNames;
  coinGeckoId?: string;
  contract?: Web3Contract;
  price?: BigNumber;
};

export const EthToken: TokenMeta = {
  symbol: KnownTokens.ETH,
  name: 'Ether',
  address: '0x',
  decimals: 18,
  icon: 'token-eth',
  coinGeckoId: 'ethereum',
};

export const LeagueToken: TokenMeta = {
  address: config.tokens.leag,
  symbol: KnownTokens.LEAG,
  name: 'LeagueDAO Governance Token',
  decimals: 18,
  icon: 'png/league' as any,
  contract: new Erc20Contract([], config.tokens.leag),
};

export const EnterToken: TokenMeta = {
  address: config.tokens.entr,
  symbol: KnownTokens.ENTR,
  name: 'EnterDAO Governance Token',
  decimals: 18,
  icon: 'png/enterdao' as any,
  coinGeckoId: 'enterdao',
  contract: new Erc20Contract([], config.tokens.entr),
};

export const UsdcToken: TokenMeta = {
  address: config.tokens.usdc,
  symbol: KnownTokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  icon: 'token-usdc',
  coinGeckoId: 'usd-coin',
  contract: new Erc20Contract([], config.tokens.usdc),
};

export const IonxToken: TokenMeta = {
  address: config.tokens.ionx,
  symbol: KnownTokens.IONX,
  name: 'IONX',
  decimals: 18,
  icon: 'png/ionx',
  coinGeckoId: 'charged-particles',
  contract: new Erc20Contract([], config.tokens.ionx),
};

export const BondToken: TokenMeta = {
  address: config.tokens.bond,
  symbol: KnownTokens.BOND,
  name: 'BarnBridge',
  decimals: 18,
  icon: 'static/token-bond',
  coinGeckoId: 'barnbridge',
  contract: new Erc20Contract([], config.tokens.bond),
};

export const XyzToken: TokenMeta = {
  address: config.tokens.xyz,
  symbol: KnownTokens.XYZ,
  name: 'XYZ',
  decimals: 18,
  icon: 'png/universe',
  coinGeckoId: 'universe-xyz',
  contract: new Erc20Contract([], config.tokens.xyz),
};

export const LinkToken: TokenMeta = {
  address: config.tokens.link,
  symbol: KnownTokens.LINK,
  name: 'Chainlink',
  decimals: 18,
  icon: 'png/link',
  coinGeckoId: 'chainlink',
  contract: new Erc20Contract([], config.tokens.link),
};

export const SushiToken: TokenMeta = {
  address: config.tokens.sushi,
  symbol: KnownTokens.SUSHI,
  name: 'Sushi Token',
  decimals: 18,
  icon: 'png/sushi',
  coinGeckoId: 'sushi',
  contract: new Erc20Contract([], config.tokens.sushi),
};

export const SnxToken: TokenMeta = {
  address: config.tokens.snx,
  symbol: KnownTokens.SNX,
  name: 'Synthetix Network Token',
  decimals: 18,
  icon: 'png/snx',
  coinGeckoId: 'havven',
  contract: new Erc20Contract([], config.tokens.snx),
};

export const IlvToken: TokenMeta = {
  address: config.tokens.ilv,
  symbol: KnownTokens.ILV,
  name: 'Illuvium',
  decimals: 18,
  icon: 'png/ilv',
  coinGeckoId: 'illuvium',
  contract: new Erc20Contract([], config.tokens.ilv),
};

export const UsdcLeagSLPToken: TokenMeta = {
  address: config.tokens.usdcLeagSLP,
  symbol: KnownTokens.USDC_LEAG_SLP,
  name: 'USDC LEAG SUSHI LP',
  decimals: 18,
  icon: 'png/eslp',
  contract: new Erc20Contract([], config.tokens.usdcLeagSLP),
};

const KNOWN_TOKENS: TokenMeta[] = [
  EthToken,
  LeagueToken,
  EnterToken,
  UsdcToken,
  BondToken,
  IonxToken,
  XyzToken,
  LinkToken,
  SushiToken,
  SnxToken,
  IlvToken,
  UsdcLeagSLPToken,
];

(window as any).KNOWN_TOKENS = KNOWN_TOKENS;

export function getKnownTokens(): TokenMeta[] {
  return [...KNOWN_TOKENS];
}

type ContextType = {
  tokens: TokenMeta[];
  version: number;
  getTokenBySymbol(symbol: string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenPriceIn(source: string, target: string): BigNumber | undefined;
  convertTokenIn(amount: BigNumber | undefined, source: string, target: string): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | undefined, source: string): BigNumber | undefined;
};

const Context = createContext<ContextType>({
  tokens: [...KNOWN_TOKENS],
  version: 0,
  getTokenBySymbol: () => undefined,
  getTokenByAddress: () => undefined,
  getTokenPriceIn: () => undefined,
  convertTokenIn: () => undefined,
  convertTokenInUSD: () => undefined,
});

export function useKnownTokens(): ContextType {
  return useContext<ContextType>(Context);
}

export function getTokenBySymbol(symbol: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
}

const LP_PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
  createAbiItem('token0', [], ['address']),
];

// ToDo: Check the ENTR price calculation
async function getEntrPrice(): Promise<BigNumber> {
  const priceFeedContract = new Erc20Contract(LP_PRICE_FEED_ABI, UsdcLeagSLPToken.address);

  const [token0, { 0: reserve0, 1: reserve1 }] = await priceFeedContract.batch([
    { method: 'token0' },
    { method: 'getReserves' },
  ]);

  let entrReserve;
  let usdcReserve;

  if (String(token0).toLowerCase() === LeagueToken.address) {
    entrReserve = new BigNumber(reserve0).unscaleBy(LeagueToken.decimals);
    usdcReserve = new BigNumber(reserve1).unscaleBy(UsdcToken.decimals);
  } else {
    entrReserve = new BigNumber(reserve1).unscaleBy(LeagueToken.decimals);
    usdcReserve = new BigNumber(reserve0).unscaleBy(UsdcToken.decimals);
  }

  if (!usdcReserve || !entrReserve || entrReserve.eq(BigNumber.ZERO)) {
    return BigNumber.ZERO;
  }

  return usdcReserve.dividedBy(entrReserve);
}

// ToDo: Check the SLP price calculation
async function getUsdcEntrSLPPrice(): Promise<BigNumber> {
  const priceFeedContract = new Erc20Contract(LP_PRICE_FEED_ABI, UsdcLeagSLPToken.address);

  const [decimals, totalSupply, token0, { 0: reserve0, 1: reserve1 }] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'totalSupply', transform: value => new BigNumber(value) },
    { method: 'token0' },
    { method: 'getReserves' },
  ]);

  let usdcReserve;

  if (String(token0).toLowerCase() === LeagueToken.address) {
    usdcReserve = new BigNumber(reserve1).unscaleBy(UsdcToken.decimals);
  } else {
    usdcReserve = new BigNumber(reserve0).unscaleBy(UsdcToken.decimals);
  }

  const supply = totalSupply.unscaleBy(decimals);

  if (!usdcReserve || !supply || supply.eq(BigNumber.ZERO)) {
    return BigNumber.ZERO;
  }

  return usdcReserve.dividedBy(supply).multipliedBy(2);
}

export function getTokenPrice(symbol: string): BigNumber | undefined {
  return getTokenBySymbol(symbol)?.price;
}

export function getTokenPriceIn(source: string, target: string): BigNumber | undefined {
  const sourcePrice = getTokenPrice(source);
  const targetPrice = getTokenPrice(target);

  if (!sourcePrice || !targetPrice) {
    return undefined;
  }

  return sourcePrice.dividedBy(targetPrice);
}

export function convertTokenIn(
  amount: BigNumber | number | undefined,
  source: string,
  target: string,
): BigNumber | undefined {
  if (amount === undefined || amount === null) {
    return undefined;
  }

  if (amount === 0 || BigNumber.ZERO.eq(amount)) {
    return BigNumber.ZERO;
  }

  const bnAmount = new BigNumber(amount);

  if (bnAmount.isNaN()) {
    return undefined;
  }

  if (source === target) {
    return bnAmount;
  }

  const price = getTokenPriceIn(source, target);

  if (!price) {
    return undefined;
  }

  return bnAmount.multipliedBy(price);
}

export function convertTokenInUSD(amount: BigNumber | number | undefined, source: string): BigNumber | undefined {
  return convertTokenIn(amount, source, KnownTokens.USDC);
}

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [reload, version] = useReload();

  useEffect(() => {
    (LeagueToken.contract as Erc20Contract).loadCommon().catch(Error);

    (async () => {
      LeagueToken.price = await getEntrPrice().catch(() => undefined);
      UsdcLeagSLPToken.price = await getUsdcEntrSLPPrice().catch(() => undefined);

      const ids = KNOWN_TOKENS.map(tk => tk.coinGeckoId)
        .filter(Boolean)
        .join(',');

      try {
        const prices = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
        ).then(res => res.json());

        KNOWN_TOKENS.forEach(token => {
          if (token.coinGeckoId) {
            const price = prices[token.coinGeckoId]?.usd;

            if (price) {
              token.price = new BigNumber(price);
            }
          }

          console.log(`[Token Price] ${token.symbol} = ${formatUSD(token.price)}`);
        });
      } catch {}

      reload();
    })();
  }, []);

  useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setProvider(wallet.provider);
    });
  }, [wallet.provider]);

  useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setAccount(wallet.account);
    });

    // load entr balance for connected wallet
    if (wallet.account) {
      (LeagueToken.contract as Erc20Contract).loadBalance().then(reload).catch(Error);
    }
  }, [wallet.account]);

  const value = {
    tokens: [...KNOWN_TOKENS],
    version,
    getTokenBySymbol,
    getTokenByAddress,
    getTokenPriceIn,
    convertTokenIn,
    convertTokenInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default KnownTokensProvider;
