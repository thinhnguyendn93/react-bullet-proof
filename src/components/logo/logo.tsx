import { Link } from 'react-router-dom';
import { RESOURCES } from 'config/constant';
import { RouterPath } from 'routers/router-path';

export function Logo(): JSX.Element {
  return (
    <Link to={RouterPath.home}>
      <div className="logo">
        <img src={RESOURCES.LOGO} />
      </div>
    </Link>
  );
}
