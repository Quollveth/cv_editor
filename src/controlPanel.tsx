import { LoadCv, SaveCv } from './helpers/saveLoad';
import { DropdownSymbol } from './components/svg';
import { useContext, useEffect, useState } from 'react';
import { CVContext } from './data';
import { AIContext, AiInfo, DefaultAi } from './ai/data';

const Panel = () => {
    const [CvData, setCvData] = useContext(CVContext);
    const [AiSettings, setAiSettings] = useContext(AIContext);
    const [expandAi, setExpandAi] = useState(true);

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
            <div className="flex space-x-4">
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
            </div>

            <div className="border-t pt-4">
                <button
                    onClick={() => setExpandAi(!expandAi)}
                    className="flex items-center space-x-2 text-sm hover:text-blue-500 hover:underline focus:outline-none"
                >
                    <div
                        className={`transform transition-transform duration-200 hover:text-blue-700 ${
                            expandAi ? 'rotate-0' : 'rotate-180'
                        }`}
                    >
                        <DropdownSymbol />
                    </div>
                    <span>
                        {expandAi ? 'Hide AI Settings' : 'Show AI Settings'}
                    </span>
                </button>

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
