import React, { useContext, useState } from 'react';
import { AIContext } from '../ai/data';
import { CVContext } from '../data';
import DropdownButton from './dropdownButton';
import { AiRequest, PerformRequest } from '../ai/communication';
import { SettingsContext } from '../settings';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
    props
) => {
    return <button {...props} />;
};

const AiActions = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [AiSettings] = useContext(AIContext);
    const [Settings] = useContext(SettingsContext);

    const [expand, setExpand] = useState(false);

    const askAI = async (action: AiRequest) => {
        const resp = await PerformRequest(AiSettings, CvData, Settings, action);
        console.log(resp);
        setCvData(resp);
    };

    return (
        <div className="flex">
            <div className="rotate-90 w-min h-min">
                <DropdownButton state={expand} setState={setExpand} />
            </div>

            {expand && (
                <>
                    <StyledButton onClick={() => askAI('getKeywords')}>
                        Get Keywords
                    </StyledButton>
                    <StyledButton onClick={() => askAI('writeAbout')}>
                        Write About Section
                    </StyledButton>
                </>
            )}
        </div>
    );
};
export default AiActions;
