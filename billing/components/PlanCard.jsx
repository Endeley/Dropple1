"use client";

export default function PlanCard({ name, price, features, planId, description }) {
    const checkout = async () => {
        const res = await fetch('/api/billing/createCheckoutSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ planId }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
    };

    return (
        <div className='p-6 bg-zinc-900 rounded-xl border border-zinc-700 flex flex-col'>
            <h2 className='text-2xl font-bold mb-1'>{name}</h2>
            {description && <p className='text-zinc-400 text-sm mb-3'>{description}</p>}
            <p className='text-4xl font-bold mb-4'>${price}<span className='text-base text-zinc-400'>/mo</span></p>
            <ul className='space-y-2 text-zinc-300 flex-1'>
                {features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                ))}
            </ul>
            <button onClick={checkout} className='mt-6 bg-purple-600 w-full py-3 rounded font-semibold'>
                Get {name}
            </button>
        </div>
    );
}
