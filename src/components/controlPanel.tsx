import { LoadCv, SaveCv } from '../helpers/saveLoad';
import { useContext, useEffect, useState } from 'react';
import { CVContext } from '../data';
import { AiInfo, DefaultAi } from '../ai/data';
import AiActions from './aiActionsPanel';
import DropdownButton from './dropdownButton';
import { SettingsContext } from '../settings';
import { PanelLocale } from '../locale';

const Panel = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [settings, setSettings] = useContext(SettingsContext);
    const [expandSettings, setExpandSettings] = useState(false);

    const setAiSettings = (data: Partial<AiInfo>) => {
        setSettings((prev) => {
            return {
                ...prev,
                agent: {
                    ...prev.agent,
                    ...data,
                },
            };
        });
    };

    useEffect(() => {
        if (settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
        }
    }, [settings]);

    return (
        <div className="px-6 py-2 w-full flex flex-col">
            <div className="flex gap-2 items-start">
                <button
                    onClick={() => SaveCv(CvData)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {PanelLocale[settings.language]['SAVE']}
                </button>
                <button
                    onClick={async () => {
                        const cv = await LoadCv();
                        if (!cv) {
                            return;
                        }
                        setCvData(cv);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                    {PanelLocale[settings.language]['LOAD']}
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <div className="px-4 py-2 rounded transition w-fit flex items-center">
                    <span>{PanelLocale[settings.language]['EXPAND']}</span>
                    <div>
                        <DropdownButton
                            state={expandSettings}
                            setState={setExpandSettings}
                        />
                    </div>
                </div>
                <div className="flex-1" />
                <AiActions />
            </div>
            <div>
                {expandSettings && (
                    <div className="mt-4 space-y-4">
                        <button
                            onClick={() => setAiSettings(DefaultAi())}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        >
                            {PanelLocale[settings.language]['DEFAULT']}
                        </button>
                        <div>
                            <label
                                htmlFor="endpoint"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {PanelLocale[settings.language]['ENDPOINT']}
                            </label>
                            <input
                                id="endpoint"
                                type="text"
                                value={settings.agent.endpoint}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    setAiSettings({
                                        endpoint: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="model"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {PanelLocale[settings.language]['MODEL']}
                            </label>
                            <input
                                id="model"
                                type="text"
                                value={settings.agent.model}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    setAiSettings({
                                        model: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="token"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {PanelLocale[settings.language]['TOKEN']}
                            </label>
                            <textarea
                                id="token"
                                value={settings.agent.token}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    setAiSettings({
                                        token: (e.target as HTMLTextAreaElement)
                                            .value,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Panel;
