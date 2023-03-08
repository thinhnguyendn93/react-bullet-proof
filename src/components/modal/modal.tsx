import classNames from 'classnames';
import { Modal as AntModal } from 'antd';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { FontIcon } from 'components/font-icon';

interface Props {
  visible?: boolean;
  title?: string;
  closable?: boolean;
  size?: 'medium' | 'small' | 'large';
  footer?: React.ReactNode;
  className?: string;
  maskClosable?: boolean;
  fullScreen?: boolean;
  zIndex?: number;
  onClose: () => void;
  afterClose?: () => void;
}

export function ModalLayout(props: PropsWithChildren<Props>) {
  const {
    title,
    children,
    closable,
    visible,
    size,
    footer,
    className,
    maskClosable = false,
    fullScreen,
    zIndex,
    onClose,
    afterClose,
  } = props;

  const [show, setShow] = useState(visible);

  useEffect(() => {
    setTimeout(() => {
      setShow(visible);
    }, 100);
  }, [visible]);

  const classes = classNames('ant-modal-wrapper', className, {
    [`ant-modal--fullscreen`]: fullScreen,
  });

  const getSize = useCallback(() => {
    if (size == 'large') {
      return 800;
    }
    if (size == 'small') {
      return 400;
    }
    return 600;
  }, [size]);

  return (
    <AntModal
      mask
      centered
      destroyOnClose
      className={classes}
      zIndex={zIndex}
      open={visible}
      title={title}
      closable={closable}
      maskClosable={maskClosable}
      footer={footer || []}
      width={getSize()}
      onCancel={onClose}
      afterClose={afterClose}
      closeIcon={<FontIcon name="close" size={24} />}
    >
      {show && children}
    </AntModal>
  );
}
