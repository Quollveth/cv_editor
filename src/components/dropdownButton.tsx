import { Dispatch, SetStateAction } from 'react';
import { DropdownSymbol } from './svg';

type DropdownButtonProps = {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
};

const DropdownButton = (props: DropdownButtonProps) => {
    return (
        <button
            onClick={() => props.setState(!props.state)}
            className="text-sm hover:text-blue-500 focus:outline-none"
        >
            <div
                className={`transform transition-transform duration-200 hover:text-blue-700 ${
                    props.state ? 'rotate-0' : 'rotate-180'
                }`}
            >
                <DropdownSymbol />
            </div>
        </button>
    );
};

export default DropdownButton;
