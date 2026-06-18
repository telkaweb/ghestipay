'use client';
import {useAuthStore} from '../../../shared/stores/auth.store';

import VerificationStatusCard from '../components/ui/VerificationStatusCard';

const Page = () => {
    const token = useAuthStore((s) => s.user);
    console.log('token', token);
return <div>
    <VerificationStatusCard />
</div>
}

export default Page;