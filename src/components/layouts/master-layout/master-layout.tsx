import { ConfigProvider, theme } from 'antd';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Header } from './elements/header';

interface Props {
  children: React.ReactNode;
  hideScroll?: boolean;
  header?: React.ReactNode;
}

export function MasterLayout(props: Props) {
  const { children, hideScroll, header } = props;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode] = useState(false);

  const renderChildren = () => {
    if (hideScroll) {
      return children;
    }

    return (
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {children}
      </PerfectScrollbar>
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className="master-layout">
        <Header />
        <div id="page-body" className="master-body">
          {renderChildren()}
        </div>
      </div>
    </ConfigProvider>
  );
}
