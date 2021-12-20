import React, { FC, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
// import MerkleDistributor from 'web3/merkleDistributor';
import Web3Contract from 'web3/web3Contract';

import {
  BondToken,
  EnterToken,
  IlvToken,
  IonxToken,
  LinkToken,
  SnxToken,
  SushiToken,
  TokenMeta,
  UsdcLeagSLPToken,
  XyzToken,
  useKnownTokens,
} from 'components/providers/known-tokens-provider';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { YfPoolContract } from 'modules/yield-farming/contracts/yfPool';
import { YfStakingContract } from 'modules/yield-farming/contracts/yfStaking';
import { useWallet } from 'wallets/wallet';

export enum YFPoolID {
  BOND = 'bond',
  IONX = 'ionx',
  XYZ = 'xyz',
  LINK = 'link',
  SUSHI = 'sushi',
  SNX = 'snx',
  ILV = 'ilv',
  ENTR = 'entr',
  USDC_LEAG_SLP = 'usdc-leag-slp',
}

export type YFPoolMeta = {
  name: YFPoolID;
  label: string;
  icons: string[];
  colors: string[];
  tokens: TokenMeta[];
  contract: YfPoolContract;
};

export const BondYfPool: YFPoolMeta = {
  name: YFPoolID.BOND,
  label: 'BOND',
  icons: ['static/token-bond'],
  colors: ['var(--theme-red-color)'],
  tokens: [BondToken],
  contract: new YfPoolContract(config.contracts.yf.bond),
};

export const XyzYfPool: YFPoolMeta = {
  name: YFPoolID.XYZ,
  label: 'XYZ',
  icons: ['png/XYZ'],
  colors: ['var(--theme-red-color)'],
  tokens: [XyzToken],
  contract: new YfPoolContract(config.contracts.yf.xyz),
};

export const EntrYfPool: YFPoolMeta = {
  name: YFPoolID.ENTR,
  label: 'ENTR',
  icons: ['png/ENTR'],
  colors: ['var(--theme-red-color)'],
  tokens: [EnterToken],
  contract: new YfPoolContract(config.contracts.yf.entr),
};

export const IonxYfPool: YFPoolMeta = {
  name: YFPoolID.IONX,
  label: 'IONX',
  icons: ['png/IONX'],
  colors: ['var(--theme-red-color)'],
  tokens: [IonxToken],
  contract: new YfPoolContract(config.contracts.yf.ionx),
};

export const LinkYfPool: YFPoolMeta = {
  name: YFPoolID.LINK,
  label: 'LINK',
  icons: ['png/LINK'],
  colors: ['var(--theme-red-color)'],
  tokens: [LinkToken],
  contract: new YfPoolContract(config.contracts.yf.link),
};

export const SushiYfPool: YFPoolMeta = {
  name: YFPoolID.SUSHI,
  label: 'SUSHI',
  icons: ['png/SUSHI'],
  colors: ['var(--theme-red-color)'],
  tokens: [SushiToken],
  contract: new YfPoolContract(config.contracts.yf.sushi),
};

export const SnxYfPool: YFPoolMeta = {
  name: YFPoolID.SNX,
  label: 'SNX',
  icons: ['png/SNX'],
  colors: ['var(--theme-red-color)'],
  tokens: [SnxToken],
  contract: new YfPoolContract(config.contracts.yf.snx),
};

export const IlvYfPool: YFPoolMeta = {
  name: YFPoolID.ILV,
  label: 'ILV',
  icons: ['png/ILV'],
  colors: ['var(--theme-red-color)'],
  tokens: [IlvToken],
  contract: new YfPoolContract(config.contracts.yf.ilv),
};

export const UsdcLeagSLPYfPool: YFPoolMeta = {
  name: YFPoolID.USDC_LEAG_SLP,
  label: 'USDC_LEAG_SUSHI_LP',
  icons: ['png/eslp'],
  colors: ['var(--theme-red-color)'],
  tokens: [UsdcLeagSLPToken],
  contract: new YfPoolContract(config.contracts.yf.usdcLeagSLP),
};

const KNOWN_POOLS: YFPoolMeta[] = [
  XyzYfPool,
  IonxYfPool,
  BondYfPool,
  LinkYfPool,
  EntrYfPool,
  SushiYfPool,
  SnxYfPool,
  IlvYfPool,
  UsdcLeagSLPYfPool,
];

export function getYFKnownPoolByName(name: string): YFPoolMeta | undefined {
  return KNOWN_POOLS.find(pool => pool.name === name);
}

export type YFPoolsType = {
  yfPools: YFPoolMeta[];
  getYFKnownPoolByName: (name: string) => YFPoolMeta | undefined;
  stakingContract?: YfStakingContract;
  // merkleDistributor?: MerkleDistributor;
  getPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getYFTotalStakedInUSD: () => BigNumber | undefined;
  getYFTotalEffectiveStakedInUSD: () => BigNumber | undefined;
  getYFDistributedRewards: () => BigNumber | undefined;
  getYFTotalSupply: () => BigNumber | undefined;
};

const YFPoolsContext = createContext<YFPoolsType>({
  yfPools: KNOWN_POOLS,
  getYFKnownPoolByName: getYFKnownPoolByName,
  stakingContract: undefined,
  // merkleDistributor: undefined,
  getPoolBalanceInUSD: () => undefined,
  getPoolEffectiveBalanceInUSD: () => undefined,
  getMyPoolBalanceInUSD: () => undefined,
  getMyPoolEffectiveBalanceInUSD: () => undefined,
  getYFTotalStakedInUSD: () => undefined,
  getYFTotalEffectiveStakedInUSD: () => undefined,
  getYFDistributedRewards: () => undefined,
  getYFTotalSupply: () => undefined,
});

export function useYFPools(): YFPoolsType {
  return useContext(YFPoolsContext);
}

const YFPoolsProvider: FC = props => {
  const { children } = props;

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const stakingContract = useMemo(() => {
    const staking = new YfStakingContract(config.contracts.yf.staking);
    staking.on(Web3Contract.UPDATE_DATA, reload);

    return staking;
  }, []);

  // const merkleDistributor = useMemo(() => {
  //   const merkleDistributor = new MerkleDistributor([], config.contracts.merkleDistributor);
  //   merkleDistributor.on(Web3Contract.UPDATE_DATA, reload);
  //
  //   return merkleDistributor;
  // }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      if (pool.contract.isPoolAvailable) {
        pool.contract.on(Web3Contract.UPDATE_DATA, reload);
        pool.contract.loadCommon().catch(Error);

        pool.tokens.forEach(tokenMeta => {
          if (tokenMeta.address) {
            stakingContract.loadCommonFor(tokenMeta.address).catch(Error);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setProvider(walletCtx.provider);
    });

    stakingContract.setProvider(walletCtx.provider);
    // merkleDistributor.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    stakingContract.setAccount(walletCtx.account);
    // merkleDistributor.setAccount(walletCtx.account);
    // merkleDistributor.loadUserData().catch(Error);

    KNOWN_POOLS.forEach(pool => {
      pool.contract.setAccount(walletCtx.account);

      if (walletCtx.isActive) {
        if (pool.contract.isPoolAvailable) {
          pool.contract.loadUserData().catch(Error);

          pool.tokens.forEach(tokenMeta => {
            if (tokenMeta.address) {
              stakingContract.loadUserDataFor(tokenMeta.address).catch(Error);
            }
          });
        }
      }
    });
  }, [walletCtx.account]);

  const getPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochPoolSize === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(stakedToken.nextEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochPoolSize === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.currentEpochPoolSize.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getMyPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochUserBalance === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.nextEpochUserBalance.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getMyPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochUserBalance === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.currentEpochUserBalance.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getYFTotalStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolBalanceInUSD(yfPool.name);
    });
  }, [getPoolBalanceInUSD]);

  const getYFTotalEffectiveStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolEffectiveBalanceInUSD(yfPool.name);
    });
  }, [getPoolEffectiveBalanceInUSD]);

  const getYFDistributedRewards = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      if (!yfPool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      const { distributedReward } = yfPool.contract;

      if (distributedReward === undefined) {
        return undefined;
      }

      return new BigNumber(distributedReward);
    });
  }, []);

  const getYFTotalSupply = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      if (!yfPool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      const { totalSupply } = yfPool.contract;

      if (totalSupply === undefined) {
        return undefined;
      }

      return new BigNumber(totalSupply);
    });
  }, []);

  const value: YFPoolsType = {
    yfPools: KNOWN_POOLS,
    getYFKnownPoolByName,
    stakingContract,
    // merkleDistributor,
    getYFTotalStakedInUSD,
    getYFTotalEffectiveStakedInUSD,
    getPoolBalanceInUSD,
    getPoolEffectiveBalanceInUSD,
    getMyPoolBalanceInUSD,
    getMyPoolEffectiveBalanceInUSD,
    getYFDistributedRewards,
    getYFTotalSupply,
  };

  return (
    <YFPoolsContext.Provider value={value}>
      {children}
      <ContractListener contract={stakingContract} />
      {/*<ContractListener contract={merkleDistributor} />*/}
      <ContractListener contract={BondYfPool.contract} />
      <ContractListener contract={IonxYfPool.contract} />
      <ContractListener contract={XyzYfPool.contract} />
      <ContractListener contract={LinkYfPool.contract} />
      <ContractListener contract={SushiYfPool.contract} />
      <ContractListener contract={SnxYfPool.contract} />
      <ContractListener contract={IlvYfPool.contract} />
      <ContractListener contract={UsdcLeagSLPYfPool.contract} />
      <ContractListener contract={EntrYfPool.contract} />
    </YFPoolsContext.Provider>
  );
};

export default YFPoolsProvider;
