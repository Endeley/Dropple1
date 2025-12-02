"use client";

import { useState } from 'react';
import { useAiContext } from '../aiContext';
import AiCommandInput from './AiCommandInput';
import AiSuggestionPanel from './AiSuggestionPanel';

export default function AiChatPanel() {
    const { history, runCommand, isRunning } = useAiContext();
    const [input, setInput] = useState('');

    const handleSubmit = async (value = input) => {
        if (!value.trim()) return;
        await runCommand(value.trim());
        if (value === input) {
            setInput('');
        }
    };

    return (
        <div className='w-full h-full flex flex-col text-white'>
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <p className='text-xs uppercase tracking-wide text-zinc-400'>Dropple AI</p>
                    <h2 className='text-xl font-semibold'>Assistant 2.0</h2>
                </div>
                <span className='text-xs text-zinc-500'>{isRunning ? 'Working…' : 'Ready'}</span>
            </div>

            <div className='flex-1 overflow-y-auto space-y-3 pr-1'>
                {history.length === 0 && (
                    <p className='text-sm text-zinc-400'>Describe what you want. The AI can edit, align, recolor, and generate layouts.</p>
                )}
                {history.map((entry, index) => (
                    <div
                        key={`${entry.role}-${index}`}
                        className={entry.role === 'user' ? 'text-sm text-blue-300' : 'text-sm text-green-300'}
                    >
                        {entry.text}
                    </div>
                ))}
            </div>

            <AiSuggestionPanel onSelect={handleSubmit} disabled={isRunning} />
            <AiCommandInput value={input} onChange={setInput} onSubmit={handleSubmit} loading={isRunning} />
        </div>
    );
}
