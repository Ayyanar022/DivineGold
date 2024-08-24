
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(3, "Name is required"),
    mobileNo: z.string().min(10, "Mobile No is required"), // Change to string for validation
    address: z.string().min(5, "Address is required"),
    village: z.string().min(4, "Village Name required"),
    city: z.string().min(4, "City name is required"),
    bonousCode: z.string().optional(),
});

const UserProfileForm = ({ currentUser, onSave, isLoading }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
        // defaultValues: currentUser,
        defaultValues: {
            email: currentUser?.email || '',
            name: currentUser?.name || '',
            mobileNo: currentUser?.mobileNo?.toString() || '', // Convert to string
            address: currentUser?.address || '',
            village: currentUser?.village || '',
            city: currentUser?.city || '',
            bonousCode: currentUser?.bonousCode || '',
        },
    });

    const onSubmit = data => {
        if (onSave) {
            onSave(data);
        }
    };

    useEffect(() => {
        reset(currentUser)
    }, [currentUser, reset])


    return (

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:p-4  bg-white w-full justify-center ">

            <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-bold mb-4 text-slate-700 uppercase">User Profile Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input {...register('email')} disabled className="mt-1 block w-full text-gray-500 p-2 border border-gray-300 rounded-md" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input {...register('name')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                        <input {...register('mobileNo')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input {...register('address')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Village</label>
                        <input {...register('village')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input {...register('city')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                    {!currentUser && <div>
                        <label className="block text-sm font-medium text-gray-700">Super Code</label>
                        <input {...register('bonousCode')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        {errors.bonousCode && <p className="text-red-500 text-sm mt-1">{errors.bonousCode.message}</p>}
                    </div>}

                    <button type="submit" disabled={isLoading} className="w-full bg-pink-600 uppercase font-semibold text-white py-2 rounded-md hover:bg-pink-700 transition-all duration-200">
                        {isLoading ? 'Loading...' : 'Update Profile'}
                    </button>
                </form>
            </div>


            <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-bold uppercase mb-4 text-slate-700">User Details</h2>

                <div className=' flex flex-col lg:flex-row gap-2 lg:items-center'>
                    <p className='text-lg font-semibold  text-slate-700'>Treasure Code : </p>
                    <p className='text-slate-700 text-sm'>{currentUser.bonousCode}</p>
                </div>
                <div className='flex gap-3 md:gap-5 mt-3 items-center '>
                    <p className='text-lg font-semibold text-slate-700'>Prize Token : </p>
                    <p className='text-slate-800 font-semibold text-sm md:text-md'>{currentUser.bonousePoints}</p>
                </div>
            </div>
        </div>

    );
};

export default UserProfileForm;

