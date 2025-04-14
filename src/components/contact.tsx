import { useState } from 'react';
import { ContactInfo } from '../data';
import * as Logo from './logos/social';
import Select, { OptionProps, SingleValueProps } from 'react-select';

const ContactOptions: ContactInfo[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/',
        prefix: 'github.com/',
        logo: Logo.GitHub,
    },
    {
        name: 'Bluesky',
        url: 'https://bsky.app/profile/',
        prefix: 'bsky.app/profile/',
        logo: Logo.Bluesky,
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/',
        prefix: 'linkedin.com/in/',
        logo: Logo.LinkedIn,
    },
    {
        name: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?phone=',
        prefix: '+',
        logo: Logo.WhatsApp,
    },
    {
        name: 'Email',
        url: 'mailto:',
        prefix: '',
        logo: Logo.Email,
    },
] as const;

const LogoSingleValue = (props: SingleValueProps<ContactInfo>) => {
    return <>{<props.data.logo class="h-8 w-8" />}</>;
};
const LogoOption = (props: OptionProps<ContactInfo>) => {
    return (
        <div ref={props.innerRef} {...props.innerProps}>
            {<props.data.logo class="h-8 w-8" />}
        </div>
    );
};

export default function ContactEdit() {
    const [selected, setSelected] = useState<ContactInfo>(ContactOptions[0]);

    const handleChange = (option: any) => {
        setSelected(option);
    };

    // prettier-ignore
    const noStyle=()=>{return {};};

    return (
        <div className="flex items-end gap-2 h-10 w-fit border border-gray-300 rounded">
            <div className="">
                <Select
                    value={selected}
                    onChange={handleChange}
                    options={ContactOptions}
                    styles={{
                        control: (base) => {
                            return {
                                display: 'flex',
                                flexDirection: 'row-reverse',
                            };
                        },
                        dropdownIndicator: (base) => {
                            return {
                                ...base,
                                padding: '0',
                            };
                        },
                        indicatorSeparator: noStyle,
                    }}
                    components={{
                        Option: LogoOption,
                        SingleValue: LogoSingleValue,
                    }}
                    isSearchable={false}
                />
            </div>
            <span className="flex h-10 items-center  px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <span className="text-gray-400">{selected.prefix}</span>
                <input type="text" />
            </span>
        </div>
    );
}
