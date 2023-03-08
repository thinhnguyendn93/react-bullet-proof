import classNames from 'classnames';

interface Props {
  modal?: boolean;
  fixed?: boolean;
}

export function Loading(props: Props) {
  const { modal, fixed } = props;

  const classes = classNames('loading', {
    [`loading--modal`]: modal,
    [`loading--fixed`]: fixed,
  });

  return (
    <div className={classes}>
      <div className="loading__loader">
        <svg viewBox="0 0 24 24">
          <path
            d="M 22.49772,12.000001 A 10.49772,10.497721 0 0 1 12,22.497722 10.49772,10.497721 0 0 1 1.5022797,12.000001 10.49772,10.497721 0 0 1 12,1.5022797 10.49772,10.497721 0 0 1 22.49772,12.000001 Z"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
