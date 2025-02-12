import React from 'react';
import whyBg from '../../../../Assets/backgrounds/whyUsedBooksBg.jpg';

const WhyUsedBooks = () => {
    return (
        <div className='py-24'>
            <h2 className='text-5xl font-bold text-center py-10'>Why 'Last Books'</h2>
            <div className="hero card shadow-lg">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={whyBg} className="max-w-sm w-full rounded-lg shadow-2xl" alt='bg' />
                    <div>
                        <h1 className="text-3xl font-bold text-center">They Save You a Ton of Money</h1>
                        <p className="py-6 text-justify">
                            As with buying anything secondhand, buying used books is an effective way to save a lot of money. Brand-new books are often overpriced simply for the fact that they are new. Guess what? The words are the same whether the book is new or has been loved by readers before you! Used books from a secondhand store like 2nd Avenue can cost a small fraction of the price of a new book. This is especially true of larger books like textbooks, which can run up the cost of your purchases more quickly than you would think.
                        </p>
                        <h1 className="text-3xl font-bold text-center">They Allow You to Read More</h1>
                        <p className="py-6 text-justify">
                            For truly avid readers, a fully stocked bookshelf is never enough. If you want to keep yourself inundated with new books to read, buying used is really the best way to go. Not only can you get more books for each dollar that you spend, given how cheap they are compared to new books, the sheer variety of books you can buy secondhand will also ensure you have plenty of different genres to read. Buying used books makes it so you never have to experience the awful emptiness of not having another book at hand to read.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUsedBooks;