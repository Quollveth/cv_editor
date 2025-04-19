import { useEffect, useState } from 'react';
import { ContactInfo } from '../data';
import * as Logo from './logos/social';
import Select, { OptionProps, SingleValueProps } from 'react-select';

const ContactOptions: ContactInfo[] = [
    {
        name: '',
        which: 'github',
        url: 'https://github.com/',
        prefix: 'github.com/',
        logo: Logo.GitHub,
    },
    {
        name: '',
        which: 'bluesky',
        url: 'https://bsky.app/profile/',
        prefix: 'bsky.app/profile/',
        logo: Logo.Bluesky,
    },
    {
        name: '',
        which: 'linkedin',
        url: 'https://www.linkedin.com/in/',
        prefix: 'linkedin.com/in/',
        logo: Logo.LinkedIn,
    },
    {
        name: '',
        which: 'whatsapp',
        url: 'https://api.whatsapp.com/send?phone=',
        prefix: '+',
        logo: Logo.WhatsApp,
    },
    {
        name: '',
        which: 'email',
        url: 'mailto:',
        prefix: '',
        logo: Logo.Email,
    },
] as const;

const LogoSingleValue = (props: SingleValueProps<ContactInfo>) => {
    return <>{<props.data.logo className="h-8 w-8" />}</>;
};
const LogoOption = (props: OptionProps<ContactInfo>) => {
    return (
        <div ref={props.innerRef} {...props.innerProps}>
            {<props.data.logo className="h-8 w-8" />}
        </div>
    );
};

export interface ContactEditProps {
    initial: ContactInfo;
    onChange: (newContact: ContactInfo) => void;
}

export default function ContactEdit(props: ContactEditProps) {
    const [selected, setSelected] = useState<ContactInfo>(props.initial);

    const handleChange = (option: any) => {
        setSelected({ ...option, name: selected.name });
    };

    useEffect(() => {
        props.onChange(selected);
    }, [selected]);

    return (
        <div className="flex flex-1 items-end gap-2 h-10 min-w-min border border-gray-300 rounded">
            <div className="">
                <Select
                    value={selected}
                    onChange={handleChange}
                    options={ContactOptions}
                    styles={{
                        control: () => {
                            //prettier-ignore
                            return { display: 'flex', flexDirection: 'row-reverse', };
                        },
                        //prettier-ignore
                        dropdownIndicator: (base) => {
                            return { ...base, padding: '0', };
                        },
                        //prettier-ignore
                        indicatorSeparator:()=>{return {};},
                    }}
                    components={{
                        Option: LogoOption,
                        SingleValue: LogoSingleValue,
                    }}
                    isSearchable={false}
                />
            </div>
            <span className="flex flex-1 h-10 items-center  px-2 py-1 text-sm ">
                <span className="text-gray-400 min-w-fit">
                    {selected.prefix}
                </span>
                <input
                    className="w-full"
                    type="text"
                    value={selected.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSelected({ ...selected, name: e.target.value })
                    }
                />
            </span>
        </div>
    );
}
