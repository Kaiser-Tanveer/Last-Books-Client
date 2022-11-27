import React from 'react';
import { FaPenSquare } from 'react-icons/fa';
import q1Bg from '../../../Assets/backgrounds/ReactStateManagement.jpg';
import q2Bg from '../../../Assets/backgrounds/prototypeInheritence.png';
import q3Bg from '../../../Assets/backgrounds/unitTest.png';
import q4Bg from '../../../Assets/backgrounds/angular-vs-react-vs-vue.png';

const Blog = () => {
    return (
        <div>
            <h1 className='text-5xl font-bold py-10 flex justify-center'><FaPenSquare className='mr-3' /> My Blog</h1>
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:w-4/5 card shadow-xl">
                    <img src={q1Bg} className="w-full max-h-96 rounded-lg shadow-2xl" alt='reactImage' />
                    <div>
                        <h1 className="text-4xl font-bold">What are the different ways to manage a state in a React application?</h1>
                        <h1 className="text-2xl font-bold pt-6">There are four ways to manage state in React Application: </h1>
                        <p className="pb-6"><strong>Local (UI) state:</strong> Local state is data we manage in one or another component.
                            Local state is most often managed in React using the useState hook.
                            For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs. <br />
                            <strong>Global (UI) state:</strong> Global state is data we manage across multiple components.
                            Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.
                            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.
                            Sometimes state we think should be local might become global. <br />
                            <strong>Server state:</strong> Data that comes from an external server that must be integrated with our UI state.
                            Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
                            There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.
                            Fortunately there are tools such as SWR and React Query that make managing server state much easier. <br />
                            <strong>URL state:</strong> Data that exists on our URLs, including the pathname and query parameters.
                            URL state is often missing as a category of state, but it is an important one.
                            In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
                            There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.</p>
                    </div>
                </div>
            </div>

            {/* blog--2 */}
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:w-4/5 card shadow-xl">
                    <img src={q2Bg} className="w-full max-h-96 rounded-lg shadow-2xl" alt='prototypeBg' />
                    <div>
                        <h1 className="text-4xl font-bold">How does prototypical inheritance work?</h1>
                        <p className="py-6">Everything in Javascript is an object. Even when creating a Class is an Object via an Object Literal or Constructor Function. This is how Javascript does class-based programming as to other traditional Object-Oriented Programming languages where they use the keyword ‘class’ and ‘inheritance’.
                            Javascript’s version of class-based programming and other traditional class-based programming languages work with the same concept but does not work exactly similar. There are differences in its keyword, syntax, and how it worksSo, the core idea of Prototypal Inheritance is that an object can point to another object and inherit all its properties. The main purpose is to allow multiple instances of an object to share common properties, hence, the Singleton Pattern.</p>
                    </div>
                </div>
            </div>

            {/* blog-3  */}
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:w-4/5 card shadow-xl">
                    <img src={q3Bg} className="w-full max-h-96 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-4xl font-bold">What is a unit test? Why should we write unit tests?</h1>
                        <p className="py-6">Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. <br />
                            Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                            It simplifies the debugging process.
                            Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
                            Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                            Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
                        </p>
                    </div>
                </div>
            </div>

            {/* blog-4  */}
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:w-4/5 card shadow-xl">
                    <img src={q4Bg} className="w-full max-h-96 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-4xl font-bold">React vs. Angular vs. Vue?</h1>
                        <p className="py-6">There are three frameworks for building web applications that every frontend developer has heard about: React, Vue.js, and Angular.
                            <strong>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.</strong>
                            They can be used almost interchangeably to build front-end applications, but they’re not 100 percent the same, so it makes sense to compare them and understand their differences.
                            Each framework is component-based and allows the rapid creation of UI features.
                            However, they all have a different structure and architecture — so first, we’ll look into their architectural differences to understand the philosophy behind them.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;