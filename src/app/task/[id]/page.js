'use client';

import {useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';

// TaskDetail 組件：顯示和編輯單個任務的詳細資訊
// params：包含路由參數，其中 id 為當前任務的識別碼
export default function TaskDetail({params})
{
    // 初始化路由器用於頁面導航
    const router = useRouter();
    // 從路由參數中解構出任務 id
    const {id} = params;
    // 使用 useState 管理任務標題和描述
    const [title, setTitle] = useState('');  // 任務標題
    const [description, setDescription] = useState('');  // 任務描述

    // 儲存任務更改的處理函數
    const handleSave =() => {
        // 從 localStorage 獲取現有任務
        const savedTasks = JSON.parse(localStorage.getItem('taskd')) || [];
        // 更新指定 id 的任務內容
        const updatedTasks = savedTasks.map((task) =>
            task.id === Number(id) ? {...task, title, description} : task
        );
        // 將更新後的任務列表儲存回 localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        // 導航回首頁
        router.push('/');
    }
    // 組件載入時從 localStorage 獲取任務資訊
    useEffect(() => {
        // 讀取所有已儲存的任務
        const savedTasks = JSON.parse(localStorage.getItem(tasks)) || [];
        // 查找指定 id 的任務
        const task = savedTasks.find((t) => t.id === Number(id));
        // 如果找到任務，更新表單狀態
        if(task)
        {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [id]);  // 當 id 改變時重新執行

    return
    (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">
                Task Detail
            </h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="border p-2 w-full mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                row={4}
            />
            <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={handleSave}
            >
                Save     
            </button>       
        </main>
    )
}
