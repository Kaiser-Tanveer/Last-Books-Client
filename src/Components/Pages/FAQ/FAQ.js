import React from 'react';

const FAQ = () => {
    return (
        <section className="container mx-auto bg-gray-100 text-gray-800 mb-32 rounded-md shadow-lg">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300">
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">How does it works?</summary>
                        <div className="px-4 pb-4">
                            <p>I have removed private routes for your easy access to dashboard. Otherwise, you had to be a valid use to access the dashboard.</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">How to access all user's info?</summary>
                        <div className="px-4 pb-4">
                            <p>You can't access user's information until you are not an Admin. Only an Admin have the permission to access the user's information?</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">Who is Admin?</summary>
                        <div className="px-4 pb-4 space-y-2">
                            <p>Admin is nobody but can access the user's information. And can take an action to a user. Like an Admin can remove an user when it is necessary.</p>
                            <p><b>You can role as an Admin with the</b> <br />
                                Email: ad@min.com <br />
                                Password: iamAdmin
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default FAQ;