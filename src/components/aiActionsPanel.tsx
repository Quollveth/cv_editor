import React, { useContext, useState } from 'react';
import { CVContext } from '../data';
import DropdownButton from './dropdownButton';
import { AiRequest, PerformRequest } from '../ai/communication';
import { SettingsContext } from '../settings';
import { PanelLocale } from '../locale';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
    props
) => {
    return (
        <button
            {...props}
            className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-gray-700 transition"
        />
    );
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
        <div className="flex items-start gap-2 z-10 shadow-lg border border-gray-200">
            <div className="rotate-90 transform origin-center">
                <DropdownButton state={expand} setState={setExpand} />
            </div>

            {expand && (
                <div className="flex gap-2 bg-white p-3 rounded-lg ">
                    <StyledButton onClick={() => askAI('getKeywords')}>
                        {PanelLocale[Settings.language]['KEYWORDS']}
                    </StyledButton>
                    <StyledButton onClick={() => askAI('writeAbout')}>
                        {PanelLocale[Settings.language]['ABOUT']}
                    </StyledButton>
                </div>
            )}
        </div>
    );
};
export default AiActions;
