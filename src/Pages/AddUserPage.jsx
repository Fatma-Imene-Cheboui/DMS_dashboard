import React from 'react';
import ProfileInfo from '../components/preview/ProfileInfo';
import SecondaryHeader from '../components/common/SecondaryHeader';

const AddUserPage = () => {
    const emptyUser = {
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        status: '',
        hire_date: '',
        employee_id: '',
        address: ''
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <SecondaryHeader title='Add User' />

            <div className='p-8 flex justify-center'>
                <div className='w-full max-w-2xl'>
                    <ProfileInfo user={emptyUser} isEditModeDefault={true} />
                </div>
            </div>
        </div>
    );
};

export default AddUserPage;