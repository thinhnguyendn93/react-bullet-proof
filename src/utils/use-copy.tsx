import { FontIcon } from 'components/font-icon';
import { notifyProgress } from 'utils/toast';

export function useCopy() {
  const onCopy = (content: string) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      unsecuredCopyToClipboard(content);
    }
    notifyProgress(
      'copied',
      <FontIcon name="content-copy" size={16} color="science-blue" />,
    );
  };

  const unsecuredCopyToClipboard = (value: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  };

  return {
    onCopy,
  };
}
