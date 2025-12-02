"use client";

import PlanCard from '@/billing/components/PlanCard';

export default function PricingPage() {
    return (
        <div className='p-10 text-white max-w-6xl mx-auto space-y-8'>
            <div className='text-center space-y-4'>
                <p className='text-purple-400 uppercase tracking-widest text-sm'>Dropple Plans</p>
                <h1 className='text-4xl font-bold'>Choose Your Plan</h1>
                <p className='text-zinc-400 max-w-2xl mx-auto'>
                    Start for free, upgrade when you need more power. Billing handled by Stripe.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <PlanCard
                    name='Free'
                    price='0'
                    description='For individuals exploring Dropple.'
                    features={['Basic editor', '5 exports / month', '10 AI credits / month', 'Community templates']}
                    planId='price_free'
                />
                <PlanCard
                    name='Pro'
                    price='18'
                    description='For creators and freelancers.'
                    features={['Unlimited exports', '400 AI credits / month', 'Brand kit & fonts', 'Premium templates', 'Priority support']}
                    planId='price_pro_monthly'
                />
                <PlanCard
                    name='Business'
                    price='39'
                    description='Collaboration for teams.'
                    features={['Everything in Pro', 'Team workspaces', '5 seats included', 'Team billing', 'SSO & admin permissions']}
                    planId='price_business_monthly'
                />
            </div>
        </div>
    );
}
