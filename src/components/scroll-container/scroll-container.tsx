import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface Props {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  autoScroll?: boolean;
}

export function ScrollContainer(props: Props) {
  const { header, children, footer, className, autoScroll } = props;
  const scrollRef = useRef<HTMLSpanElement>();

  useLayoutEffect(() => {
    if (scrollRef?.current && autoScroll) {
      scrollRef.current.scrollIntoView();
    }
  });

  return (
    <div
      className={classNames('scroll-container', {
        [className]: className,
      })}
    >
      <div className="scroll-container__header">{header}</div>
      <div className="scroll-container__body">
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          {children}
          <span ref={scrollRef} />
        </PerfectScrollbar>
      </div>
      <div className="scroll-container__footer">{footer}</div>
    </div>
  );
}
