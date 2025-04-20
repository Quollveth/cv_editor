import { LoadCv, SaveCv } from '../helpers/saveLoad';
import { useContext, useEffect, useState } from 'react';
import { CVContext } from '../data';
import { AiInfo, DefaultAi } from '../ai/data';
import AiActions from './aiActionsPanel';
import DropdownButton from './dropdownButton';
import { SettingsContext } from '../settings';

const Panel = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [settings, setSettings] = useContext(SettingsContext);
    const [expandAi, setExpandAi] = useState(false);

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
        <div className="p-6 bg-white rounded-lg space-y-6 max-w-full">
            <div className="flex space-x-4 items-end">
                <button
                    onClick={() => SaveCv(CvData)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Save
                </button>
                <button
                    onClick={() => console.log(CvData)}
                    className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-500 transition"
                >
                    Print
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
                    Load
                </button>

                <div>
                    <span>AI Actions</span>
                    <AiActions />
                </div>
            </div>

            <div className="border-t pt-4">
                <DropdownButton state={expandAi} setState={setExpandAi} />

                {expandAi && (
                    <div className="mt-4 space-y-4">
                        <button
                            onClick={() => setAiSettings(DefaultAi())}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        >
                            Use Default
                        </button>
                        <div>
                            <label
                                htmlFor="endpoint"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Endpoint
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
                                Model Name
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
                                API Key
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
