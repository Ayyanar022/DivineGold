
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';

// const formSchema = z.object({
//     email: z.string().optional(),
//     name: z.string().min(3, "Name is required"),
//     mobileNo: z.string().min(10, "Mobile No is required"), // Change to string for validation
//     address: z.string().min(5, "Address is required"),
//     village: z.string().min(4, "Village Name required"),
//     city: z.string().min(4, "City name is required"),
//     bonousCode: z.string().optional(),
// });

// Form schema with Zod
const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(3, "Name is required"),
    mobileNo: z.string()
        .min(10, "Mobile No is required 10 Number")
        .regex(/^\d+$/, "Mobile No must contain only Numer"), // Ensure only digits
    address: z.string().min(5, "Address is required"),
    village: z.string().min(4, "Village Name required"),
    city: z.string().min(4, "City name is required"),
    bonousCode: z.string().optional(),
});

const UserProfileForm = ({ currentUser, onSave, isLoading, refetchUserData }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
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

    const { isAuthenticated } = useAuth0()

    //TRIGGER
    const [formTrigger, setFormTrigger] = useState(false)

    // // UPDATE CUSTOMER INFO
    const onSubmit = async (data) => {
        if (!isAuthenticated) return toast.warning("Please Login..")

        if (onSave) {
            const response = await onSave(data);

            if (response?.success) {
                toast.success("Updated sucessfully .. please Refresh ");
                setFormTrigger(curr => !curr)
            } else {
                toast.warning(response?.message?.toString());
            }
        }
    };

    useEffect(() => {
        reset(currentUser)
    }, [currentUser, reset, formTrigger])


    return (

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-2 md:px-0 lg:p-4  bg-white w-full justify-center ">

            <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-1 md:p-5 lg:p-6 md:rounded-lg md:shadow-md md:border">
                <h2 className="text-[17px] md:text-xl font-bold  text-cyan-900 uppercase ">Update Your Details </h2>
                <p className='w-fit text-[11px] md:text-[12px] lg:text-[13px]   text-amber-800 mb-2 md:mb-5'>Use reference TRESURE CODE and get Added prizeToken </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input {...register('email')} disabled
                            className="text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input {...register('name')}
                            className="text-sm md:text-md mt-1  block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                        <input {...register('mobileNo')}
                            className="text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input {...register('address')}
                            className="text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Village</label>
                        <input {...register('village')}
                            className="text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input {...register('city')}
                            className="text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {!(currentUser?.name || currentUser?.mobileNo || currentUser?.address || currentUser?.village || currentUser?.city) && <div>
                        <label className="block text-sm font-medium text-gray-700">Super Code</label>
                        <input {...register('bonousCode')}
                            className=" text-sm md:text-md mt-1 block w-full text-gray-500 p-2.5 border border-gray-300 rounded-md  outline-1 focus:shadow"
                        />
                        {errors.bonousCode && <p className="text-red-500 text-sm mt-1">{errors.bonousCode.message}</p>}
                    </div>}

                    <button type="submit" disabled={isLoading} className="w-full text-sm md:text-md bg-cyan-800 uppercase tracking-wider shadow font-semibold text-white py-2 rounded-md hover:bg-cyan-900 hover:shadow-md transition-all duration-200">
                        {isLoading ? 'Loading...' : 'Update'}
                    </button>
                </form>
            </div>


            <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-1 md:p-5 lg:p-6 rounded-lg md:shadow-md md:border">
                <section>
                    <h2 className="text-[17px] md:text-xl font-bold  text-cyan-900 uppercase">Refer & Get</h2>
                    <p className='w-fit text-[11px] md:text-[12px] lg:text-[13px]   text-amber-800 mb-2 md:mb-5'>Share your treasure code, and both will get Added prize tokens. </p>
                </section>

                <section className=' bg-slate-50 md:bg-slate-100 p-1 md:p-2'>
                    <div className=' flex flex-col lg:flex-row md:gap-2 lg:items-center'>
                        <p className=' text-md md:text-lg font-semibold   text-slate-700'>Treasure Code : </p>
                        <p className='pl-2 text-slate-700 text-[13px] md:text-md'>{currentUser?.bonousCode}</p>
                    </div>
                    <div className='flex gap-3 md:gap-5 mt-3 items-center '>
                        <p className=' text-md md:text-lg font-semibold text-slate-700'>Prize Token : </p>
                        <p className='text-slate-800 font-semibold text-sm md:text-md'>{currentUser?.bonousePoints}</p>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default UserProfileForm;

