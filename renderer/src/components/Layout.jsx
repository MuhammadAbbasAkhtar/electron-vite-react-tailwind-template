import React, { useState, useEffect } from 'react';

import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// useEffect(() => {
	// 	console.log('picture :>> ', picture);
	// }, [picture])

	useEffect(() => {
		console.log('mounted Layout');
		const fetchDevices = async () => {
			// return await dispatch(getUserDetails())
		};

		// fetchDevices()
		return () => {
			console.log('unmounted Layout');
		};
	}, []);

	return (
		<div className={`${isSidebarOpen ? 'lg:grid-cols-17' : 'lg:grid-cols-17'} sm:grid-cols-17 w-dvw h-dvh bg-dark grid relative`}>
			<div className={`${isSidebarOpen ? 'col-span-2' : 'col-span-1'} hidden sm:block transition-all duration-300 ease-in-out relative`}>
				<div className={`p-2 h-full w-full flex flex-col  border-r separator ${!isSidebarOpen ? 'items-center' : ''}`}>
					<div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
						<div className="flex flex-col space-y-1 mx-1 lg:mt-1">
							<div className="justify-start flex flex-row items-center h-2 cursor-pointer " onClick={toggleSidebar}>
								<span className={`text-gray-400 text-xs font-semibold absolute hover:bg-sky-800 rounded ${!isSidebarOpen ? '-right-1' : '-right-0'}`}>
									{isSidebarOpen && <FontAwesomeIcon icon={faChevronLeft} className="w-fit h-5 rounded" />}
									{!isSidebarOpen && <FontAwesomeIcon icon={faChevronRight} className="w-fit h-5 rounded" />}
								</span>
							</div>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`flex flex-row items-center justify-center ${
										isSidebarOpen ? 'lg:justify-start' : ''
									} rounded-md h-12 focus:outline-none pr-6 font-semibold cursor-pointer ${
										isActive ? 'bg-primary-50 shadow-sm text-amber-300 font-bold' : 'text-gray-500 hover:text-amber-500'
									}`
								}
							>
								<span className={`inline-flex justify-center items-center ${isSidebarOpen ? 'mr-1':'ml-5'}`}>
									<FontAwesomeIcon icon={faHome} className="w-5 h-5" />
								</span>
								<span className={`ml-0  text-white text-sm tracking-wide  capitalize ${isSidebarOpen ? 'block' : 'hidden'}`}>Home</span>
							</NavLink>
						</div>
					</div>
				</div>
				{/* <button
          onClick={toggleSidebar}
          className={`${isSidebarOpen ? 'top-1/2 -right-7 transform -translate-y-1/2' : 'top-4 -right-7'} border-gray-200 border-solid absolute bg-gray-200 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors sm:top-1/2 sm:-right-7 sm:transform sm:-translate-y-1/2`}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} className="text-gray-600 dark:text-gray-300 w-3 h-3" />
        </button> */}
			</div>
			<div
				className={`${
					isSidebarOpen ? 'col-span-15' : 'col-span-15'
				} bg-dark text-black dark:bg-dark dark:text-white px-5 py-2 transition-all duration-300 ease-in-out overflow-y-auto`}
			>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
