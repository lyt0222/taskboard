'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

// 主頁面組件
export default function Home() 
{
  // 定義狀態變數
  const [newTask, setNewTask] = useState(''); // 儲存新任務的輸入值
  const [nextId, setNextId] = useState(1); 

  // 初始化時從 localStorage 載入任務數據
  useEffect(() => {
    // 從 localStorage 讀取已保存的任務，如果沒有則使用空陣列
    const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saveTasks);
    // 計算最大任務 ID 以確保新任務 ID 不重複
    const maxId = saveTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []); // 空依賴數組表示只在組件掛載時執行

  const [tasks, setTasks] = useState([]); // 儲存所有任務的陣列

  // 新增任務的處理函數
  const addTask = () =>{
    // 防止空白任務的提交
    if(newTask.trim() === '') return;

    // 建立新任務物件
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '', // 初始描述為空
    };
    
    // 使用展開運算符創建新的任務陣列，保持狀態不可變性
    const updatedTasks = [...tasks, newTaskObj];
    
    // 更新狀態
    setTasks(updatedTasks);
    setNewTask(''); // 清空輸入欄位
    setNextId(nextId + 1); // 更新下一個可用的 ID
    
    // 將更新後的任務列表保存到 localStorage
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  // 刪除指定 ID 的任務
  const handleDelete = (id) => {
    // 過濾掉要刪除的任務
    const newTasks = tasks.filter((task) => task.id !== id);
    // 更新狀態和 localStorage
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
  
  // 清空所有任務
  const clearTasks = () => {
    setTasks([]); // 將任務列表設為空陣列
    localStorage.removeItem('tasks'); // 清除 localStorage 中的任務數據
  }
  
  // 渲染頁面UI
  return (
    // main 容器: p-4 表示內部padding為4個單位
    <main className="p-4 max-w-md mx-auto">
      {/* 標題樣式: text-2xl 表示文字大小為2xl, font-bold 表示字體粗體 */}
      <h1 className="text-2xl font-bold">Task Borad</h1>

      {/* 輸入區塊容器: flex 啟用flexbox佈局, gap-2 設定元素間距為2個單位, mb-4 下方margin為4個單位 */}
      <div className="flex gap-2 mb-4">
        <input
          // 輸入框樣式: border 添加邊框, p-2 內部padding為2個單位, flex-1 讓輸入框占據剩餘空間
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          // 按鈕樣式: bg-blue-500 藍色背景, text-white 白色文字, px-4 左右padding為4個單位
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button> 
        <button
          // 按鈕樣式: bg-blue-500 藍色背景, text-white 白色文字, px-4 左右padding為4個單位
          className="bg-red-500 text-white px-4"
          onClick={clearTasks}
        >
          Delete
        </button> 
      </div>

      {/* 引入TaskList組件並傳入任務陣列作為props */}
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </main>
  );
}
