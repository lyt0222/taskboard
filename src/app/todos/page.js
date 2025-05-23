'use client';

import {useState, useEffect } from "react";

// TodosPage 組件：從外部 API 獲取並顯示待辦事項列表
export default function TodosPage()
{
    // 狀態管理
    const [todos, setTodos] = useState([]); // 儲存待辦事項列表
    const [newTodo, setNewTodo] = useState(''); // 新待辦事項的輸入值
    const [loading, setLoading] = useState(true); // 載入狀態標記

    // 組件載入時獲取待辦事項數據
    useEffect(() => {
        // 非同步函數：從 JSONPlaceholder API 獲取待辦事項
        async function fetchTodos()
        {
            try
            {
                // 從 API 獲取前 20 個待辦事項
                const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
                
                // 檢查 API 響應狀態
                if(!res.ok)
                {
                    throw new Error('Failed to fetch');
                }
                
                // 模擬載入延遲，增加使用者體驗
                await new Promise((resolve) => setTimeout(resolve, 3000));
                
                // 解析並儲存數據
                const data = await res.json();
                setTodos(data);
            }catch(err)
            {
                // 錯誤處理
                console.log(err.message);
            } finally
            {
                // 無論成功與否都關閉載入狀態
                setLoading(false);
            }
        }

        // 執行獲取數據的函數
        fetchTodos();
    },[]) // 空依賴數組表示只在組件掛載時執行一次

    return
    (
        <main className="p-4 max-w-xl mx-auto">
            {/* 頁面標題 */}
            <h1 className="text-2xl font-bold mb-4">
                Todos
            </h1>

            {/* 載入狀態顯示 */}
            {loading && <p>Loading...</p>}
            
            {/* 待辦事項列表 */}
            {!loading && (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="border p-2 rounded">
                            <h2 className="font-semibold">
                                {todo.title} {todo.completed ? 'Done' : ''}
                            </h2>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};