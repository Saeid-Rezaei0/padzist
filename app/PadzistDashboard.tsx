"use client"
import React, { useState } from 'react';
// Mock Data Types (replace with actual types if connecting to backend)
interface ExamResult {
    id: string;
    examName: string;
    score: number; // Taras
    percentage: number;
    date: string;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    score: number; // Taras
}

// Placeholder function for AI summarization (replace with actual API call)
const fetchAiSummary = async (text: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!text.trim()) {
                resolve("لطفا متنی برای خلاصه کردن وارد کنید.");
            } else {
                resolve(`خلاصه متن شما: "${text.substring(0, 50)}..." (این یک خلاصه نمونه است)`);
            }
        }, 1500); // Simulate network delay
    });
};

const PadzistDashboard: React.FC = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true); // Default to subscribed for demo
    const [aiInputText, setAiInputText] = useState<string>('');
    const [aiSummary, setAiSummary] = useState<string>('');
    const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);

    // Mock Data
    const recentResults: ExamResult[] = [
        { id: '1', examName: 'آزمون زیست فصل ۱', score: 8500, percentage: 85, date: '۱۴۰۳/۰۲/۱۰' },
        { id: '2', examName: 'آزمون جامع شیمی', score: 7800, percentage: 78, date: '۱۴۰۳/۰۲/۱۵' },
    ];

    const leaderboard: LeaderboardEntry[] = [
        { rank: 1, name: 'دانش آموز اول', score: 9200 },
        { rank: 2, name: 'دانش آموز دوم', score: 9150 },
        { rank: 3, name: 'دانش آموز سوم', score: 8900 },
    ];

    const handleSummarizeClick = async () => {
        if (!isSubscribed) {
            alert("برای استفاده از خلاصه‌ساز هوش مصنوعی، لطفا اشتراک خود را فعال کنید.");
            return;
        }
        setIsLoadingSummary(true);
        setAiSummary('');
        const summary = await fetchAiSummary(aiInputText);
        setAiSummary(summary);
        setIsLoadingSummary(false);
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-[Vazirmatn,sans-serif]"> {/* Assuming Vazirmatn font is globally available */}
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-teal-700">پادزیست</h1>
                <div className="flex items-center space-x-reverse space-x-4">
                    <span className="text-sm text-gray-600">کاربر نمونه</span>
                    <div className="bg-teal-200 border-2 border-teal-400 rounded-full w-20 gap-3 h-10 flex items-center justify-center text-teal-700 font-bold">
                        علی رضایی
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">اقدامات سریع</h2>
                    <div className="space-y-3">
                        <button className="w-full text-right bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300">
                            ایجاد آزمون جدید
                        </button>
                        <button className="w-full text-right bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-300">
                            مشاهده آزمون‌های من
                        </button>
                        <button className="w-full text-right bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                            مشاهده نتایج و تراز
                        </button>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">نفرات برتر اخیر</h2>
                    <ul className="space-y-2">
                        {leaderboard.map((entry) => (
                            <li key={entry.rank} className="flex justify-between items-center p-2 rounded bg-gray-50">
                                <span className="font-medium text-gray-700">{entry.rank}. {entry.name}</span>
                                <span className="text-sm font-semibold text-teal-600">{entry.score} تراز</span>
                            </li>
                        ))}
                    </ul>
                     <button className="mt-4 w-full text-center text-sm text-teal-600 hover:text-teal-800">
                        مشاهده کامل نفرات برتر
                    </button>
                </div>

                {/* AI Summarizer */}
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">خلاصه‌ساز هوشمند پادزیست</h2>
                    {!isSubscribed && (
                         <div className="mb-3 p-3 bg-yellow-100 border-r-4 border-yellow-500 text-yellow-700 rounded">
                            <p className="font-bold">ویژگی مخصوص اعضا</p>
                            <p className="text-sm">برای استفاده از این قابلیت، اشتراک خود را فعال کنید.</p>
                        </div>
                     )}
                    <textarea
                        rows={5}
                        value={aiInputText}
                        onChange={(e) => setAiInputText(e.target.value)}
                        placeholder="متن یا مطلب مورد نظر خود را اینجا وارد کنید تا توسط هوش مصنوعی خلاصه شود..."
                        className={`w-full p-3 border placeholder:text-gray-900 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none ${!isSubscribed ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300'}`}
                        disabled={!isSubscribed || isLoadingSummary}
                    />
                    <button
                        onClick={handleSummarizeClick}
                        disabled={!isSubscribed || isLoadingSummary || !aiInputText.trim()}
                        className={`mt-3 w-full px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
                            !isSubscribed
                                ? 'bg-gray-400 cursor-not-allowed'
                                : isLoadingSummary || !aiInputText.trim()
                                ? 'bg-teal-300 cursor-not-allowed'
                                : 'bg-teal-500 hover:bg-teal-600'
                        }`}
                    >
                        {isLoadingSummary ? 'در حال پردازش...' : 'خلاصه کن'}
                    </button>
                    {aiSummary && (
                        <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-gray-700">
                            <p className="font-semibold mb-1 text-teal-800">نتیجه خلاصه:</p>
                            <p>{aiSummary}</p>
                        </div>
                    )}
                </div>

                 {/* Recent Results */}
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 md:col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">نتایج آزمون‌های اخیر</h2>
                    {recentResults.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام آزمون</th>
                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تراز</th>
                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">درصد</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentResults.map((result) => (
                                        <tr key={result.id}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{result.examName}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-600 font-semibold">{result.score}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-cyan-600 font-semibold">{result.percentage}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">هنوز در هیچ آزمونی شرکت نکرده‌اید.</p>
                    )}
                </div>


                {/* Subscription Status */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-5 rounded-xl shadow-lg lg:col-span-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">وضعیت اشتراک</h2>
                        {isSubscribed ? (
                            <div>
                                <p className="text-lg font-medium">طرح فعال: ویژه پادزیست</p>
                                <p className="text-sm opacity-90 mt-1">تاریخ انقضا: 1404/۱۲/۲۹</p>
                            </div>
                        ) : (
                             <div>
                                <p className="text-lg font-medium">اشتراک شما فعال نیست.</p>
                                <p className="text-sm opacity-90 mt-1">با فعالسازی اشتراک به تمام امکانات دسترسی پیدا کنید.</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsSubscribed(!isSubscribed)} // Toggle for demo
                        className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                            isSubscribed
                                ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                                : 'bg-white hover:bg-gray-100 text-teal-700'
                        }`}
                    >
                        {isSubscribed ? 'مدیریت اشتراک' : 'فعالسازی / ارتقا اشتراک'}
                    </button>
                </div>

            </main>

            <footer className="mt-12 text-center text-sm text-gray-500">
                © ۱۴۰۳ پادزیست. تمامی حقوق محفوظ است.
            </footer>
        </div>
    );
};

export default PadzistDashboard;