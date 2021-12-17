import React, { FC } from 'react';
import Lottie from 'lottie-react';

// import Tooltip from '../../components/antd/tooltip';
import Grid from '../../components/custom/grid';
import Icon from '../../components/custom/icon';
import cupSvg from '../../resources/svg/cup_transparent.svg';
import cupWaveAnimation from './animations/waves.json';

import styles from './airdrop.module.scss';

const progressPercent = 50;

const Airdrop: FC = () => {
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
                  10,000,000
                </span>
              </Grid>
              <Grid flow="row">
                <p>Total claimed</p>
                <span>
                  <Icon width={24} height={24} name="png/add-league" />
                  100,000
                </span>
              </Grid>
              <Grid flow="row">
                <p>Total redistributed</p>
                <span>
                  <Icon width={24} height={24} name="png/add-league" />
                  135,000
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
                  130,000
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
                  120,000
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
                  +10,000
                </span>
              </div>
            </div>
            <div className={styles.airdrop__info__week_counter}>WEEK 15/100</div>
          </Grid>
          {/*<Icon width={386} height={400} name="png/footballScene" className={styles.footballer} />*/}
        </Grid>
        <div className={styles.airdrop__info__container}>
          <div className={styles.airdrop__animateBlock}>
            <div className={styles.cupBlock}>
              <img src={cupSvg} alt="" />
              <Lottie
                animationData={cupWaveAnimation}
                style={{ transform: `translateY(calc(-${progressPercent}% - -10px))` }}
                className={styles.waveAnimation}
              />
            </div>
          </div>
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
