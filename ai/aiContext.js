"use client";

import { createContext, useCallback, useContext, useState } from 'react';
import { runAiCommand } from './aiRuntime';

const AiContext = createContext(null);

export const AiProvider = ({ canvas, children }) => {
    const [history, setHistory] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const execute = useCallback(
        async (command) => {
            if (!command?.trim() || !canvas || isRunning) return null;

            setHistory((prev) => [...prev, { role: 'user', text: command }]);
            setIsRunning(true);

            try {
                const result = await runAiCommand(command, canvas);
                setHistory((prev) => [...prev, { role: 'assistant', text: result?.message || 'Done.' }]);
                return result;
            } catch (error) {
                setHistory((prev) => [...prev, { role: 'assistant', text: 'Something went wrong.' }]);
                throw error;
            } finally {
                setIsRunning(false);
            }
        },
        [canvas, isRunning]
    );

    const value = {
        canvas,
        history,
        runCommand: execute,
        isRunning,
    };

    return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
};

export const useAiContext = () => {
    const context = useContext(AiContext);
    if (!context) throw new Error('useAiContext must be used inside an AiProvider');
    return context;
};
