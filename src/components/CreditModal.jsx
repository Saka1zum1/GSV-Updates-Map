import { useEffect } from 'react';
import { X, Github, Heart, Code, Globe, FileIcon, Users, Box } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import WITGCIcon from './witgcIcon.jsx';
import { MdCloud } from 'react-icons/md';

const CreditModal = ({ isOpen, onClose }) => {
    // 键盘事件处理（Esc关闭）
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <Heart size={26} className="text-red-500" />
                        <span>Credits</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Project Information */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Globe size={24} className="text-blue-500" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    VirtualStreets Updates Map
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Interactive map tracking Google Street View updates & car spottings & peak locations
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Sources */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <MdCloud size={22} className="text-orange-500" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Sources</h4>
                        </div>
                        <div className="ml-8 space-y-2 text-sm">
                            <p className="flex text-gray-700 dark:text-gray-300 gap-2 items-center">
                                <FcGoogle size={20} />
                                <a href="https://www.google.com/maps"
                                    target="_blank"
                                    className="text-base text-blue-600 dark:text-blue-400 hover:underline">
                                    Google Maps
                                </a>
                                <span>— Base mapping and Street View coverage data</span>
                            </p>
                            <p className="flex text-gray-700 dark:text-gray-300 gap-2 items-center">
                                <BsDiscord size={20} fill={"#5865f2"} />
                                <a href="https://discord.com/channels/747030604897452130"
                                    target="_blank"
                                    className="text-base text-blue-600 dark:text-blue-400 hover:underline">
                                    VirtualStreets
                                </a>
                                <span>— Community-contributed Street View updates and car spottings</span>
                            </p>
                            <p className="flex text-gray-700 dark:text-gray-300 gap-2 items-center">
                                <WITGCIcon width={20} height={20}
                                    className="text-gray-800 dark:text-gray-200" />
                                <a
                                    href="https://www.whereisthegooglecar.com/"
                                    target="_blank"
                                    className="text-base text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Where Is The Google Car
                                </a>
                                <span>— Street View car spottings imagery and data</span>
                            </p>
                        </div>
                    </div>

                    {/* Special Thanks */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <Users size={22} className="text-pink-500" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Special Thanks</h4>
                        </div>
                        <div className="ml-8 space-y-2 text-sm">
                            <p className="text-gray-700 dark:text-gray-300">
                                • Individuals worldwide who share Google Street View car spottings
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                • Community members from VirtualStreets who actively track Street View updates
                            </p>
                            <div className="text-gray-700 dark:text-gray-300">
                                <span className="block text-base font-semibold mb-1">Great thanks to
                                    <a href="https://github.com/ReAnnannanna" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">ReAnna</a>,
                                    <a href="https://github.com/sk-zk" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">skzk</a>,
                                    <a href="https://github.com/tzhf" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">rollin</a>, and
                                    <a href="https://github.com/n-s-j/" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">NSJ</a>
                                </span>
                                <span className="block ml-4 text-gray-500 dark:text-gray-400">for their inspiration and contributions. Portions of this project's code are derived from their repositories.</span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                                <span className="block text-base font-semibold mb-1">Great thanks to
                                    <a href="https://github.com/ktzug" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">ktz</a> and
                                    <a href="https://github.com/sebm253" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">cane</a>
                                </span>
                                <span className="block ml-4 text-gray-500 dark:text-gray-400">for their generous support of this project, especially ktz for providing free database hosting services.</span>
                            </div>
                        </div>
                    </div>

                    
                    {/* Developer */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <Code size={22} className="text-green-500" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Developer</h4>
                        </div>
                        <div className="ml-8 space-y-2">
                            <div className="flex items-center space-x-2">
                                <BsGithub size={20} className="text-gray dark:text-gray-200" />
                                <a
                                    href="https://github.com/Saka1zum1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    kakageo • 卡卡
                                </a>
                            </div>
                            <p className="text-md text-gray-600 dark:text-gray-400">
                                Project creator and lead developer
                            </p>
                        </div>
                    </div>

                    {/* License */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <FileIcon size={22} className="text-indigo-500" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">License</h4>
                        </div>
                        <div className="ml-8 space-y-2">
                            <p className="text-base text-gray-700 dark:text-gray-300">
                                This project is open source and distributed under the MIT License.
                            </p>
                            <div className="flex items-center space-x-2">
                                <BsGithub size={20} className="text-gray dark:text-gray-200" />
                                <a
                                    href="https://github.com/Saka1zum1/GSV-Updates-Map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-md text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                >
                                    View on GitHub
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                    {/* Version Information */}
                    <div className="border-t border-gray-200 dark:border-gray-600 p-2">
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 items-center">
                            <p>
                                <Box size={16} className="inline text-red-500 dark:text-green-500 mx-1" />
                                Version 1.0.0 • September 2025
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default CreditModal;
