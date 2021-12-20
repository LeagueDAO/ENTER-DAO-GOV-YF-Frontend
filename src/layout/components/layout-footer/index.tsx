import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import config from 'config';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <footer>
      <div className={s.footer}>
        <div className={s.footer__top}>
          <div className={cn('content-container', s.footer__container)}>
            <div className={s.footer__top__container}>
              <div className={s.subscribe}>
                <p>Stay up to date with our newsletter</p>
                <form className={s.form} action={config.mailchimp.url} method="POST" noValidate target="_blank">
                  <input type="hidden" name="u" value={config.mailchimp.u} />
                  <input type="hidden" name="id" value={config.mailchimp.id} />
                  <input
                    placeholder="Enter your email"
                    type="email"
                    name="EMAIL"
                    id="MERGE0"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                  <button className={s.buttonSubmit} type="submit">
                    Subscribe
                  </button>
                  <div
                    style={{ position: 'absolute', left: '-5000px' }}
                    aria-hidden="true"
                    aria-label="Please leave the following three fields empty">
                    <label htmlFor="b_email">Email: </label>
                    <input
                      type="email"
                      name="b_email"
                      tabIndex={-1}
                      value=""
                      placeholder="youremail@gmail.com"
                      id="b_email"
                    />
                  </div>
                </form>
              </div>
              <div className={s.join__community}>
                <div className={s.sBlock}>
                  <Text type="p1" weight="bold" color="white" font="secondary">
                    Join the community
                  </Text>
                  <div className={s.sLinksWrap}>
                    <a
                      href="https://twitter.com/LeagueDAO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.sLink}>
                      <Icon name="twitter" width="20" height="20" src="/assets/icons/twitter-icon.svg" />
                    </a>
                    <a
                      href="https://discord.com/invite/A2dDGheh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.sLink}>
                      <Icon name="discord" width="20" height="20" src="/assets/icons/discord-white.svg" />
                    </a>
                    {/*<ExternalLink*/}
                    {/*  href="https://www.coingecko.com/en/coins/universe-xyz"*/}
                    {/*  className={s.sLink}*/}
                    {/*>*/}
                    {/*  <Icon*/}
                    {/*    name="coingecko"*/}
                    {/*    width="20"*/}
                    {/*    height="20"*/}
                    {/*    src="/assets/icons/coingecko-icon.svg"*/}
                    {/*  />*/}
                    {/*</ExternalLink>*/}
                    <a
                      href="https://www.youtube.com/channel/UCU0TSe-ZWBuWodKACBqju6A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.sLink}>
                      <Icon name="youtube" width="20" height="20" src="/assets/icons/Frame.svg" />
                    </a>
                    <a
                      href="https://medium.com/@Craven_JE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.sLink}>
                      <Icon name="medium" width="20" height="20" src="/assets/icons/medium.svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.footer__middle}>
          <div className={cn('content-container', s.footer__container)}>
            <div className={s.footer__middle__container}>
              <div>
                <div className={s.universe}>
                  <div className={s.logoDiv}>
                    <Icon name="png/league-dao-dark" width={100} height={62} />
                    {/*<img src="/assets/icons/footer-logo.svg" width={100} height={62} alt="logo" />*/}
                  </div>
                  <p>Join one of our Tokenized Fantasy Sports leagues and become a part of the LeagueDAO community.</p>
                </div>
              </div>
              <div className={s.universeList}>
                <div>
                  <ul>
                    <li>Products</li>
                    <li>
                      <a className={s.disabledLink}>Nomo Leagues</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>NFT Drops</li>
                    <li>
                      <a
                        href="https://cryptofantasy.xyz/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Crypto Fantasy Football
                      </a>
                    </li>
                    <li>
                      <a className={s.disabledLink}>Nomo Fantasy Football</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Info</li>
                    <li>
                      <a
                        href="https://medium.com/leaguedao/leaguedao-white-paper-a3dbf82050f7"
                        target="_blank"
                        rel="noopener noreferrer">
                        Whitepaper
                      </a>
                    </li>
                    <li>
                    <a
                        href="https://leaguedao.com/contributors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contributors
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.leaguedao.com/" target="_blank" rel="noopener noreferrer">
                        Docs
                      </a>
                    </li>
                    <li>
                      <a className={s.disabledLink}>LEAG Token Vesting</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>DAO</li>
                    <li>
                      <Link to="/governance" className={s.dropdownLink}>
                        Governance
                      </Link>
                    </li>
                    <li>
                      <Link to="/yield-farming" className={s.dropdownLink}>
                        Yield farming
                      </Link>
                    </li>
                    <li>
                      <Link to="/airdrop" className={s.dropdownLink}>
                        Airdrop
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.footer__bottom}>
        <div className={cn('content-container', s.footer__container)}>
          <div className={s.footer__bottom__container}>
            <div>
              <span>LeagueDAO © 2021. Open-sourced.</span>
            </div>
            <div className={s.poweredBy}>
              <a
                href="https://app.sushi.com/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0x7b39917f9562c8bc83c7a6c2950ff571375d505d"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add liquidity to SushiSwap USDC/LEAG pool
              </a>
              <a
                href="https://app.sushi.com/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x7b39917f9562c8bc83c7a6c2950ff571375d505d"
                target="_blank"
                rel="noopener noreferrer"
              >
                SushiSwap USDC/LEAG market
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
