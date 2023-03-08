import { Col, Drawer, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/form-ui/button';
import { isMobile } from 'utils/helper';
import { RouterPath } from 'routers/router-path';
import { Logo } from 'components/logo';
import { FontIcon } from 'components/font-icon';
import { ContactModal } from 'modals/contact-modal';

export function Header() {
  const { t } = useTranslation();
  const mobile = isMobile();
  const [visbile, setVisible] = useState(false);
  const [visibleContact, setVisbileContact] = useState(false);
  const selectedKey = useLocation();

  let pathName = selectedKey.pathname;
  pathName = pathName !== RouterPath.home ? pathName : RouterPath.home;
  const isActive = pathName.split(RouterPath.home)[1];

  const getMenuItems = (): MenuProps['items'] => {
    return [
      {
        label: <Link to={RouterPath.home}>{t('home')}</Link>,
        key: '',
      },
    ];
  };

  const renderMenu = () => {
    return (
      <Menu
        selectedKeys={[isActive]}
        mode={mobile ? 'inline' : 'horizontal'}
        items={getMenuItems()}
        overflowedIndicator={<FontIcon name="menu" size={24} />}
      />
    );
  };

  const renderDrawer = () => {
    return (
      <Drawer className="mobile-menu" title="" width="100%" open={visbile}>
        <Col span={24}>
          <div className="page-header">
            <Logo />
            <div className="page-header__actions">
              <Button
                icon="close"
                size="medium"
                onClick={() => setVisible(false)}
              />
            </div>
          </div>
          {renderMenu()}
        </Col>
      </Drawer>
    );
  };

  return (
    <div className="app-header">
      <div className="app-header__wrapper">
        <Logo />
        <div className="app-header__menu">{!mobile && renderMenu()}</div>
        <div className="app-header__actions">
          {mobile && (
            <Button
              icon="menu"
              size="medium"
              onClick={() => setVisible(true)}
            />
          )}
          <Button
            type="primary"
            size="small"
            label={t('get_in_touch')}
            onClick={() => setVisbileContact(true)}
          />
        </div>
        {renderDrawer()}
      </div>
      <ContactModal
        visible={visibleContact}
        onClose={() => setVisbileContact(false)}
      />
    </div>
  );
}
