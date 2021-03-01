import React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export type FadeBlockProps = {
  className?: string;
  visible: boolean;
};

const FadeBlock: React.FC<FadeBlockProps> = props => {
  return (
    <div
      className={cx(s.component, props.className, {
        [s.visible]: props.visible,
      })}>
      {props.children}
    </div>
  );
};

export default FadeBlock;