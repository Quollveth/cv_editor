import React, { useContext, useState } from 'react';
import { CVContext } from '../data';
import DropdownButton from './dropdownButton';
import { AiRequest, PerformRequest } from '../ai/communication';
import { SettingsContext } from '../settings';
import { PanelLocale } from '../locale';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
    props
) => {
    return <button {...props} />;
};

const AiActions = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [Settings] = useContext(SettingsContext);

    const [expand, setExpand] = useState(false);

    const askAI = async (action: AiRequest) => {
        const resp = await PerformRequest(Settings, CvData, action);
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
                        {PanelLocale[Settings.language]['KEYWORDS']}
                    </StyledButton>
                    <StyledButton onClick={() => askAI('writeAbout')}>
                        {PanelLocale[Settings.language]['ABOUT']}
                    </StyledButton>
                </>
            )}
        </div>
    );
};
export default AiActions;
