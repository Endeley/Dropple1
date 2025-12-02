"use client";

import { useTemplatePurchase } from '../hooks/useTemplatePurchase';

export default function BuyButton({ templateId, price }) {
    const { purchase, status } = useTemplatePurchase();

    const handleClick = async () => {
        try {
            await purchase(templateId);
            alert('Purchase successful!');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={status === 'loading'}
            className='px-4 py-2 rounded bg-green-600 text-white disabled:bg-zinc-700'
        >
            {status === 'loading' ? 'Processing…' : price === 0 ? 'Get for Free' : `Buy for $${price}`}
        </button>
    );
}
