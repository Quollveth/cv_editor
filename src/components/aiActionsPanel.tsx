import React, { useContext, useState } from 'react';
import { AIContext } from '../ai/data';
import { CVContext } from '../data';
import DropdownButton from './dropdownButton';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
    props
) => {
    return <button {...props} />;
};

const AiActions = () => {
    const [CvData] = useContext(CVContext);
    const [AiSettings] = useContext(AIContext);

    const [expand, setExpand] = useState(false);

    return (
        <div className="flex">
            <div className="rotate-90 w-min h-min">
                <DropdownButton state={expand} setState={setExpand} />
            </div>

            {expand && (
                <>
                    <StyledButton>test</StyledButton>
                </>
            )}
        </div>
    );
};
export default AiActions;
