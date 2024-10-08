// @ts-nocheck
import React, { useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import Loading from '../../components/Loading/Loading.tsx';
import TasksList from './modules/TasksList/TasksList.tsx';

// Custom API;
import { API_TASKS_ALL } from '../../api/api.tasks.all.js';

// Included styles;
import '../Page.scss';
import './Tasks.scss';

interface ComponentProps {}

const Tasks = ({}: ComponentProps): JSX.Element => {
	const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

	const { webApp, token, contextData } = useAuth();
	const { localization } = useLocalization();

	const loadTasks = async () => {
		try {
			const response = await API_TASKS_ALL(token, webApp);
			contextData.tasks = response;
			setTimeout(() => {
				setLoadingStatus(false);
			}, 600)
		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
    loadTasks();
  }, [token]);

	if (loadingStatus) {
		return <Loading />
	}

	return (
		<div className="page" id="tasks">
			<TasksList />
			<p className="tasks__information">
				{ localization.tasks.description }<a href="https://t.me/inch_support" style={{color: 'var(--accent-1000'}}>@inch_support</a>
			</p>
		</div>
	)
}

export default Tasks;