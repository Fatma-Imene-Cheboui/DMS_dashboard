import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import ProfileInfo from '../components/preview/ProfileInfo';
import SecondaryHeader from '../components/common/SecondaryHeader';

const PreviewPage = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <SecondaryHeader title='Manage User' />

            <div className='p-8 flex justify-center'>
                <div className='w-full max-w-3xl'>
                    <ProfileInfo user={user} />
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;