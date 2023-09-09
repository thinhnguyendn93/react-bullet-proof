import { Button } from 'components/form-ui';
import { useCopy } from 'utils/use-copy';

interface Props {
  content: string;
  onClick?: () => void;
}

export function ClipboardCopy(props: Props) {
  const { content, onClick } = props;
  const { onCopy } = useCopy();

  return (
    <div className="clipboard-copy">
      {content && (
        <Button
          type="text"
          icon="content-copy"
          onClick={() => onCopy(content)}
        />
      )}
      <span className="clipboard-copy__content" onClick={onClick}>
        {content}
      </span>
    </div>
  );
}
