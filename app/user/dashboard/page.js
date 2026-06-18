'use client';

import ServicesView from '../components/ui/ServicesView';
import VerificationStatusCard from '../components/ui/VerificationStatusCard';

const Page = () => {
return <div className='flex flex-col gap-x-4 gap-y-6'>
    <VerificationStatusCard />
    <ServicesView />
</div>
}

export default Page;