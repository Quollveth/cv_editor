import { JSX } from 'react';

export interface ContactInfo {
    name: string;
    url: string;
    logo?: (props: any) => JSX.Element;
}
