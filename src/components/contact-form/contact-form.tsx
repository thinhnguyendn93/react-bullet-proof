import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/form-ui/input';
import { Button } from 'components/form-ui/button';
import { notifySuccess } from 'utils/toast';
import { emailRule } from 'utils/validation-rules';

interface Props {
  onSubmit: () => Promise<void>;
}

export function ContactForm(props: Props) {
  const { t } = useTranslation();
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    onSubmit().finally(() => {
      setLoading(false);
      form.resetFields();
      notifySuccess(
        t('thank_you_for_contacting_us_we_will_reply_as_soon_as_possible'),
      );
    });
  };

  return (
    <Form
      form={form}
      className="my-account-page__form"
      autoComplete="off"
      layout="vertical"
      preserve={false}
      onFinish={onFinish}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Input
            label={t('full_name')}
            placeholder={t('full_name_placeholder')}
            name="fullName"
            rules={[
              {
                required: true,
                message: t('full_name_is_required'),
              },
            ]}
            autoFocus
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Input
            label={t('email')}
            placeholder={t('email_placeholder')}
            name="email"
            rules={[
              {
                required: true,
                message: t('email_is_required'),
              },
              emailRule(),
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Input
            label={t('phone_number')}
            placeholder={t('phone_number_placeholder')}
            name="phoneNumber"
            maxLength={255}
            rules={[
              {
                required: true,
                message: t('phone_number_is_required'),
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <Input
            label={t('message')}
            placeholder={t('message_placeholder')}
            name="message"
            maxLength={255}
            rules={[
              {
                required: true,
                message: t('message_is_required'),
              },
            ]}
            textArea
            rows={4}
          />
        </Col>
      </Row>
      <Row className="ant-form__footer" justify="center" gutter={[8, 8]}>
        <Button
          buttonType="submit"
          label={t('submit')}
          type="primary"
          size="medium"
          loading={loading}
        />
      </Row>
    </Form>
  );
}
