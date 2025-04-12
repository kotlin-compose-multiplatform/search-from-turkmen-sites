import React, { useEffect, useState } from 'react';
import NotFound from './NotFound';

const extractSummaryPrompt = (results) => {
    const summaryText = results
        .map((item, index) => `${index + 1}. ${item.title} — ${item.snippet}`)
        .join('\n');

    return `Aşakdaky maglumatlara esaslanyp, türkmen dilinde gysgaça beýan ber:\n\n${summaryText}`;
};

const summarizeInTurkmen = async (results) => {
    const prompt = extractSummaryPrompt(results);

    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDITd0QkAwYXN672sfguvtk72JtTqtzirk',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
        }
    );

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return summary;
};

const DefaultSearch = ({ results }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (results && results.length > 0) {
            setLoading(true);
            summarizeInTurkmen(results)
                .then((text) => {
                    if (text) setSummary(text);
                })
                .finally(() => setLoading(false));
        }
    }, [results]);

    if (!results || results.length === 0) return <NotFound />;

    return (
        <section className="px-4 sm:px-12 md:px-24 lg:px-48 py-8 space-y-8">

            {/* ✅ Gemini AI Summary */}
            {loading ? (
                <div className="bg-yellow-50 dark:bg-yellow-900 p-5 rounded-xl border-l-4 border-yellow-500 animate-pulse">
                    <h2 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                        Mazmun düzüilýär...
                    </h2>
                    <div className="h-4 bg-yellow-200 dark:bg-yellow-700 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-yellow-200 dark:bg-yellow-700 rounded mb-2 w-4/6"></div>
                    <div className="h-4 bg-yellow-200 dark:bg-yellow-700 rounded w-3/6"></div>
                </div>
            ) : summary && (
                <div className="bg-yellow-50 dark:bg-yellow-900 p-5 rounded-xl border-l-4 border-yellow-500">
                    <h2 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                        AI tarapyndan düzülen gysgaça mazmun (Türkmen dilinde):
                    </h2>
                    <p className="text-sm text-yellow-900 dark:text-yellow-100 whitespace-pre-wrap">
                        {summary}
                    </p>
                </div>
            )}

            {/* ✅ Search Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {results.map((result, index) => (
                    <a
                        key={index}
                        href={result.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-4 sm:p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 hover:underline">
                            {result.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1 sm:mb-2">
                            {result.formattedUrl}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {result.snippet.length > 200
                                ? result.snippet.substring(0, 200) + '...'
                                : result.snippet}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default DefaultSearch;
