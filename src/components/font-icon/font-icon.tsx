import classNames from 'classnames';

interface Props {
  name: string;
  size?: number;
  color?: string;
  cursor?: boolean;
  background?: string;
  className?: string;
  onClick?: () => void;
}

export function FontIcon(props: Props): JSX.Element {
  const { name, size, color, cursor, background, className, onClick } = props;
  const classes = classNames('font-icon', {
    [`font-icon--${name}`]: true,
    [`font-icon--size-${size || 16}`]: true,
    [`font-icon--${color}`]: color,
    [`font-icon--cursor`]: cursor,
    [`font-icon--background-${background}`]: background,
    [className]: className,
  });

  return <span className={classes} onClick={onClick} />;
}
