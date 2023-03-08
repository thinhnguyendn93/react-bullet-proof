import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { ArgsProps } from 'antd/lib/message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { notification, message as messageApi } from 'antd';
import i18n from 'config/i18n';
import { uuidv4 } from './helper';

export function notifySuccess(message: string) {
  notification.success({
    message: i18n.t('successfully') as string,
    description: message,
  });
}

export function notifyError(
  message: FetchBaseQueryError | SerializedError | string,
) {
  const title = i18n.t('some_thing_went_wrong') as string;
  if (typeof message === 'string') {
    notification.error({
      message: title,
      description: message as string,
    });
  } else {
    notification.error({
      message: title,
      description: i18n.t(
        (message as FetchBaseQueryError).data as string,
      ) as string,
    });
  }
}

export function notifyWarning(message: string) {
  notification.warning({
    message: i18n.t('warning') as string,
    description: message,
  });
}

export function notifyInfo(message: string) {
  notification.info({
    message: i18n.t('did_you_know') as string,
    description: message,
  });
}

export function notifyProgress(message: string, icon?: React.ReactNode) {
  messageApi.success({
    content: message,
    icon,
  });
}

export function notifyLoading(props: ArgsProps): string {
  const key = uuidv4();
  messageApi.loading({
    ...props,
    key,
  });
  return key;
}

export function destroyNotify(key: string) {
  messageApi.destroy(key);
}
