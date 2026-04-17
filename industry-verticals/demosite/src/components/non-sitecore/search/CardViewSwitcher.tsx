import React from 'react';

import { CardViewSwitcher } from '@sitecore-search/ui';

type CardViewSwitcherProps = {
  onToggle: (value: string) => void;
  defaultCardView: 'list' | 'grid';
  GridIcon: React.FC;
  ListIcon: React.FC;
};

const CardViewSwitcherComponent = ({
  onToggle,
  defaultCardView,
  GridIcon,
  ListIcon,
}: CardViewSwitcherProps) => {
  return (
    <CardViewSwitcher.Root
      onValueChange={onToggle}
      defaultValue={defaultCardView}
      className="inline-flex"
    >
      <CardViewSwitcher.Item
        value="grid"
        aria-label="Grid View"
        className="data-[state=on]:text-primary-foreground focus:outline-accent bg-background text-foreground-light hover:bg-background-muted hover:text-foreground data-[state=on]:bg-accent mr-2 ml-0 flex size-7.5 items-center justify-center rounded-md"
      >
        <GridIcon />
      </CardViewSwitcher.Item>
      <CardViewSwitcher.Item
        value="list"
        aria-label="List View"
        className="data-[state=on]:text-primary-foreground focus:outline-accent bg-background text-foreground-light hover:bg-background-muted hover:text-foreground data-[state=on]:bg-accent ml-0 flex size-7.5 items-center justify-center rounded-md"
      >
        <ListIcon />
      </CardViewSwitcher.Item>
    </CardViewSwitcher.Root>
  );
};

export default CardViewSwitcherComponent;
