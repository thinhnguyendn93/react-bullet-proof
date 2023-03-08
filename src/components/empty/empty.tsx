import { useTranslation } from 'react-i18next';
import { Empty as AntEmpty } from 'antd';
import { Button } from 'components/form-ui/button';
import { RESOURCES } from 'config/constant';

interface Props {
  hasSearch?: boolean;
  description?: string;
  subDescription?: string;
  image?: string;
  labelAddNew?: string;
  icon?: string;
  onCreate?: () => void;
}

export function Empty(props: Props) {
  const { t } = useTranslation();
  const {
    hasSearch,
    description,
    subDescription,
    image,
    labelAddNew,
    icon,
    onCreate,
  } = props;

  if (hasSearch) {
    return (
      <AntEmpty
        image={RESOURCES.NO_RESULT}
        description={
          <div>
            <p className="ant-empty__description">{t('no_results_found')}</p>
            <span className="ant-empty__sub-description">
              {t('no_results_found_sub_description')}
            </span>
          </div>
        }
      />
    );
  }

  return (
    <AntEmpty
      image={image}
      description={
        <div>
          <p className="ant-empty__description">{description}</p>
          <span className="ant-empty__sub-description">{subDescription}</span>
        </div>
      }
    >
      {onCreate && (
        <Button
          type="primary"
          label={labelAddNew}
          onClick={onCreate}
          icon={icon}
        />
      )}
    </AntEmpty>
  );
}
