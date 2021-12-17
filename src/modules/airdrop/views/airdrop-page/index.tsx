import { FC, useState } from 'react';
import Lottie from 'lottie-react';
import { BigNumber as _BigNumber } from 'bignumber.js';

import Button from 'components/antd/button';
// import Tooltip from '../../components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import cupSvgWhite from 'resources/svg/cup_transparent_white.svg';
import cupSvg from 'resources/svg/cup_transparent.svg';
import cupWaveAnimation from '../../animations/waves.json';
import { useAirdrop } from '../../providers/airdrop-provider';
import { useWallet } from 'wallets/wallet';
import { formatToken } from 'web3/utils';

import { LeagueToken } from 'components/providers/known-tokens-provider';


import styles from './airdrop.module.scss';

const Airdrop: FC = () => {
  const { isDarkTheme } = useGeneral();

  const airdropCtx = useAirdrop();

  const merkleDistributorContract = airdropCtx.merkleDistributor;

  const wallet = useWallet();
  const lockedAirDrop = !merkleDistributorContract?.claimIndex;

  const totalClaimed = new _BigNumber(merkleDistributorContract?.totalInfo?.totalAirdropClaimed ?? 0).unscaleBy(LeagueToken.decimals)
  const totalRedistributed = new _BigNumber(merkleDistributorContract?.totalInfo?.totalAirdropRedistributed ?? 0).unscaleBy(LeagueToken.decimals)

  const userAmount = new _BigNumber(merkleDistributorContract?.claimAmount ?? 0).unscaleBy(LeagueToken.decimals)
  const userAvailable = new _BigNumber(merkleDistributorContract?.adjustedAmount?.airdropAmount ?? 0).unscaleBy(LeagueToken.decimals)
  const userBonus = new _BigNumber(merkleDistributorContract?.adjustedAmount?.bonusPart ?? 0).unscaleBy(LeagueToken.decimals)

  const [isClaim, setIsClaim] = useState(false)

  console.log('bonusPart', new _BigNumber(merkleDistributorContract?.adjustedAmount?.bonusPart ?? 0).dividedBy(10 ** LeagueToken.decimals).toString());

  const progressPercent = userAvailable?.times(100).div(userAmount ?? 0).toNumber()

  const handleClaim = async () => {
    setIsClaim(true)
    try {
      await merkleDistributorContract?.claim()
    } catch (e) {
      console.log(e)
    } finally {
      setIsClaim(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.general__info}>
        <h1>Airdrop reward</h1>
        <p className="mb-48">
          You may have received claimable token rewards from the LeagueDAO Airdrop. Claiming your airdrop will forfeit a
          portion of your balance. Your total claimable amount will rise whenever someone forfeits a portion of their
          reward.
        </p>
      </div>
      <Grid flow="col" colsTemplate="6fr 3fr" gap={30} width="100%">
        <Grid flow="row" gap={[30, 0]} className={styles.total__info}>
          <Grid>
            <Grid flow="col" colsTemplate="repeat(3, 1fr)" className={styles.total__info__column}>
              <Grid flow="row">
                <p>
                  Total airdropped
                  {/*<Tooltip title={'qwerty'}>*/}
                  {/*  <span>*/}
                  {/*    <Icon name="info-outlined" width={15} height={15} />*/}
                  {/*  </span>*/}
                  {/*</Tooltip>*/}
                </p>
                <span>
                  <Icon width={24} height={24} name="png/add-league" />
                  {formatToken(merkleDistributorContract?.totalAirdropped?.unscaleBy(LeagueToken.decimals)) ?? 0}
                </span>
              </Grid>
              <Grid flow="row">
                <p>Total claimed</p>
                <span>
                  <Icon width={24} height={24} name="png/add-league" />
                  {formatToken(totalClaimed)}
                </span>
              </Grid>
              <Grid flow="row">
                <p>Total redistributed</p>
                <span>
                  <Icon width={24} height={24} name="png/add-league" />
                  {formatToken(totalRedistributed)}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={styles.airdrop__info__container} colsTemplate="5fr 1fr" padding={40}>
            <div className={styles.airdrop__info__details}>
              <div className={`${styles.total__amount} ${styles.general__info}`}>
                <p>
                  Your total airdrop amount
                  {/*<Tooltip title={'qwerty'}>*/}
                  {/*  <span>*/}
                  {/*    <Icon name="info-outlined" width={15} height={15} />*/}
                  {/*  </span>*/}
                  {/*</Tooltip>*/}
                </p>
                <span>
                  <Icon width={36} height={36} name="png/add-league" />
                  {formatToken(userBonus?.plus(userAmount ?? 0), { decimals: 1 })}
                </span>
              </div>
              <div className={`${styles.total__airdropped} ${styles.general__info}`}>
                <p>
                  Total airdropped
                  {/*<Tooltip title={'qwerty'}>*/}
                  {/*  <span>*/}
                  {/*    <Icon name="info-outlined" width={15} height={15} />*/}
                  {/*  </span>*/}
                  {/*</Tooltip>*/}
                </p>
                <span>
                  <Icon width={22} height={22} name="png/add-league" />
                  {formatToken(userAmount)}
                </span>
              </div>
              <div className={`${styles.total__bonuses} ${styles.general__info}`}>
                <p>
                  Your bonus amount
                  {/*<Tooltip title={'qwerty'}>*/}
                  {/*  <span>*/}
                  {/*    <Icon name="info-outlined" width={15} height={15} />*/}
                  {/*  </span>*/}
                  {/*</Tooltip>*/}
                </p>
                <span>
                  <Icon width={22} height={22} name="png/add-league" />
                   +{formatToken(userBonus)}
                </span>
              </div>
            </div>
            <div className={styles.airdrop__info__week_counter}>WEEK {merkleDistributorContract?.airdropCurrentWeek}/{merkleDistributorContract?.airdropDurationInWeeks}</div>
          </Grid>
          {/*<Icon width={386} height={400} name="png/footballScene" className={styles.footballer} />*/}
        </Grid>
        <div className={styles.airdrop__info__container}>
          <Grid gap={15} className={styles.airdrop__animateBlock}>
            <div className={styles.cupBlock}>
              <img src={isDarkTheme ? cupSvg : cupSvgWhite} alt="" />
              <div className={styles.cupBlock__text}>
                <Text type="h2" weight="bold" color="primary">
                  {formatToken(userAvailable, { compact: true })}
                </Text>
                <Text type="p2" tag="span" color="primary">
                  available
                </Text>
              </div>
              <Lottie
                animationData={cupWaveAnimation}
                style={{ transform: `translateY(calc(-${isNaN(progressPercent as number) ? 0 : (progressPercent as number) < 22 ? 22 : progressPercent}% - -10px))` }}
                className={styles.waveAnimation}
              />
            </div>
            <div>
              <Text type="p2" color="secondary">
                Available to claim now:
              </Text>
              <Text type="h2" weight="bold" color="primary">
                {formatToken(userAvailable)}
              </Text>
            </div>
            <div>
              <Text type="p2" color="secondary">
                You forfeit:
              </Text>
              <Text type="p2" weight="bold" color="red">
                {formatToken(userBonus?.plus(userAmount ?? 0)?.minus(userAvailable ?? 0))}
              </Text>
            </div>
            <div>
              <Button
                type="primary"
                onClick={handleClaim}
                disabled={
                  merkleDistributorContract?.adjustedAmount?.airdropAmount === undefined
                  || merkleDistributorContract?.isAirdropClaimed
                  || isClaim
                }
              >
                Claim
              </Button>
            </div>
          </Grid>
        </div>
      </Grid>
      {/*<div className={styles.total__info__container}>*/}
      {/*  <div>1</div>*/}
      {/*  <div className={styles.claim__container}>2</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Airdrop;
