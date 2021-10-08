import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { formatPercent, formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { LeagueToken } from 'components/providers/known-tokens-provider';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useDAO } from 'modules/governance/components/dao-provider';
import { useWallet } from 'wallets/wallet';

import { useGeneral } from '../../../../components/providers/general-provider';

import s from './s.module.scss';

const DaoCard: FC = () => {
  const walletCtx = useWallet();
  const daoCtx = useDAO();
  const { daoBarn, daoReward } = daoCtx;
  const { isDarkTheme } = useGeneral();

  return (
    <div className="card">
      <div className={cn('card-header', s.cardTitleContainer)}>
        <div className={s.cardTitleTexts}>
          <Icon name="png/enter-star" width={40} height={40} className="mr-4" />
          <Text type="p1" weight="semibold" color="primary" ellipsis>
            DAO Rewards
          </Text>
        </div>
        {walletCtx.isActive && (
          <Link to="/governance/wallet/deposit" className="button-primary">
            Deposit
          </Link>
        )}
      </div>
      <div className="card-row card-row-border p-24">
        <Text type="lb2" weight="semibold" color="primary">
          APR
        </Text>
        <div className="flex flow-col">
          <Text type="p1" weight="semibold" color="primary">
            {formatPercent(daoCtx.apr) ?? '-'}
          </Text>
        </div>
      </div>
      <div className="card-row card-row-border p-24">
        <Text type="lb2" weight="semibold" color="primary">
          {LeagueToken.symbol} Staked
        </Text>
        <div className="flex flow-col">
          {isDarkTheme ? (
            <Icon name="png/league-dao-dark" className="mr-4" />
          ) : (
            <Icon name="png/league-dao-light" className="mr-4" />
          )}
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(daoBarn.leagStaked) ?? '-'}
          </Text>
        </div>
      </div>
      {walletCtx.isActive && (
        <div className="card-row card-row-border p-24">
          <Text type="lb2" weight="semibold" color="primary">
            My Staked Balance
          </Text>
          <div className="flex flow-col">
            {isDarkTheme ? (
              <Icon name="png/league-dao-dark" className="mr-4" />
            ) : (
              <Icon name="png/league-dao-light" className="mr-4" />
            )}
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(daoBarn.balance) ?? '-'}
            </Text>
          </div>
        </div>
      )}
      <div className="card-row card-row-border p-24">
        <div className="flex flow-row">
          <Text type="lb2" weight="semibold" color="primary" className="mb-4">
            {LeagueToken.symbol} Rewards
          </Text>
          <Text type="p2" color="secondary">
            out of {formatToken(daoReward.poolFeature?.totalAmount)}
          </Text>
        </div>
        <div className="flex flow-col">
          {isDarkTheme ? (
            <Icon name="png/league-dao-dark" className="mr-4" />
          ) : (
            <Icon name="png/league-dao-light" className="mr-4" />
          )}
          <UseLeftTime end={(daoReward.poolFeature?.endTs ?? 0) * 1000} delay={5_000}>
            {() => (
              <Text type="p1" weight="bold" color="primary">
                {formatToken(daoReward.actions.getEntrRewards())}
              </Text>
            )}
          </UseLeftTime>
        </div>
      </div>
      {walletCtx.isActive && (
        <div className="card-row card-row-border p-24">
          <Text type="lb2" weight="semibold" color="primary">
            My {LeagueToken.symbol} Rewards
          </Text>
          <div className="flex flow-col">
            {isDarkTheme ? (
              <Icon name="png/league-dao-dark" className="mr-4" />
            ) : (
              <Icon name="png/league-dao-light" className="mr-4" />
            )}
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(daoReward.claimValue) ?? '-'}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaoCard;
