import React from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatBigValue, formatLeagValue, isSmallLeagValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Skeleton from 'components/antd/skeleton';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';

import { LeagueToken } from '../../../../components/providers/known-tokens-provider';
import Erc20Contract from '../../../../web3/erc20Contract';
import { useDAO } from '../dao-provider';
import VotingDetailedModal from '../voting-detailed-modal';

import { getFormattedDuration, inRange } from 'utils';

import s from './s.module.scss';

type VotingHeaderState = {
  claiming: boolean;
  showDetailedView: boolean;
};

const InitialState: VotingHeaderState = {
  claiming: false,
  showDetailedView: false,
};

const VotingHeader: React.FC = () => {
  const daoCtx = useDAO();

  const [state, setState] = useMergeState<VotingHeaderState>(InitialState);

  const { claimValue } = daoCtx.daoReward;
  const leagBalance = (LeagueToken.contract as Erc20Contract).balance?.unscaleBy(LeagueToken.decimals);
  const { votingPower, userLockedUntil, multiplier = 1 } = daoCtx.daoBarn;

  const loadedUserLockedUntil = (userLockedUntil ?? Date.now()) - Date.now();

  function handleLeftTimeEnd() {
    daoCtx.daoBarn.reload();
  }

  function handleClaim() {
    setState({ claiming: true });

    daoCtx.daoReward.actions
      .claim()
      .catch(Error)
      .then(() => {
        daoCtx.daoReward.reload();
        (LeagueToken.contract as Erc20Contract).loadBalance().catch(Error);
        setState({ claiming: false });
      });
  }

  return (
    <div className={cn(s.component, 'pv-24')}>
      <div className="container-limit">
        <Text type="lb2" weight="semibold" color="primary" className={s.component__head}>
          My Voting Power
        </Text>
        <Grid flow="col" gap={24} className={s.items}>
          <Grid flow="row" gap={8} className={s.item1}>
            <Text type="p2" color="secondary">
              Current reward
            </Text>
            <Grid flow="col" gap={12} align="center">
              <Tooltip title={<Text type="p2">{formatBigValue(claimValue, LeagueToken.decimals)}</Text>}>
                <Skeleton loading={claimValue === undefined}>
                  <Text type="h3" weight="bold" color="primary">
                    {isSmallLeagValue(claimValue) && '> '}
                    {formatLeagValue(claimValue)}
                  </Text>
                </Skeleton>
              </Tooltip>
              <Icon name="png/league" width={24} height={24} />
              <Button
                type="primary"
                size="small"
                disabled={claimValue?.isZero()}
                onClick={handleClaim}
                style={{ marginLeft: 4 }}>
                {!state.claiming ? 'Claim' : <Spin spinning />}
              </Button>
            </Grid>
          </Grid>
          <Divider type="vertical" />
          <Grid flow="row" gap={12} className={s.item2}>
            <Text type="p2" color="secondary">
              {LeagueToken.symbol} Balance
            </Text>
            <Grid flow="col" gap={12} align="center">
              <Skeleton loading={leagBalance === undefined}>
                <Text type="h3" weight="bold" color="primary">
                  {formatLeagValue(leagBalance)}
                </Text>
              </Skeleton>
              <Icon name="png/league" width={24} height={24} />
            </Grid>
          </Grid>
          <Divider type="vertical" />
          <Grid flow="row" gap={4} className={s.item3}>
            <Text type="p2" color="secondary">
              Total voting power
            </Text>
            <div className="flex col-gap-16 align-center" style={{ height: `40px` }}>
              <Skeleton loading={votingPower === undefined}>
                <Text type="h3" weight="bold" color="primary">
                  {formatLeagValue(votingPower) || '-'}
                </Text>
              </Skeleton>
              <Button type="light" onClick={() => setState({ showDetailedView: true })}>
                <Text type="p1" weight="semibold" color="var(--L8-D8)" textGradient="var(--L8-D8)">
                  Detailed view
                </Text>
              </Button>

              {state.showDetailedView && <VotingDetailedModal onCancel={() => setState({ showDetailedView: false })} />}
            </div>
          </Grid>

          <UseLeftTime end={userLockedUntil ?? 0} delay={1_000} onEnd={handleLeftTimeEnd}>
            {leftTime => {
              const leftMultiplier = new BigNumber(multiplier - 1)
                .multipliedBy(leftTime)
                .div(loadedUserLockedUntil)
                .plus(1);

              return leftMultiplier.gt(1) ? (
                <>
                  <Divider type="vertical" />
                  <Grid flow="row" gap={4} className={s.item4}>
                    <Text type="p2" color="secondary">
                      Multiplier & Lock timer
                    </Text>
                    <Grid flow="col" gap={8} align="center">
                      <Tooltip title={`x${leftMultiplier}`}>
                        <Text type="lb1" weight="bold" color="red" className={s.ratio}>
                          {inRange(multiplier, 1, 1.01) ? '>' : ''} {formatBigValue(leftMultiplier, 2, '-', 2)}x
                        </Text>
                      </Tooltip>
                      <Text type="p2" color="secondary">
                        for
                      </Text>
                      <Text type="h3" weight="bold" color="primary">
                        {getFormattedDuration(0, userLockedUntil)}
                      </Text>
                    </Grid>
                  </Grid>
                </>
              ) : undefined;
            }}
          </UseLeftTime>
        </Grid>
      </div>
    </div>
  );
};

export default VotingHeader;
