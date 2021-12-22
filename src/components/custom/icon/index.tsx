import React, { CSSProperties } from 'react';
import cn from 'classnames';

import addEnterSrc from 'resources/png/add-enter.png';
import axsSrc from 'resources/png/axie.png';
import enterStarSrc from 'resources/png/enter-star.png';
import enterdaoSrc from 'resources/png/enterdao.png';
import entrLogo from 'resources/png/ENTR.png';
import ilvLogo from 'resources/png/ILV.png';
import ionxSrc from 'resources/png/IONX.png';
import ionxLogo from 'resources/png/IONX.png';
import leaguedaoSrc from 'resources/png/league-dao-dark.png';
import leaguedaoLightSrc from 'resources/png/league-dao-light.png';
import linkLogo from 'resources/png/LINK.png';
import sandSrc from 'resources/png/sandbox.png';
import snxSrc from 'resources/png/SNX.png';
import snxLogo from 'resources/png/SNX.png';
import sushiLogo from 'resources/png/SUSHI.png';
import telegramSrc from 'resources/png/telegram.png';
import aaveSrc from 'resources/png/token-aave.png';
import ilvSrc from 'resources/png/token-ilv.png';
import leagueSrc from 'resources/png/token-league.png';
import linkSrc from 'resources/png/token-link.png';
import sushiSrc from 'resources/png/token-sushi.png';
import uslpSrc from 'resources/png/token-uslp.png';
import universeSrc from 'resources/png/universe.png';
import eslpSrc from 'resources/png/USDC_LEAG_SUSHI_LP.png';
import xyzLogo from 'resources/png/XYZ.png';
import addLeag from 'resources/svg/add_leag_icon.svg';
import footballScene from 'resources/svg/footballscene.svg';
import Sprite from 'resources/svg/icons-sprite.svg';

import s from './s.module.scss';

export type LogoIconNames = 'png/league-dao-dark';
export type LogoIconNamesLight = 'png/league-dao-light';

export type TokenIconNames =
  | 'bond-circle-token'
  | 'bond-square-token'
  | 'token-unknown'
  | 'static/token-bond'
  | 'static/token-uniswap'
  | 'static/tx-progress'
  | 'token-eth'
  | 'token-btc'
  | 'token-weth'
  | 'token-wbtc'
  | 'token-renbtc'
  | 'token-bond'
  | 'token-usdc'
  | 'token-dai'
  | 'token-susd'
  | 'token-uniswap'
  | 'token-usdt'
  | 'token-sushi'
  | 'compound'
  | 'png/enter-star'
  | 'png/universe'
  | 'png/enterdao'
  | 'png/snx'
  | 'png/ionx'
  | 'png/sandbox'
  | 'png/axie'
  | 'png/aave'
  | 'png/sushi'
  | 'png/link'
  | 'png/ilv'
  | 'png/uslp'
  | 'png/eslp'
  | 'png/league'
  | 'cream_finance'
  | 'yearn_finance';

export type NavIconNames =
  | 'paper-bill-outlined'
  | 'paper-alpha-outlined'
  | 'chats-outlined'
  | 'forum-outlined'
  | 'bar-charts-outlined'
  | 'savings-outlined'
  | 'proposal-outlined'
  | 'treasury-outlined'
  | 'bank-outlined'
  | 'tractor-outlined'
  | 'wallet-outlined'
  | 'docs-outlined';

export type ThemeIconNames = 'moon' | 'sun';

export type IconNames =
  | LogoIconNames
  | LogoIconNamesLight
  | TokenIconNames
  | NavIconNames
  | ThemeIconNames
  | 'static/uStar'
  | 'right-arrow-circle-outlined'
  | 'arrow-back'
  | 'down-arrow-circle'
  | 'refresh'
  | 'notification'
  | 'chevron-right'
  | 'close-circle-outlined'
  | 'check-circle-outlined'
  | 'history-circle-outlined'
  | 'close'
  | 'close-tiny'
  | 'dropdown-arrow'
  | 'warning-outlined'
  | 'warning-circle-outlined'
  | 'gear'
  | 'node-status'
  | 'info-outlined'
  | 'network'
  | 'pencil-outlined'
  | 'rate-outlined'
  | 'plus-circle-outlined'
  | 'plus-square-outlined'
  | 'ribbon-outlined'
  | 'bin-outlined'
  | 'add-user'
  | 'search-outlined'
  | 'link-outlined'
  | 'arrow-top-right'
  | 'handshake-outlined'
  | 'stamp-outlined'
  | 'circle-plus-outlined'
  | 'circle-minus-outlined'
  | 'senior_tranche'
  | 'junior_tranche'
  | 'senior_tranche_simplified'
  | 'junior_tranche_simplified'
  | 'withdrawal_regular'
  | 'withdrawal_instant'
  | 'statistics'
  | 'filter'
  | 'tx-progress'
  | 'tx-success'
  | 'tx-failure'
  | 'burger'
  | 'burger-close'
  | 'hourglass'
  | 'history'
  | 'piggybank'
  | 'file'
  | 'add-file'
  | 'file-added'
  | 'file-deleted'
  | 'file-clock'
  | 'file-times'
  | 'wallet'
  | 'handshake'
  | 'padlock-unlock'
  | 'stopwatch'
  | 'judge'
  | 'certificate'
  | 'chart-up'
  | 'apy-up'
  | 'chart'
  | 'queue'
  | 'stake'
  | 'auction'
  | 'marketplace'
  | 'social-media'
  | 'about'
  | 'whitepaper'
  | 'static/trophy'
  | 'static/trophy-disable'
  | 'static/american_footbal-disable'
  | 'static/american_footbal'
  | 'static/basketball-disable'
  | 'static/basketball'
  | 'static/hockey'
  | 'static/hockey-disable'
  | 'static/dollar'
  | 'static/dollar-disable'
  | 'team'
  | 'governance'
  | 'yield-farming'
  | 'airdrop'
  | 'docs'
  | 'twitter'
  | 'discord'
  | 'png/add-league'
  | 'dropdown'
  | 'theme-switcher-sun'
  | 'theme-switcher-moon'
  | 'coingecko'
  | 'youtube'
  | 'medium'
  | 'polymorphs'
  | 'core-drops'
  | 'png/add-enter'
  | 'png/telegram'
  | 'png/XYZ'
  | 'png/ENTR'
  | 'png/IONX'
  | 'png/LINK'
  | 'png/SUSHI'
  | 'png/SNX'
  | 'png/ILV'
  | 'static/add-token'
  | 'png/footballScene';

export type IconProps = {
  name: IconNames;
  width?: number | string;
  height?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'yellow' | 'inherit';
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: CSSProperties;
  src?: string;
};

const Icon: React.FC<IconProps> = props => {
  const { name, width = 24, height = 24, rotate, color, className, style, src, ...rest } = props;

  const isStatic = (name ?? '').indexOf('static/') === 0;
  const isPng = (name ?? '').indexOf('png/') === 0;

  if (isPng) {
    const getSrc = () => {
      switch (name) {
        case 'png/league-dao-dark':
          return leaguedaoSrc;
        case 'png/XYZ':
          return xyzLogo;
        case 'png/ENTR':
          return entrLogo;
        case 'png/IONX':
          return ionxLogo;
        case 'png/LINK':
          return linkLogo;
        case 'png/SUSHI':
          return sushiLogo;
        case 'png/SNX':
          return snxLogo;
        case 'png/ILV':
          return ilvLogo;
        case 'png/league-dao-light':
          return leaguedaoLightSrc;
        case 'png/enterdao':
          return enterdaoSrc;
        case 'png/snx':
          return snxSrc;
        case 'png/universe':
          return universeSrc;
        case 'png/ionx':
          return ionxSrc;
        case 'png/sandbox':
          return sandSrc;
        case 'png/axie':
          return axsSrc;
        case 'png/aave':
          return aaveSrc;
        case 'png/ilv':
          return ilvSrc;
        case 'png/link':
          return linkSrc;
        case 'png/sushi':
          return sushiSrc;
        case 'png/uslp':
          return uslpSrc;
        case 'png/eslp':
          return eslpSrc;
        case 'png/league':
          return leagueSrc;
        case 'png/add-enter':
          return addEnterSrc;
        case 'png/enter-star':
          return enterStarSrc;
        case 'png/telegram':
          return telegramSrc;
        case 'png/add-league':
          return addLeag;
        case 'png/footballScene':
          return footballScene;
        default:
          return '';
      }
    };
    return (
      <img
        className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
        width={width}
        alt=""
        height={height ?? width}
        style={style}
        src={src || getSrc()}
        {...rest}
      />
    );
  }

  return (
    <svg
      className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
      width={width}
      height={height ?? width}
      style={style}
      {...rest}>
      {!isStatic ? <use xlinkHref={`${Sprite}#icon__${name}`} /> : <use xlinkHref={`#icon__${name}`} />}
    </svg>
  );
};

export default Icon;
