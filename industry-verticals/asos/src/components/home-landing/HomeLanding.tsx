'use client';

import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import HomeBanner from '@/components/home-banner/HomeBanner';
import Edit from '@/components/edit/Edit';
import NewIn from '@/components/new-in/NewIn';

type Props = ComponentProps;

/** Kept so an unpublished home item still renders the three sections. */
export const Default = (props: Props): JSX.Element => (
  <>
    <HomeBanner rendering={props.rendering} params={{}} />
    <Edit rendering={props.rendering} params={{}} />
    <NewIn rendering={props.rendering} params={{}} />
  </>
);

export default Default;
