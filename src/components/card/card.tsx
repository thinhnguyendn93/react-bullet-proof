import { Tag } from 'antd';
import classNames from 'classnames';

interface Props {
  card: App.CardItem;
  border?: boolean;
}

export function Card(props: Props) {
  const { border, card } = props;
  const { image, title, description, tags } = card;

  const renderDescriptions = () => {
    const descriptions = description.split('\n');
    if (descriptions.length == 1) {
      return <p className="card__description">{description}</p>;
    }
    return (
      <div className="card__description">
        <ul>
          {descriptions.map((des, index) => (
            <li key={index}>{des}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={classNames('card', {
        ['card--border']: border,
      })}
    >
      <img className="card__image" src={image} />
      {tags && (
        <div className="card__tags">
          {tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </div>
      )}
      <h3 className="card__title">{title}</h3>
      {renderDescriptions()}
    </div>
  );
}
