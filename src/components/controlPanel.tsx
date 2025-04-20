import { LoadCv, SaveCv } from '../helpers/saveLoad';
import { useContext, useEffect, useState } from 'react';
import { CVContext } from '../data';
import { AIContext, AiInfo, DefaultAi } from '../ai/data';
import AiActions from './aiActionsPanel';
import DropdownButton from './dropdownButton';

const Panel = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [AiSettings, setAiSettings] = useContext(AIContext);
    const [expandAi, setExpandAi] = useState(false);

    const editAi = (data: Partial<AiInfo>) => {
        setAiSettings({
            ...AiSettings,
            ...data,
        });
    };

    useEffect(() => {
        if (AiSettings) {
            localStorage.setItem('AiSettings', JSON.stringify(AiSettings));
        }
    }, [AiSettings]);

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
                    onClick={async () => {
                        const cv = await LoadCv();
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
                                value={AiSettings.endpoint}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    editAi({
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
                                value={AiSettings.model}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    editAi({
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
                                value={AiSettings.token}
                                className="mt-1 w-full border border-gray-600 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onInput={(e) =>
                                    editAi({
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
