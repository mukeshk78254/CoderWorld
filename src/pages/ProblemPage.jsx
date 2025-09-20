// // // // // // // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // import { useForm } from 'react-hook-form';//
// // // // // // // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // // // // // // import { useParams } from 'react-router';
// // // // // // // // // // // // // // // import axiosClient from "../utils/axiosClient"


// // // // // // // // // // // // // // // const ProblemPage = () => {
// // // // // // // // // // // // // // //   const [problem, setProblem] = useState(null);
// // // // // // // // // // // // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // // // // // // //   const [code, setCode] = useState('');
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // // // // // // //   const [runResult, setRunResult] = useState(null);
// // // // // // // // // // // // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // // // // // // //   const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // // // // // // //   const [activeRightTab, setActiveRightTab] = useState('code');
// // // // // // // // // // // // // // //   const editorRef = useRef(null);
// // // // // // // // // // // // // // //   let {problemId}  = useParams();

// // // // // // // // // // // // // // //   const { handleSubmit } = useForm();//


// // // // // // // // // // // // // // // //     _id: '507f1f77bcf86cd799439011',
// // // // // // // // // // // // // // // //     title: 'Two Sum',
// // // // // // // // // // // // // // // //     description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// // // // // // // // // // // // // // // // You may assume that each input would have exactly one solution, and you may not use the same element twice.

// // // // // // // // // // // // // // // // You can return the answer in any order.

// // // // // // // // // // // // // // // // Example 1:
// // // // // // // // // // // // // // // // Input: nums = [2,7,11,15], target = 9
// // // // // // // // // // // // // // // // Output: [0,1]
// // // // // // // // // // // // // // // // Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// // // // // // // // // // // // // // // // Example 2:
// // // // // // // // // // // // // // // // Input: nums = [3,2,4], target = 6
// // // // // // // // // // // // // // // // Output: [1,2]

// // // // // // // // // // // // // // // // Example 3:
// // // // // // // // // // // // // // // // Input: nums = [3,3], target = 6
// // // // // // // // // // // // // // // // Output: [0,1]

// // // // // // // // // // // // // // // // Constraints:
// // // // // // // // // // // // // // // // - 2 <= nums.length <= 10^4
// // // // // // // // // // // // // // // // - -10^9 <= nums[i] <= 10^9
// // // // // // // // // // // // // // // // - -10^9 <= target <= 10^9
// // // // // // // // // // // // // // // // - Only one valid answer exists.`,
// // // // // // // // // // // // // // // //     difficulty: 'easy',
// // // // // // // // // // // // // // // //     tags: 'array',
// // // // // // // // // // // // // // // //     visibleTestCases: [
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         input: 'nums = [2,7,11,15], target = 9',
// // // // // // // // // // // // // // // //         output: '[0,1]',
// // // // // // // // // // // // // // // //         explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         input: 'nums = [3,2,4], target = 6',
// // // // // // // // // // // // // // // //         output: '[1,2]',
// // // // // // // // // // // // // // // //         explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     ],
// // // // // // // // // // // // // // // //     startCode: [
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         language: 'javascript',
// // // // // // // // // // // // // // // //         initialCode: `/**
// // // // // // // // // // // // // // // //  * @param {number[]} nums
// // // // // // // // // // // // // // // //  * @param {number} target
// // // // // // // // // // // // // // // //  * @return {number[]}
// // // // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // // // var twoSum = function(nums, target) {
    
// // // // // // // // // // // // // // // // };`
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         language: 'java',
// // // // // // // // // // // // // // // //         initialCode: `class Solution {
// // // // // // // // // // // // // // // //     public int[] twoSum(int[] nums, int target) {
        
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // }`
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         language: 'cpp',
// // // // // // // // // // // // // // // //         initialCode: `class Solution {
// // // // // // // // // // // // // // // // public:
// // // // // // // // // // // // // // // //     vector<int> twoSum(vector<int>& nums, int target) {
        
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // };`
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     ],
// // // // // // // // // // // // // // // //     editorial: {
// // // // // // // // // // // // // // // //       content: `## Approach 1: Brute Force

// // // // // // // // // // // // // // // // The brute force approach is simple. Loop through each element x and find if there is another value that equals to target - x.

// // // // // // // // // // // // // // // // **Algorithm:**
// // // // // // // // // // // // // // // // 1. For each element in the array
// // // // // // // // // // // // // // // // 2. Check if target - current element exists in the rest of the array
// // // // // // // // // // // // // // // // 3. If found, return the indices

// // // // // // // // // // // // // // // // **Complexity Analysis:**
// // // // // // // // // // // // // // // // - Time complexity: O(n²)
// // // // // // // // // // // // // // // // - Space complexity: O(1)

// // // // // // // // // // // // // // // // ## Approach 2: Hash Table

// // // // // // // // // // // // // // // // To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.

// // // // // // // // // // // // // // // // **Algorithm:**
// // // // // // // // // // // // // // // // 1. Create a hash table to store elements and their indices
// // // // // // // // // // // // // // // // 2. For each element, calculate complement = target - current element
// // // // // // // // // // // // // // // // 3. If complement exists in hash table, return indices
// // // // // // // // // // // // // // // // 4. Otherwise, add current element to hash table

// // // // // // // // // // // // // // // // **Complexity Analysis:**
// // // // // // // // // // // // // // // // - Time complexity: O(n)
// // // // // // // // // // // // // // // // - Space complexity: O(n)`
// // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // //     solutions: [
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         language: 'javascript',
// // // // // // // // // // // // // // // //         title: 'Hash Table Approach',
// // // // // // // // // // // // // // // //         code: `var twoSum = function(nums, target) {
// // // // // // // // // // // // // // // //     const map = new Map();
    
// // // // // // // // // // // // // // // //     for (let i = 0; i < nums.length; i++) {
// // // // // // // // // // // // // // // //         const complement = target - nums[i];
        
// // // // // // // // // // // // // // // //         if (map.has(complement)) {
// // // // // // // // // // // // // // // //             return [map.get(complement), i];
// // // // // // // // // // // // // // // //         }
        
// // // // // // // // // // // // // // // //         map.set(nums[i], i);
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     return [];
// // // // // // // // // // // // // // // // };`
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //       {
// // // // // // // // // // // // // // // //         language: 'java',
// // // // // // // // // // // // // // // //         title: 'Hash Table Approach',
// // // // // // // // // // // // // // // //         code: `class Solution {
// // // // // // // // // // // // // // // //     public int[] twoSum(int[] nums, int target) {
// // // // // // // // // // // // // // // //         Map<Integer, Integer> map = new HashMap<>();
        
// // // // // // // // // // // // // // // //         for (int i = 0; i < nums.length; i++) {
// // // // // // // // // // // // // // // //             int complement = target - nums[i];
            
// // // // // // // // // // // // // // // //             if (map.containsKey(complement)) {
// // // // // // // // // // // // // // // //                 return new int[] { map.get(complement), i };
// // // // // // // // // // // // // // // //             }
            
// // // // // // // // // // // // // // // //             map.put(nums[i], i);
// // // // // // // // // // // // // // // //         }
        
// // // // // // // // // // // // // // // //         return new int[0];
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // }`
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     ]
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Fetch problem data
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const fetchProblem = async () => {
// // // // // // // // // // // // // // //       setLoading(true);
// // // // // // // // // // // // // // //       try {
        
// // // // // // // // // // // // // // //         const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        
// // // // // // // // // // // // // // //         const initialCode = response.data.startCode.find((sc) => {
        
// // // // // // // // // // // // // // //         if (sc.language == "C++" && selectedLanguage == 'cpp')
// // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // //         else if (sc.language == "Java" && selectedLanguage == 'java')
// // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // //         else if (sc.language == "Javascript" && selectedLanguage == 'javascript')
// // // // // // // // // // // // // // //         return true;

// // // // // // // // // // // // // // //         return false;
// // // // // // // // // // // // // // //         })?.initialCode || 'Hello';

// // // // // // // // // // // // // // //         console.log(initialCode);
// // // // // // // // // // // // // // //         setProblem(response.data);
// // // // // // // // // // // // // // //         // console.log(response.data.startCode);
        

// // // // // // // // // // // // // // //         console.log(initialCode);
// // // // // // // // // // // // // // //         setCode(initialCode);
// // // // // // // // // // // // // // //         setLoading(false);
        
// // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // //         console.error('Error fetching problem:', error);
// // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // //     fetchProblem();
// // // // // // // // // // // // // // //   }, [problemId]);

// // // // // // // // // // // // // // //   // Update code when language changes
// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (problem) {
// // // // // // // // // // // // // // //       const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage)?.initialCode || '';
// // // // // // // // // // // // // // //       setCode(initialCode);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }, [selectedLanguage, problem]);

// // // // // // // // // // // // // // //   const handleEditorChange = (value) => {
// // // // // // // // // // // // // // //     setCode(value || '');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleEditorDidMount = (editor) => {
// // // // // // // // // // // // // // //     editorRef.current = editor;
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleLanguageChange = (language) => {
// // // // // // // // // // // // // // //     setSelectedLanguage(language);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleRun = async () => {
// // // // // // // // // // // // // // //     setLoading(true);
// // // // // // // // // // // // // // //     setRunResult(null);
    
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await axiosClient.post(`/submission/run/${problemId}`, {
// // // // // // // // // // // // // // //         code,
// // // // // // // // // // // // // // //         language: selectedLanguage
// // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // //       setRunResult(response.data);
// // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // //       setActiveRightTab('testcase');
      
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error('Error running code:', error);
// // // // // // // // // // // // // // //       setRunResult({
// // // // // // // // // // // // // // //         success: false,
// // // // // // // // // // // // // // //         error: 'Internal server error'
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // //       setActiveRightTab('testcase');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleSubmitCode = async () => {
// // // // // // // // // // // // // // //     setLoading(true);
// // // // // // // // // // // // // // //     setSubmitResult(null);
    
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         const response = await axiosClient.post(`/submission/submit/${problemId}`, {
// // // // // // // // // // // // // // //         code:code,
// // // // // // // // // // // // // // //         language: selectedLanguage
// // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // //        setSubmitResult(response.data);
// // // // // // // // // // // // // // //        setLoading(false);
// // // // // // // // // // // // // // //        setActiveRightTab('result');
      
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error('Error submitting code:', error);
// // // // // // // // // // // // // // //       setSubmitResult(null);
// // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // //       setActiveRightTab('result');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const getLanguageForMonaco = (lang) => {
// // // // // // // // // // // // // // //     switch (lang) {
// // // // // // // // // // // // // // //       case 'javascript': return 'javascript';
// // // // // // // // // // // // // // //       case 'java': return 'java';
// // // // // // // // // // // // // // //       case 'cpp': return 'cpp';
// // // // // // // // // // // // // // //       default: return 'javascript';
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const getDifficultyColor = (difficulty) => {
// // // // // // // // // // // // // // //     switch (difficulty) {
// // // // // // // // // // // // // // //       case 'easy': return 'text-green-500';
// // // // // // // // // // // // // // //       case 'medium': return 'text-yellow-500';
// // // // // // // // // // // // // // //       case 'hard': return 'text-red-500';
// // // // // // // // // // // // // // //       default: return 'text-gray-500';
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading && !problem) {
// // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // //       <div className="flex justify-center items-center min-h-screen">
// // // // // // // // // // // // // // //         <span className="loading loading-spinner loading-lg"></span>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="h-screen flex bg-base-100">
// // // // // // // // // // // // // // //       {/* Left Panel */}
// // // // // // // // // // // // // // //       <div className="w-1/2 flex flex-col border-r border-base-300">
// // // // // // // // // // // // // // //         {/* Left Tabs */}
// // // // // // // // // // // // // // //         <div className="tabs tabs-bordered bg-base-200 px-4">
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveLeftTab('description')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Description
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveLeftTab('editorial')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Editorial
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveLeftTab('solutions')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Solutions
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveLeftTab('submissions')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Submissions
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Left Content */}
// // // // // // // // // // // // // // //         <div className="flex-1 overflow-y-auto p-6">
// // // // // // // // // // // // // // //           {problem && (
// // // // // // // // // // // // // // //             <>
// // // // // // // // // // // // // // //               {activeLeftTab === 'description' && (
// // // // // // // // // // // // // // //                 <div>
// // // // // // // // // // // // // // //                   <div className="flex items-center gap-4 mb-6">
// // // // // // // // // // // // // // //                     <h1 className="text-2xl font-bold">{problem.title}</h1>
// // // // // // // // // // // // // // //                     <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
// // // // // // // // // // // // // // //                       {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div className="badge badge-primary">{problem.tags}</div>
// // // // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // // // //                   <div className="prose max-w-none">
// // // // // // // // // // // // // // //                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
// // // // // // // // // // // // // // //                       {problem.description}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // // // //                   <div className="mt-8">
// // // // // // // // // // // // // // //                     <h3 className="text-lg font-semibold mb-4">Examples:</h3>
// // // // // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // // // // //                       {problem.visibleTestCases.map((example, index) => (
// // // // // // // // // // // // // // //                         <div key={index} className="bg-base-200 p-4 rounded-lg">
// // // // // // // // // // // // // // //                           <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
// // // // // // // // // // // // // // //                           <div className="space-y-2 text-sm font-mono">
// // // // // // // // // // // // // // //                             <div><strong>Input:</strong> {example.input}</div>
// // // // // // // // // // // // // // //                             <div><strong>Output:</strong> {example.output}</div>
// // // // // // // // // // // // // // //                             <div><strong>Explanation:</strong> {example.explanation}</div>
// // // // // // // // // // // // // // //                           </div>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       ))}
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // // //               {activeLeftTab === 'editorial' && (
// // // // // // // // // // // // // // //                 <div className="prose max-w-none">
// // // // // // // // // // // // // // //                   <h2 className="text-xl font-bold mb-4">Editorial</h2>
// // // // // // // // // // // // // // //                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
// // // // // // // // // // // // // // //                     {'Editorial is here for the problem'}
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // // //               {activeLeftTab === 'solutions' && (
// // // // // // // // // // // // // // //                 <div>
// // // // // // // // // // // // // // //                   <h2 className="text-xl font-bold mb-4">Solutions</h2>
// // // // // // // // // // // // // // //                   <div className="space-y-6">
// // // // // // // // // // // // // // //                     {problem.referenceSolution?.map((solution, index) => (
// // // // // // // // // // // // // // //                       <div key={index} className="border border-base-300 rounded-lg">
// // // // // // // // // // // // // // //                         <div className="bg-base-200 px-4 py-2 rounded-t-lg">
// // // // // // // // // // // // // // //                           <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                         <div className="p-4">
// // // // // // // // // // // // // // //                           <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
// // // // // // // // // // // // // // //                             <code>{solution?.completeCode}</code>
// // // // // // // // // // // // // // //                           </pre>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // // //                     )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}

// // // // // // // // // // // // // // //               {activeLeftTab === 'submissions' && (
// // // // // // // // // // // // // // //                 <div>
// // // // // // // // // // // // // // //                   <h2 className="text-xl font-bold mb-4">My Submissions</h2>
// // // // // // // // // // // // // // //                   <div className="text-gray-500">
// // // // // // // // // // // // // // //                     Your submission history will appear here.
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}
// // // // // // // // // // // // // // //             </>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // //       {/* Right Panel */}
// // // // // // // // // // // // // // //       <div className="w-1/2 flex flex-col">
// // // // // // // // // // // // // // //         {/* Right Tabs */}
// // // // // // // // // // // // // // //         <div className="tabs tabs-bordered bg-base-200 px-4">
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveRightTab('code')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Code
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveRightTab('testcase')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Testcase
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //           <button 
// // // // // // // // // // // // // // //             className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
// // // // // // // // // // // // // // //             onClick={() => setActiveRightTab('result')}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             Result
// // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* Right Content */}
// // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col">
// // // // // // // // // // // // // // //           {activeRightTab === 'code' && (
// // // // // // // // // // // // // // //             <div className="flex-1 flex flex-col">
// // // // // // // // // // // // // // //               {/* Language Selector */}
// // // // // // // // // // // // // // //               <div className="flex justify-between items-center p-4 border-b border-base-300">
// // // // // // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // // // // // //                   {['javascript', 'java', 'cpp'].map((lang) => (
// // // // // // // // // // // // // // //                     <button
// // // // // // // // // // // // // // //                       key={lang}
// // // // // // // // // // // // // // //                       className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
// // // // // // // // // // // // // // //                       onClick={() => handleLanguageChange(lang)}
// // // // // // // // // // // // // // //                     >
// // // // // // // // // // // // // // //                       {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
// // // // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // // // //                   ))}
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // // //               {/* Monaco Editor */}
// // // // // // // // // // // // // // //               <div className="flex-1">
// // // // // // // // // // // // // // //                 <Editor
// // // // // // // // // // // // // // //                   height="100%"
// // // // // // // // // // // // // // //                   language={getLanguageForMonaco(selectedLanguage)}
// // // // // // // // // // // // // // //                   value={code}
// // // // // // // // // // // // // // //                   onChange={handleEditorChange}
// // // // // // // // // // // // // // //                   onMount={handleEditorDidMount}
// // // // // // // // // // // // // // //                   theme="vs-dark"
// // // // // // // // // // // // // // //                   options={{
// // // // // // // // // // // // // // //                     fontSize: 14,
// // // // // // // // // // // // // // //                     minimap: { enabled: false },
// // // // // // // // // // // // // // //                     scrollBeyondLastLine: false,
// // // // // // // // // // // // // // //                     automaticLayout: true,
// // // // // // // // // // // // // // //                     tabSize: 2,
// // // // // // // // // // // // // // //                     insertSpaces: true,
// // // // // // // // // // // // // // //                     wordWrap: 'on',
// // // // // // // // // // // // // // //                     lineNumbers: 'on',
// // // // // // // // // // // // // // //                     glyphMargin: false,
// // // // // // // // // // // // // // //                     folding: true,
// // // // // // // // // // // // // // //                     lineDecorationsWidth: 10,
// // // // // // // // // // // // // // //                     lineNumbersMinChars: 3,
// // // // // // // // // // // // // // //                     renderLineHighlight: 'line',
// // // // // // // // // // // // // // //                     selectOnLineNumbers: true,
// // // // // // // // // // // // // // //                     roundedSelection: false,
// // // // // // // // // // // // // // //                     readOnly: false,
// // // // // // // // // // // // // // //                     cursorStyle: 'line',
// // // // // // // // // // // // // // //                     mouseWheelZoom: true,
// // // // // // // // // // // // // // //                   }}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // // //               {/* Action Buttons */}
// // // // // // // // // // // // // // //               <div className="p-4 border-t border-base-300 flex justify-between">
// // // // // // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // // // // // //                   <button 
// // // // // // // // // // // // // // //                     className="btn btn-ghost btn-sm"
// // // // // // // // // // // // // // //                     onClick={() => setActiveRightTab('testcase')}
// // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // //                     Console
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // //                     className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
// // // // // // // // // // // // // // //                     onClick={handleRun}
// // // // // // // // // // // // // // //                     disabled={loading}
// // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // //                     Run
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                   <button
// // // // // // // // // // // // // // //                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
// // // // // // // // // // // // // // //                     onClick={handleSubmitCode}
// // // // // // // // // // // // // // //                     disabled={loading}
// // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // //                     Submit
// // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}

// // // // // // // // // // // // // // //           {activeRightTab === 'testcase' && (
// // // // // // // // // // // // // // //             <div className="flex-1 p-4 overflow-y-auto">
// // // // // // // // // // // // // // //               <h3 className="font-semibold mb-4">Test Results</h3>
// // // // // // // // // // // // // // //               {runResult ? (
// // // // // // // // // // // // // // //                 <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
// // // // // // // // // // // // // // //                   <div>
// // // // // // // // // // // // // // //                     {runResult.success ? (
// // // // // // // // // // // // // // //                       <div>
// // // // // // // // // // // // // // //                         <h4 className="font-bold">✅ All test cases passed!</h4>
// // // // // // // // // // // // // // //                         <p className="text-sm mt-2">Runtime: {runResult.runtime+" sec"}</p>
// // // // // // // // // // // // // // //                         <p className="text-sm">Memory: {runResult.memory+" KB"}</p>
                        
// // // // // // // // // // // // // // //                         <div className="mt-4 space-y-2">
// // // // // // // // // // // // // // //                           {runResult.testCases.map((tc, i) => (
// // // // // // // // // // // // // // //                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
// // // // // // // // // // // // // // //                               <div className="font-mono">
// // // // // // // // // // // // // // //                                 <div><strong>Input:</strong> {tc.stdin}</div>
// // // // // // // // // // // // // // //                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
// // // // // // // // // // // // // // //                                 <div><strong>Output:</strong> {tc.stdout}</div>
// // // // // // // // // // // // // // //                                 <div className={'text-green-600'}>
// // // // // // // // // // // // // // //                                   {'✓ Passed'}
// // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // //                               </div>
// // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // //                           ))}
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // // // //                       <div>
// // // // // // // // // // // // // // //                         <h4 className="font-bold">❌ Error</h4>
// // // // // // // // // // // // // // //                         <div className="mt-4 space-y-2">
// // // // // // // // // // // // // // //                           {runResult.testCases.map((tc, i) => (
// // // // // // // // // // // // // // //                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
// // // // // // // // // // // // // // //                               <div className="font-mono">
// // // // // // // // // // // // // // //                                 <div><strong>Input:</strong> {tc.stdin}</div>
// // // // // // // // // // // // // // //                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
// // // // // // // // // // // // // // //                                 <div><strong>Output:</strong> {tc.stdout}</div>
// // // // // // // // // // // // // // //                                 <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
// // // // // // // // // // // // // // //                                   {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
// // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // //                               </div>
// // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // //                           ))}
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // // //                     )}
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               ) : (
// // // // // // // // // // // // // // //                 <div className="text-gray-500">
// // // // // // // // // // // // // // //                   Click "Run" to test your code with the example test cases.
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}

// // // // // // // // // // // // // // //           {activeRightTab === 'result' && (
// // // // // // // // // // // // // // //             <div className="flex-1 p-4 overflow-y-auto">
// // // // // // // // // // // // // // //               <h3 className="font-semibold mb-4">Submission Result</h3>
// // // // // // // // // // // // // // //               {submitResult ? (
// // // // // // // // // // // // // // //                 <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'}`}>
// // // // // // // // // // // // // // //                   <div>
// // // // // // // // // // // // // // //                     {submitResult.accepted ? (
// // // // // // // // // // // // // // //                       <div>
// // // // // // // // // // // // // // //                         <h4 className="font-bold text-lg">🎉 Accepted</h4>
// // // // // // // // // // // // // // //                         <div className="mt-4 space-y-2">
// // // // // // // // // // // // // // //                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
// // // // // // // // // // // // // // //                           <p>Runtime: {submitResult.runtime + " sec"}</p>
// // // // // // // // // // // // // // //                           <p>Memory: {submitResult.memory + "KB"} </p>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // // // //                       <div>
// // // // // // // // // // // // // // //                         <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
// // // // // // // // // // // // // // //                         <div className="mt-4 space-y-2">
// // // // // // // // // // // // // // //                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // // // //                     )}
// // // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               ) : (
// // // // // // // // // // // // // // //                 <div className="text-gray-500">
// // // // // // // // // // // // // // //                   Click "Submit" to submit your solution for evaluation.
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //               )}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           )}
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default ProblemPage;





// // // // // // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // import { useParams, NavLink } from 'react-router-dom';
// // // // // // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // // // // // import axiosClient from "../utils/axiosClient";
// // // // // // // // // // // // // // import SubmissionHistory from "../components/SubmissionHistory";
// // // // // // // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // // // // // // // import SplitPane from 'react-split-pane'; // For resizable layout
// // // // // // // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // // // // // // // --- Language Mapping for UI ---
// // // // // // // // // // // // // // const langMap = {
// // // // // // // // // // // // // //     cpp: 'C++',
// // // // // // // // // // // // // //     java: 'Java',
// // // // // // // // // // // // // //     javascript: 'JavaScript'
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // ===================================================================
// // // // // // // // // // // // // // // --- Reusable Sub-Component for the Result/Testcase Panel ---
// // // // // // // // // // // // // // // ===================================================================
// // // // // // // // // // // // // // const ResultPanel = ({ runResult, submitResult, activeTab, setActiveTab, loading }) => {
// // // // // // // // // // // // // //     // Renders the results from a 'Run' action
// // // // // // // // // // // // // //     const renderRunResult = () => {
// // // // // // // // // // // // // //         if (loading) return <div className="p-4 text-center"><span className="loading loading-dots loading-md"></span></div>;
// // // // // // // // // // // // // //         if (!runResult) return <div className="p-4 text-sm text-neutral-content/60">Run your code to see test case results here.</div>;
// // // // // // // // // // // // // //         if (runResult.error) return <div className="p-4 text-sm text-error font-mono">{runResult.error}</div>;

// // // // // // // // // // // // // //         return (
// // // // // // // // // // // // // //             <div className="p-4 space-y-2">
// // // // // // // // // // // // // //                 {runResult.testResults.map((tc, i) => (
// // // // // // // // // // // // // //                     <div key={i} className="collapse collapse-arrow bg-neutral-900/50 border border-neutral-700">
// // // // // // // // // // // // // //                         <input type="checkbox" />
// // // // // // // // // // // // // //                         <div className="collapse-title flex justify-between items-center text-sm font-semibold">
// // // // // // // // // // // // // //                             <span className={tc.isCorrect ? 'text-success' : 'text-error'}>{tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}</span>
// // // // // // // // // // // // // //                             <span className="text-neutral-content/60">{tc.status_description}</span>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                         <div className="collapse-content bg-neutral-900/30">
// // // // // // // // // // // // // //                             <div className="font-mono text-xs space-y-2 p-2">
// // // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Input:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.stdin}</pre></div>
// // // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Output:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.stdout}</pre></div>
// // // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Expected:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.expected_output}</pre></div>
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     // Renders the final verdict from a 'Submit' action
// // // // // // // // // // // // // //     const renderSubmitResult = () => {
// // // // // // // // // // // // // //         if (loading) return <div className="p-4 text-center"><span className="loading loading-dots loading-md"></span></div>;
// // // // // // // // // // // // // //         if (!submitResult) return <div className="p-4 text-sm text-neutral-content/60">Submit your code to see the final evaluation.</div>;
        
// // // // // // // // // // // // // //         const isAccepted = submitResult.status === 'accepted';
// // // // // // // // // // // // // //         return (
// // // // // // // // // // // // // //             <div className="p-6">
// // // // // // // // // // // // // //                 <div className={`p-4 rounded-lg ${isAccepted ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
// // // // // // // // // // // // // //                     <h2 className="text-2xl font-bold">{isAccepted ? '🎉 Accepted' : `❌ ${submitResult.status}`}</h2>
// // // // // // // // // // // // // //                     {isAccepted ? (
// // // // // // // // // // // // // //                         <div className="mt-4 grid grid-cols-2 gap-4 text-white">
// // // // // // // // // // // // // //                             <div><div className="text-xs text-neutral-content">Runtime</div><div className="font-semibold">{submitResult.runtime} ms</div></div>
// // // // // // // // // // // // // //                             <div><div className="text-xs text-neutral-content">Memory</div><div className="font-semibold">{submitResult.memory} KB</div></div>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // // //                         <p className="mt-2 text-sm">{submitResult.errorMessage}</p>
// // // // // // // // // // // // // //                     )}
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //         <div className="bg-[#161b22] border-t-2 border-neutral-700 h-full flex flex-col">
// // // // // // // // // // // // // //             <div className="tabs tabs-bordered px-4 flex-shrink-0">
// // // // // // // // // // // // // //                 <button className={`tab ${activeTab === 'testcase' ? 'tab-active' : ''}`} onClick={() => setActiveTab('testcase')}>Test Cases</button>
// // // // // // // // // // // // // //                 <button className={`tab ${activeTab === 'result' ? 'tab-active' : ''}`} onClick={() => setActiveTab('result')}>Result</button>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             <div className="flex-grow overflow-y-auto">
// // // // // // // // // // // // // //                 {activeTab === 'testcase' && renderRunResult()}
// // // // // // // // // // // // // //                 {activeTab === 'result' && renderSubmitResult()}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // ===================================================================
// // // // // // // // // // // // // // // --- Main Problem Page Component ---
// // // // // // // // // // // // // // // ===================================================================
// // // // // // // // // // // // // // function ProblemPage() {
// // // // // // // // // // // // // //     const { problemid } = useParams();
// // // // // // // // // // // // // //     const [problem, setProblem] = useState(null);
// // // // // // // // // // // // // //     const [code, setCode] = useState('');
// // // // // // // // // // // // // //     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // // // // // // //     const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // // // // // // //     const [runResult, setRunResult] = useState(null);
// // // // // // // // // // // // // //     const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // // // // // //     const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // // // // // //     const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // // // // // // //     const editorRef = useRef(null);

// // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // //         const fetchProblem = async () => {
// // // // // // // // // // // // // //             if (!problemid) return;
// // // // // // // // // // // // // //             setPageLoading(true);
// // // // // // // // // // // // // //             try {
// // // // // // // // // // // // // //                 const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // // // // // // //                 setProblem(data);
// // // // // // // // // // // // // //                 const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // // // // // //   if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // // // //   return sc.language === selectedLanguage;
// // // // // // // // // // // // // // });
// // // // // // // // // // // // // //                 setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // // // // // // //             } catch (error) { console.error('Error fetching problem:', error); } 
// // // // // // // // // // // // // //             finally { setPageLoading(false); }
// // // // // // // // // // // // // //         };
// // // // // // // // // // // // // //         fetchProblem();
// // // // // // // // // // // // // //     }, [problemid]);

// // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // //         if (problem) {
// // // // // // // // // // // // // //             const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // // // // // //                 if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // // // //                 return sc.language === selectedLanguage;
// // // // // // // // // // // // // //             });
// // // // // // // // // // // // // //             setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     }, [selectedLanguage, problem]);

// // // // // // // // // // // // // //     const handleRun = async () => {
// // // // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // // // //         setRunResult(null);
// // // // // // // // // // // // // //         setActiveBottomTab('testcase');
// // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // // // //             const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, { code, language: languageToSend });

// // // // // // // // // // // // // //             if (!Array.isArray(rawResults)) throw new Error("Invalid API response");
            
// // // // // // // // // // // // // //             const overallSuccess = rawResults.every(result => result.status.id === 3);
// // // // // // // // // // // // // //             const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // // // // // // //                 stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // // // // // // //                 expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // // // // // // //                 stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // // // // // // //                 status_description: result.status.description,
// // // // // // // // // // // // // //                 isCorrect: result.status.id === 3,
// // // // // // // // // // // // // //             }));
// // // // // // // // // // // // // //             setRunResult({ success: overallSuccess, testResults: combinedTestResults });
// // // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // // //             setRunResult({ error: err.response?.data?.message || "An error occurred during execution." });
// // // // // // // // // // // // // //         } finally {
// // // // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     const handleSubmitCode = async () => {
// // // // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // // // //         setSubmitResult(null);
// // // // // // // // // // // // // //         setActiveBottomTab('result');
// // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // // // //             const { data } = await axiosClient.post(`/submission/submit/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // // // // //             setSubmitResult(data);
// // // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // // //             setSubmitResult({ status: 'Error', errorMessage: err.response?.data?.message || "Submission failed." });
// // // // // // // // // // // // // //         } finally {
// // // // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     const getDifficultyColor = (difficulty) => ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' })[difficulty] || 'text-gray-500';

// // // // // // // // // // // // // //     if (pageLoading) {
// // // // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     if (!problem) {
// // // // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">Could not load problem. Please try again later.</div>;
// // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //         <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // // // // // // //             <SplitPane split="vertical" defaultSize="50%" minSize={400} maxSize={-400}>
// // // // // // // // // // // // // //                 {/* Left Pane: Problem Description & Info */}
// // // // // // // // // // // // // //                 <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // // // // // // //                     <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // // // // // // //                         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // // // // // // //                             <button key={tab} className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveLeftTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
// // // // // // // // // // // // // //                         ))}
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                     <div className="p-6 flex-grow">
// // // // // // // // // // // // // //                         {activeLeftTab === 'description' && (
// // // // // // // // // // // // // //                             <div>
// // // // // // // // // // // // // //                                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // // // // // // //                                 <div className="flex items-center gap-4 my-4"><div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div><div className="badge badge-primary badge-outline">{problem.tags}</div></div>
// // // // // // // // // // // // // //                                 <div className="prose prose-invert max-w-none text-neutral-content/80" dangerouslySetInnerHTML={{ __html: problem.description }}/>
// // // // // // // // // // // // // //                                 <div className="mt-8">
// // // // // // // // // // // // // //                                     <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // // // // // // //                                         {problem.visibletestcases?.map((ex, i) => <div key={i} className="bg-base-200/50 p-4 rounded-lg"><h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4><div className="space-y-2 text-sm font-mono text-neutral-content/70"><p><strong className="text-neutral-content">Input:</strong> {ex.input}</p><p><strong className="text-neutral-content">Output:</strong> {ex.output}</p>{ex.explanation && <p><strong className="text-neutral-content">Explanation:</strong> {ex.explanation}</p>}</div></div>)}
// // // // // // // // // // // // // //                                     </div>
// // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // //                         {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // // // // // // //                         {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // // // // // // //                         {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // // //                 {/* Right Pane: Code Editor & Results */}
// // // // // // // // // // // // // //                 <SplitPane split="horizontal" defaultSize="65%" minSize={200} maxSize={-200}>
// // // // // // // // // // // // // //                     <div className="flex flex-col h-full bg-base-100">
// // // // // // // // // // // // // //                         <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // // // // // // //                             <div className="flex gap-1">{Object.keys(langMap).map(lang => <button key={lang} className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setSelectedLanguage(lang)}>{langMap[lang]}</button>)}</div>
// // // // // // // // // // // // // //                             <button className="btn btn-xs btn-ghost" onClick={() => setCode(problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || '')}>Reset Code</button>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                         <div className="flex-1"><Editor height="100%" language={selectedLanguage} value={code} onChange={v => setCode(v || '')} theme="vs-dark" options={{ minimap: { enabled: false }, fontSize: 14 }} onMount={editor => editorRef.current = editor} /></div>
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                     <ResultPanel runResult={runResult} submitResult={submitResult} activeTab={activeBottomTab} setActiveTab={setActiveBottomTab} loading={actionLoading} />
// // // // // // // // // // // // // //                 </SplitPane>
// // // // // // // // // // // // // //             </SplitPane>

// // // // // // // // // // // // // //             {/* Footer Console Actions */}
// // // // // // // // // // // // // //             <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2 flex-shrink-0">
// // // // // // // // // // // // // //                 <button className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleRun} disabled={actionLoading}>Run</button>
// // // // // // // // // // // // // //                 <button className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={actionLoading}>Submit</button>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // };


// // // // // // // // // // // // // // export default ProblemPage;
// // // // // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // import { useParams, NavLink } from 'react-router-dom';
// // // // // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // // // // import axiosClient from "../utils/axiosClient";
// // // // // // // // // // // // // import SubmissionHistory from "../components/SubmissionHistory";
// // // // // // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // // // // // const langMap = {
// // // // // // // // // // // // //     cpp: 'C++',
// // // // // // // // // // // // //     java: 'Java',
// // // // // // // // // // // // //     javascript: 'JavaScript'
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const ResultPanel = ({ runResult, submitResult, activeTab, setActiveTab, loading }) => {
// // // // // // // // // // // // //     const renderRunResult = () => {
// // // // // // // // // // // // //         if (loading) return <div className="p-4 text-center"><span className="loading loading-dots loading-md"></span></div>;
// // // // // // // // // // // // //         if (!runResult) return <div className="p-4 text-sm text-neutral-content/60">Run your code to see test case results here.</div>;
// // // // // // // // // // // // //         if (runResult.error) return <div className="p-4 text-sm text-error font-mono">{runResult.error}</div>;

// // // // // // // // // // // // //         return (
// // // // // // // // // // // // //             <div className="p-4 space-y-2">
// // // // // // // // // // // // //                 {runResult.testResults.map((tc, i) => (
// // // // // // // // // // // // //                     <div key={i} className="collapse collapse-arrow bg-neutral-900/50 border border-neutral-700">
// // // // // // // // // // // // //                         <input type="checkbox" />
// // // // // // // // // // // // //                         <div className="collapse-title flex justify-between items-center text-sm font-semibold">
// // // // // // // // // // // // //                             <span className={tc.isCorrect ? 'text-success' : 'text-error'}>{tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}</span>
// // // // // // // // // // // // //                             <span className="text-neutral-content/60">{tc.status_description}</span>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <div className="collapse-content bg-neutral-900/30">
// // // // // // // // // // // // //                             <div className="font-mono text-xs space-y-2 p-2">
// // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Input:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.stdin}</pre></div>
// // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Output:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.stdout}</pre></div>
// // // // // // // // // // // // //                                 <div><span className="font-semibold text-neutral-content/60">Expected:</span><pre className="bg-neutral/20 p-2 rounded mt-1 whitespace-pre-wrap">{tc.expected_output}</pre></div>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         );
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const renderSubmitResult = () => {
// // // // // // // // // // // // //         if (loading) return <div className="p-4 text-center"><span className="loading loading-dots loading-md"></span></div>;
// // // // // // // // // // // // //         if (!submitResult) return <div className="p-4 text-sm text-neutral-content/60">Submit your code to see the final evaluation.</div>;

// // // // // // // // // // // // //         const isAccepted = submitResult.status === 'accepted';
// // // // // // // // // // // // //         return (
// // // // // // // // // // // // //             <div className="p-6">
// // // // // // // // // // // // //                 <div className={`p-4 rounded-lg ${isAccepted ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
// // // // // // // // // // // // //                     <h2 className="text-2xl font-bold">{isAccepted ? '🎉 Accepted' : `❌ ${submitResult.status}`}</h2>
// // // // // // // // // // // // //                     {isAccepted ? (
// // // // // // // // // // // // //                         <div className="mt-4 grid grid-cols-2 gap-4 text-white">
// // // // // // // // // // // // //                             <div><div className="text-xs text-neutral-content">Runtime</div><div className="font-semibold">{submitResult.runtime} ms</div></div>
// // // // // // // // // // // // //                             <div><div className="text-xs text-neutral-content">Memory</div><div className="font-semibold">{submitResult.memory} KB</div></div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // //                         <p className="mt-2 text-sm">{submitResult.errorMessage}</p>
// // // // // // // // // // // // //                     )}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         );
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="bg-[#161b22] border-t-2 border-neutral-700 h-full flex flex-col">
// // // // // // // // // // // // //             <div className="tabs tabs-bordered px-4 flex-shrink-0">
// // // // // // // // // // // // //                 <button className={`tab ${activeTab === 'testcase' ? 'tab-active' : ''}`} onClick={() => setActiveTab('testcase')}>Test Cases</button>
// // // // // // // // // // // // //                 <button className={`tab ${activeTab === 'result' ? 'tab-active' : ''}`} onClick={() => setActiveTab('result')}>Result</button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="flex-grow overflow-y-auto">
// // // // // // // // // // // // //                 {activeTab === 'testcase' && renderRunResult()}
// // // // // // // // // // // // //                 {activeTab === 'result' && renderSubmitResult()}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // function ProblemPage() {
// // // // // // // // // // // // //     const { problemid } = useParams();
// // // // // // // // // // // // //     const [problem, setProblem] = useState(null);
// // // // // // // // // // // // //     const [code, setCode] = useState('');
// // // // // // // // // // // // //     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // // // // // //     const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // // // // // //     const [runResult, setRunResult] = useState(null);
// // // // // // // // // // // // //     const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // // // // //     const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // // // // //     const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // // // // // //     const editorRef = useRef(null);

// // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // //         const fetchProblem = async () => {
// // // // // // // // // // // // //             if (!problemid) return;
// // // // // // // // // // // // //             setPageLoading(true);
// // // // // // // // // // // // //             try {
// // // // // // // // // // // // //                 const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // // // // // //                 setProblem(data);
// // // // // // // // // // // // //                 const starterCodeObj = data.startcode.find(sc => {
// // // // // // // // // // // // //                     if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // // //                     return sc.language === selectedLanguage;
// // // // // // // // // // // // //                 });
// // // // // // // // // // // // //                 setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // // // // // //             } catch (error) {
// // // // // // // // // // // // //                 console.error('Error fetching problem:', error);
// // // // // // // // // // // // //             } finally {
// // // // // // // // // // // // //                 setPageLoading(false);
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //         };
// // // // // // // // // // // // //         fetchProblem();
// // // // // // // // // // // // //     }, [problemid]);

// // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // //         if (problem) {
// // // // // // // // // // // // //             const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // // // // //                 if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // // //                 return sc.language === selectedLanguage;
// // // // // // // // // // // // //             });
// // // // // // // // // // // // //             setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //     }, [selectedLanguage, problem]);

// // // // // // // // // // // // //     const handleRun = async () => {
// // // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // // //         setRunResult(null);
// // // // // // // // // // // // //         setActiveBottomTab('testcase');
// // // // // // // // // // // // //         try {
// // // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // // //             const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, { code, language: languageToSend });

// // // // // // // // // // // // //             if (!Array.isArray(rawResults)) throw new Error("Invalid API response");

// // // // // // // // // // // // //             const overallSuccess = rawResults.every(result => result.status.id === 3);
// // // // // // // // // // // // //             const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // // // // // //                 stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // // // // // //                 expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // // // // // //                 stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // // // // // //                 status_description: result.status.description,
// // // // // // // // // // // // //                 isCorrect: result.status.id === 3,
// // // // // // // // // // // // //             }));
// // // // // // // // // // // // //             setRunResult({ success: overallSuccess, testResults: combinedTestResults });
// // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // //             setRunResult({ error: err.response?.data?.message || "An error occurred during execution." });
// // // // // // // // // // // // //         } finally {
// // // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const handleSubmitCode = async () => {
// // // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // // //         setSubmitResult(null);
// // // // // // // // // // // // //         setActiveBottomTab('result');
// // // // // // // // // // // // //         try {
// // // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // // //             const { data } = await axiosClient.post(`/submission/submit/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // // // //             setSubmitResult(data);
// // // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // // //             setSubmitResult({ status: 'Error', errorMessage: err.response?.data?.message || "Submission failed." });
// // // // // // // // // // // // //         } finally {
// // // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const getDifficultyColor = (difficulty) => ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' })[difficulty] || 'text-gray-500';

// // // // // // // // // // // // //     if (pageLoading) {
// // // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     if (!problem) {
// // // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">Could not load problem. Please try again later.</div>;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // // // // // //             <SplitPane split="vertical" defaultSize="50%" minSize={400} maxSize={-400}>
// // // // // // // // // // // // //                 <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // // // // // //                     <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // // // // // //                         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // // // // // //                             <button key={tab} className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveLeftTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
// // // // // // // // // // // // //                         ))}
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="p-6 flex-grow">
// // // // // // // // // // // // //                         {activeLeftTab === 'description' && (
// // // // // // // // // // // // //                             <div>
// // // // // // // // // // // // //                                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // // // // // //                                 <div className="flex items-center gap-4 my-4"><div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div><div className="badge badge-primary badge-outline">{problem.tags}</div></div>
// // // // // // // // // // // // //                                 <div className="prose prose-invert max-w-none text-neutral-content/80" dangerouslySetInnerHTML={{ __html: problem.description }}/>
// // // // // // // // // // // // //                                 <div className="mt-8">
// // // // // // // // // // // // //                                     <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // // // // // //                                         {problem.visibletestcases?.map((ex, i) => <div key={i} className="bg-base-200/50 p-4 rounded-lg"><h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4><div className="space-y-2 text-sm font-mono text-neutral-content/70"><p><strong className="text-neutral-content">Input:</strong> {ex.input}</p><p><strong className="text-neutral-content">Output:</strong> {ex.output}</p>{ex.explanation && <p><strong className="text-neutral-content">Explanation:</strong> {ex.explanation}</p>}</div></div>)}
// // // // // // // // // // // // //                                     </div>
// // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                         {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // // // // // //                         {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // // // // // //                         {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // //                 <SplitPane split="horizontal" defaultSize="65%" minSize={200} maxSize={-200}>
// // // // // // // // // // // // //                     <div className="flex flex-col h-full bg-base-100">
// // // // // // // // // // // // //                         <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // // // // // //                             <div className="flex gap-1">{Object.keys(langMap).map(lang => <button key={lang} className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setSelectedLanguage(lang)}>{langMap[lang]}</button>)}</div>
// // // // // // // // // // // // //                             <button className="btn btn-xs btn-ghost" onClick={() => setCode(problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || '')}>Reset Code</button>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <div className="flex-1"><Editor height="100%" language={selectedLanguage} value={code} onChange={v => setCode(v || '')} theme="vs-dark" options={{ minimap: { enabled: false }, fontSize: 14 }} onMount={editor => editorRef.current = editor} /></div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <ResultPanel runResult={runResult} submitResult={submitResult} activeTab={activeBottomTab} setActiveTab={setActiveBottomTab} loading={actionLoading} />
// // // // // // // // // // // // //                 </SplitPane>
// // // // // // // // // // // // //             </SplitPane>

// // // // // // // // // // // // //             <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2 flex-shrink-0">
// // // // // // // // // // // // //                 <button className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleRun} disabled={actionLoading}>Run</button>
// // // // // // // // // // // // //                 <button className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={actionLoading}>Submit</button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default ProblemPage;
// // // // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // // // import axiosClient from "../utils/axiosClient";
// // // // // // // // // // // // import SubmissionHistory from "../components/SubmissionHistory";
// // // // // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // // // // const langMap = {
// // // // // // // // // // // //     cpp: 'C++',
// // // // // // // // // // // //     java: 'Java',
// // // // // // // // // // // //     javascript: 'JavaScript'
// // // // // // // // // // // // };

// // // // // // // // // // // // function ProblemPage() {
// // // // // // // // // // // //     const { problemid } = useParams();
// // // // // // // // // // // //     const [problem, setProblem] = useState(null);
// // // // // // // // // // // //     const [code, setCode] = useState('');
// // // // // // // // // // // //     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // // // // //     const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // // // // //     const [runResult, setRunResult] = useState(null);
// // // // // // // // // // // //     const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // // // //     const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // // // //     const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // // // // //     const editorRef = useRef(null);

// // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // //         const fetchProblem = async () => {
// // // // // // // // // // // //             if (!problemid) return;
// // // // // // // // // // // //             setPageLoading(true);
// // // // // // // // // // // //             try {
// // // // // // // // // // // //                 const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // // // // //                 setProblem(data);
// // // // // // // // // // // //                 const starterCodeObj = data.startcode.find(sc => {
// // // // // // // // // // // //                     if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // //                     return sc.language === selectedLanguage;
// // // // // // // // // // // //                 });
// // // // // // // // // // // //                 setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // // // // //             } catch (error) {
// // // // // // // // // // // //                 console.error('Error fetching problem:', error);
// // // // // // // // // // // //             } finally {
// // // // // // // // // // // //                 setPageLoading(false);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         };
// // // // // // // // // // // //         fetchProblem();
// // // // // // // // // // // //     }, [problemid]);

// // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // //         if (problem) {
// // // // // // // // // // // //             const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // // // //                 if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // // //                 return sc.language === selectedLanguage;
// // // // // // // // // // // //             });
// // // // // // // // // // // //             setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     }, [selectedLanguage, problem]);

// // // // // // // // // // // //     const handleRun = async () => {
// // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // //         setRunResult(null);
// // // // // // // // // // // //         setActiveBottomTab('testcase');
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // //             const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // // //             if (!Array.isArray(rawResults)) throw new Error("Invalid API response");
// // // // // // // // // // // //             const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // // // // //                 stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // // // // //                 expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // // // // //                 stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // // // // //                 status_description: result.status.description,
// // // // // // // // // // // //                 isCorrect: result.status.id === 3,
// // // // // // // // // // // //             }));
// // // // // // // // // // // //             setRunResult({ testResults: combinedTestResults });
// // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // //             setRunResult({ error: err.response?.data?.message || "An error occurred during execution." });
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleSubmitCode = async () => {
// // // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // // //         setSubmitResult(null);
// // // // // // // // // // // //         setActiveBottomTab('result');
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // // //             const { data } = await axiosClient.post(`/submission/submit/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // // //             setSubmitResult(data);
// // // // // // // // // // // //         } catch (err) {
// // // // // // // // // // // //             setSubmitResult({ status: 'Error', errorMessage: err.response?.data?.message || "Submission failed." });
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const getDifficultyColor = (difficulty) => ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' })[difficulty] || 'text-gray-500';

// // // // // // // // // // // //     if (pageLoading) {
// // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117]">
// // // // // // // // // // // //             <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // // // // // // // // //         </div>;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     if (!problem) {
// // // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">
// // // // // // // // // // // //             Could not load problem. Please try again later.
// // // // // // // // // // // //         </div>;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // // // // //             <SplitPane split="vertical" defaultSize="50%" minSize={400}>
// // // // // // // // // // // //                 <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // // // // //                     <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // // // // //                         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // // // // //                             <button key={tab} className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveLeftTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
// // // // // // // // // // // //                         ))}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="p-6 flex-grow">
// // // // // // // // // // // //                         {activeLeftTab === 'description' && (
// // // // // // // // // // // //                             <div>
// // // // // // // // // // // //                                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // // // // //                                 <div className="flex items-center gap-4 my-4">
// // // // // // // // // // // //                                     <div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div>
// // // // // // // // // // // //                                     <div className="badge badge-primary badge-outline">{problem.tags}</div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="prose prose-invert max-w-none text-neutral-content/80" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // // // // // // // //                                 <div className="mt-8">
// // // // // // // // // // // //                                     <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // // // // //                                         {problem.visibletestcases?.map((ex, i) => (
// // // // // // // // // // // //                                             <div key={i} className="bg-base-200/50 p-4 rounded-lg">
// // // // // // // // // // // //                                                 <h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4>
// // // // // // // // // // // //                                                 <div className="space-y-2 text-sm font-mono text-neutral-content/70">
// // // // // // // // // // // //                                                     <p><strong className="text-neutral-content">Input:</strong> {ex.input}</p>
// // // // // // // // // // // //                                                     <p><strong className="text-neutral-content">Output:</strong> {ex.output}</p>
// // // // // // // // // // // //                                                     {ex.explanation && <p><strong className="text-neutral-content">Explanation:</strong> {ex.explanation}</p>}
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                             </div>
// // // // // // // // // // // //                                         ))}
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         )}
// // // // // // // // // // // //                         {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // // // // //                         {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // // // // //                         {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <SplitPane split="horizontal" defaultSize="65%" minSize={200}>
// // // // // // // // // // // //                     <div className="flex flex-col h-full bg-base-100">
// // // // // // // // // // // //                         <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // // // // //                             <div className="flex gap-1">
// // // // // // // // // // // //                                 {Object.keys(langMap).map(lang => (
// // // // // // // // // // // //                                     <button key={lang} className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setSelectedLanguage(lang)}>{langMap[lang]}</button>
// // // // // // // // // // // //                                 ))}
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <button className="btn btn-xs btn-ghost" onClick={() => setCode(problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || '')}>Reset Code</button>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         <div className="flex-1">
// // // // // // // // // // // //                             <Editor
// // // // // // // // // // // //                                 height="100%"
// // // // // // // // // // // //                                 width="100%"
// // // // // // // // // // // //                                 language={selectedLanguage}
// // // // // // // // // // // //                                 value={code}
// // // // // // // // // // // //                                 onChange={v => setCode(v || '')}
// // // // // // // // // // // //                                 theme="vs-dark"
// // // // // // // // // // // //                                 options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // // // // // // // // // //                                 onMount={editor => editorRef.current = editor}
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="bg-[#161b22] p-4 overflow-y-auto text-white text-sm">
// // // // // // // // // // // //                         {activeBottomTab === 'testcase' && runResult && runResult.testResults?.map((tc, i) => (
// // // // // // // // // // // //                             <div key={i} className="mb-4">
// // // // // // // // // // // //                                 <div className={`font-semibold ${tc.isCorrect ? 'text-success' : 'text-error'}`}>{tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}</div>
// // // // // // // // // // // //                                 <div className="font-mono bg-neutral-800 p-2 rounded mt-1">
// // // // // // // // // // // //                                     <p><strong>Input:</strong> {tc.stdin}</p>
// // // // // // // // // // // //                                     <p><strong>Expected:</strong> {tc.expected_output}</p>
// // // // // // // // // // // //                                     <p><strong>Output:</strong> {tc.stdout}</p>
// // // // // // // // // // // //                                     <p><strong>Status:</strong> {tc.status_description}</p>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         ))}
// // // // // // // // // // // //                         {activeBottomTab === 'result' && submitResult && (
// // // // // // // // // // // //                             <div className={`p-4 rounded ${submitResult.status === 'accepted' ? 'bg-green-800' : 'bg-red-800'}`}>
// // // // // // // // // // // //                                 <h2 className="text-xl font-bold">{submitResult.status}</h2>
// // // // // // // // // // // //                                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // // // // // // //                                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // // // // // // //                                 {submitResult.errorMessage && <p>Error: {submitResult.errorMessage}</p>}
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </SplitPane>
// // // // // // // // // // // //             </SplitPane>

// // // // // // // // // // // //             <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2 flex-shrink-0">
// // // // // // // // // // // //                 <button className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleRun} disabled={actionLoading}>Run</button>
// // // // // // // // // // // //                 <button className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={actionLoading}>Submit</button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default ProblemPage;
// // // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // // import axiosClient from "../utils/axiosClient";
// // // // // // // // // // // import SubmissionHistory from "../components/SubmissionHistory";
// // // // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // // // const langMap = {
// // // // // // // // // // //     cpp: 'C++',
// // // // // // // // // // //     java: 'Java',
// // // // // // // // // // //     javascript: 'JavaScript'
// // // // // // // // // // // };

// // // // // // // // // // // function ProblemPage() {
// // // // // // // // // // //     const { problemid } = useParams();
// // // // // // // // // // //     const [problem, setProblem] = useState(null);
// // // // // // // // // // //     const [code, setCode] = useState('');
// // // // // // // // // // //     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // // // //     const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // // // //     const [runResult, setRunResult] = useState(null);
// // // // // // // // // // //     const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // // //     const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // // //     const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // // // //     const editorRef = useRef(null);

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         const fetchProblem = async () => {
// // // // // // // // // // //             if (!problemid) return;
// // // // // // // // // // //             setPageLoading(true);
// // // // // // // // // // //             try {
// // // // // // // // // // //                 const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // // // //                 setProblem(data);
// // // // // // // // // // //                 const starterCodeObj = data.startcode.find(sc => {
// // // // // // // // // // //                     if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // //                     return sc.language === selectedLanguage;
// // // // // // // // // // //                 });
// // // // // // // // // // //                 setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // // // //             } catch (error) {
// // // // // // // // // // //                 console.error('Error fetching problem:', error);
// // // // // // // // // // //             } finally {
// // // // // // // // // // //                 setPageLoading(false);
// // // // // // // // // // //             }
// // // // // // // // // // //         };
// // // // // // // // // // //         fetchProblem();
// // // // // // // // // // //     }, [problemid]);

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         if (problem) {
// // // // // // // // // // //             const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // // //                 if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // // //                 return sc.language === selectedLanguage;
// // // // // // // // // // //             });
// // // // // // // // // // //             setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // // // //         }
// // // // // // // // // // //     }, [selectedLanguage, problem]);

// // // // // // // // // // //     const handleEditorChange = (value) => {
// // // // // // // // // // //         setCode(value || '');
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleEditorDidMount = (editor) => {
// // // // // // // // // // //         editorRef.current = editor;
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleRun = async () => {
// // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // //         setRunResult(null);
// // // // // // // // // // //         setActiveBottomTab('testcase');
// // // // // // // // // // //         try {
// // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // //             const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // //             if (!Array.isArray(rawResults)) throw new Error("Invalid API response");
// // // // // // // // // // //             const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // // // //                 stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // // // //                 expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // // // //                 stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // // // //                 status_description: result.status.description,
// // // // // // // // // // //                 isCorrect: result.status.id === 3,
// // // // // // // // // // //             }));
// // // // // // // // // // //             setRunResult({ testResults: combinedTestResults });
// // // // // // // // // // //         } catch (err) {
// // // // // // // // // // //             setRunResult({ error: err.response?.data?.message || "An error occurred during execution." });
// // // // // // // // // // //         } finally {
// // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleSubmitCode = async () => {
// // // // // // // // // // //         setActionLoading(true);
// // // // // // // // // // //         setSubmitResult(null);
// // // // // // // // // // //         setActiveBottomTab('result');
// // // // // // // // // // //         try {
// // // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // // //             const { data } = await axiosClient.post(`/submission/submit/${problemid}`, { code, language: languageToSend });
// // // // // // // // // // //             setSubmitResult(data);
// // // // // // // // // // //         } catch (err) {
// // // // // // // // // // //             setSubmitResult({ status: 'Error', errorMessage: err.response?.data?.message || "Submission failed." });
// // // // // // // // // // //         } finally {
// // // // // // // // // // //             setActionLoading(false);
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     const getDifficultyColor = (difficulty) => ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' })[difficulty] || 'text-gray-500';

// // // // // // // // // // //     if (pageLoading) {
// // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117]">
// // // // // // // // // // //             <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // // // // // // // //         </div>;
// // // // // // // // // // //     }

// // // // // // // // // // //     if (!problem) {
// // // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">
// // // // // // // // // // //             Could not load problem. Please try again later.
// // // // // // // // // // //         </div>;
// // // // // // // // // // //     }

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // // // //             <SplitPane split="vertical" defaultSize="50%" minSize={400}>
// // // // // // // // // // //                 <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // // // //                     <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // // // //                         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // // // //                             <button key={tab} className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveLeftTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="p-6 flex-grow">
// // // // // // // // // // //                         {activeLeftTab === 'description' && (
// // // // // // // // // // //                             <div>
// // // // // // // // // // //                                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // // // //                                 <div className="flex items-center gap-4 my-4">
// // // // // // // // // // //                                     <div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div>
// // // // // // // // // // //                                     <div className="badge badge-primary badge-outline">{problem.tags}</div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                                 <div className="prose prose-invert max-w-none text-neutral-content/80" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // // // // // // //                                 <div className="mt-8">
// // // // // // // // // // //                                     <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // // // //                                         {problem.visibletestcases?.map((ex, i) => (
// // // // // // // // // // //                                             <div key={i} className="bg-base-200/50 p-4 rounded-lg">
// // // // // // // // // // //                                                 <h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4>
// // // // // // // // // // //                                                 <div className="space-y-2 text-sm font-mono text-neutral-content/70">
// // // // // // // // // // //                                                     <p><strong className="text-neutral-content">Input:</strong> {ex.input}</p>
// // // // // // // // // // //                                                     <p><strong className="text-neutral-content">Output:</strong> {ex.output}</p>
// // // // // // // // // // //                                                     {ex.explanation && <p><strong className="text-neutral-content">Explanation:</strong> {ex.explanation}</p>}
// // // // // // // // // // //                                                 </div>
// // // // // // // // // // //                                             </div>
// // // // // // // // // // //                                         ))}
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         )}
// // // // // // // // // // //                         {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // // // //                         {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // // // //                         {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <div className="flex flex-col h-full bg-base-100 w-full">
// // // // // // // // // // //                     <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // // // //                         <div className="flex gap-1">
// // // // // // // // // // //                             {Object.keys(langMap).map(lang => (
// // // // // // // // // // //                                 <button key={lang} className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setSelectedLanguage(lang)}>{langMap[lang]}</button>
// // // // // // // // // // //                             ))}
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <button className="btn btn-xs btn-ghost" onClick={() => setCode(problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || '')}>Reset Code</button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="flex-1 w-full h-full">
// // // // // // // // // // //                         <Editor
// // // // // // // // // // //                             height="100%"
// // // // // // // // // // //                             width="100%"
// // // // // // // // // // //                             language={selectedLanguage}
// // // // // // // // // // //                             value={code}
// // // // // // // // // // //                             onChange={handleEditorChange}
// // // // // // // // // // //                             theme="vs-dark"
// // // // // // // // // // //                             options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // // // // // // // // //                             onMount={handleEditorDidMount}
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2">
// // // // // // // // // // //                         <button className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleRun} disabled={actionLoading}>Run</button>
// // // // // // // // // // //                         <button className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={actionLoading}>Submit</button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </SplitPane>

// // // // // // // // // // //             <div className="bg-[#161b22] p-4 overflow-y-auto text-white text-sm h-1/3">
// // // // // // // // // // //                 {activeBottomTab === 'testcase' && runResult && runResult.testResults?.map((tc, i) => (
// // // // // // // // // // //                     <div key={i} className="mb-4">
// // // // // // // // // // //                         <div className={`font-semibold ${tc.isCorrect ? 'text-success' : 'text-error'}`}>{tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}</div>
// // // // // // // // // // //                         <div className="font-mono bg-neutral-800 p-2 rounded mt-1">
// // // // // // // // // // //                             <p><strong>Input:</strong> {tc.stdin}</p>
// // // // // // // // // // //                             <p><strong>Expected:</strong> {tc.expected_output}</p>
// // // // // // // // // // //                             <p><strong>Output:</strong> {tc.stdout}</p>
// // // // // // // // // // //                             <p><strong>Status:</strong> {tc.status_description}</p>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //                 {activeBottomTab === 'result' && submitResult && (
// // // // // // // // // // //                     <div className={`p-4 rounded ${submitResult.status === 'accepted' ? 'bg-green-800' : 'bg-red-800'}`}>
// // // // // // // // // // //                         <h2 className="text-xl font-bold">{submitResult.status}</h2>
// // // // // // // // // // //                         {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // // // // // //                         {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // // // // // //                         {submitResult.errorMessage && <p>Error: {submitResult.errorMessage}</p>}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }

// // // // // // // // // // // export default ProblemPage;
// // // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // // import axiosClient from "../utils/axiosClient";
// // // // // // // // // // import SubmissionHistory from "../components/SubmissionHistory";
// // // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // // const langMap = {
// // // // // // // // // //     cpp: 'C++',
// // // // // // // // // //     java: 'Java',
// // // // // // // // // //     javascript: 'JavaScript'
// // // // // // // // // // };

// // // // // // // // // // function ProblemPage() {
// // // // // // // // // //     const { problemid } = useParams();
// // // // // // // // // //     const [problem, setProblem] = useState(null);
// // // // // // // // // //     const [code, setCode] = useState('');
// // // // // // // // // //     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // // //     const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // // //     const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // // //     const [runResult, setRunResult] = useState(null);
// // // // // // // // // //     const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // // //     const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // // //     const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // // //     const editorRef = useRef(null);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const fetchProblem = async () => {
// // // // // // // // // //             if (!problemid) return;
// // // // // // // // // //             setPageLoading(true);
// // // // // // // // // //             try {
// // // // // // // // // //                 const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // // //                 setProblem(data);
// // // // // // // // // //                 const starterCodeObj = data.startcode.find(sc => {
// // // // // // // // // //                     if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // //                     return sc.language === selectedLanguage;
// // // // // // // // // //                 });
// // // // // // // // // //                 setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // // //             } catch (error) {
// // // // // // // // // //                 console.error('Error fetching problem:', error);
// // // // // // // // // //             } finally {
// // // // // // // // // //                 setPageLoading(false);
// // // // // // // // // //             }
// // // // // // // // // //         };
// // // // // // // // // //         fetchProblem();
// // // // // // // // // //     }, [problemid]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (problem) {
// // // // // // // // // //             const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // // //                 if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // // //                 return sc.language === selectedLanguage;
// // // // // // // // // //             });
// // // // // // // // // //             setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // // //         }
// // // // // // // // // //     }, [selectedLanguage, problem]);

// // // // // // // // // //     const handleEditorChange = (value) => {
// // // // // // // // // //         setCode(value || '');
// // // // // // // // // //     };

// // // // // // // // // //     const handleEditorDidMount = (editor) => {
// // // // // // // // // //         editorRef.current = editor;
// // // // // // // // // //     };

// // // // // // // // // //     const handleRun = async () => {
// // // // // // // // // //         setActionLoading(true);
// // // // // // // // // //         setRunResult(null);
// // // // // // // // // //         setActiveBottomTab('testcase');
// // // // // // // // // //         try {
// // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // //             const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, { code, language: languageToSend });
// // // // // // // // // //             if (!Array.isArray(rawResults)) throw new Error("Invalid API response");
// // // // // // // // // //             const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // // //                 stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // // //                 expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // // //                 stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // // //                 status_description: result.status.description,
// // // // // // // // // //                 isCorrect: result.status.id === 3,
// // // // // // // // // //             }));
// // // // // // // // // //             setRunResult({ testResults: combinedTestResults });
// // // // // // // // // //             document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth' });
// // // // // // // // // //         } catch (err) {
// // // // // // // // // //             setRunResult({ error: err.response?.data?.message || "An error occurred during execution." });
// // // // // // // // // //         } finally {
// // // // // // // // // //             setActionLoading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const handleSubmitCode = async () => {
// // // // // // // // // //         setActionLoading(true);
// // // // // // // // // //         setSubmitResult(null);
// // // // // // // // // //         setActiveBottomTab('result');
// // // // // // // // // //         try {
// // // // // // // // // //             const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // // //             const { data } = await axiosClient.post(`/submission/submit/${problemid}`, { code, language: languageToSend });
// // // // // // // // // //             setSubmitResult(data);
// // // // // // // // // //             document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth' });
// // // // // // // // // //         } catch (err) {
// // // // // // // // // //             setSubmitResult({ status: 'Error', errorMessage: err.response?.data?.message || "Submission failed." });
// // // // // // // // // //         } finally {
// // // // // // // // // //             setActionLoading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const getDifficultyColor = (difficulty) => ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' })[difficulty] || 'text-gray-500';

// // // // // // // // // //     if (pageLoading) {
// // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117]">
// // // // // // // // // //             <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // // // // // // //         </div>;
// // // // // // // // // //     }

// // // // // // // // // //     if (!problem) {
// // // // // // // // // //         return <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">
// // // // // // // // // //             Could not load problem. Please try again later.
// // // // // // // // // //         </div>;
// // // // // // // // // //     }

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // // //             <SplitPane split="vertical" defaultSize="50%" minSize={400} className="flex-grow">
// // // // // // // // // //                 <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // // //                     <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // // //                         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // // //                             <button key={tab} className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveLeftTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
// // // // // // // // // //                         ))}
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="p-6 flex-grow">
// // // // // // // // // //                         {activeLeftTab === 'description' && (
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // // //                                 <div className="flex items-center gap-4 my-4">
// // // // // // // // // //                                     <div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</div>
// // // // // // // // // //                                     <div className="badge badge-primary badge-outline">{problem.tags}</div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 <div className="prose prose-invert max-w-none text-neutral-content/80" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // // // // // //                                 <div className="mt-8">
// // // // // // // // // //                                     <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // // //                                         {problem.visibletestcases?.map((ex, i) => (
// // // // // // // // // //                                             <div key={i} className="bg-base-200/50 p-4 rounded-lg">
// // // // // // // // // //                                                 <h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4>
// // // // // // // // // //                                                 <div className="space-y-2 text-sm font-mono text-neutral-content/70">
// // // // // // // // // //                                                     <p><strong className="text-neutral-content">Input:</strong> {ex.input}</p>
// // // // // // // // // //                                                     <p><strong className="text-neutral-content">Output:</strong> {ex.output}</p>
// // // // // // // // // //                                                     {ex.explanation && <p><strong className="text-neutral-content">Explanation:</strong> {ex.explanation}</p>}
// // // // // // // // // //                                                 </div>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         ))}
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                         {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // // //                         {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // // //                         {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="flex flex-col h-full bg-base-100 w-full">
// // // // // // // // // //                     <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // // //                         <div className="flex gap-1">
// // // // // // // // // //                             {Object.keys(langMap).map(lang => (
// // // // // // // // // //                                 <button key={lang} className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setSelectedLanguage(lang)}>{langMap[lang]}</button>
// // // // // // // // // //                             ))}
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <button className="btn btn-xs btn-ghost" onClick={() => setCode(problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || '')}>Reset Code</button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex-1 w-full h-full">
// // // // // // // // // //                         <Editor
// // // // // // // // // //                             height="100%"
// // // // // // // // // //                             width="100%"
// // // // // // // // // //                             language={selectedLanguage}
// // // // // // // // // //                             value={code}
// // // // // // // // // //                             onChange={handleEditorChange}
// // // // // // // // // //                             theme="vs-dark"
// // // // // // // // // //                             options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // // // // // // // //                             onMount={handleEditorDidMount}
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2">
// // // // // // // // // //                         <button className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleRun} disabled={actionLoading}>Run</button>
// // // // // // // // // //                         <button className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={actionLoading}>Submit</button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </SplitPane>

// // // // // // // // // //             <div id="output-panel" className="bg-[#161b22] p-4 overflow-y-auto text-white text-sm max-h-[30vh] border-t border-neutral-700">
// // // // // // // // // //                 {activeBottomTab === 'testcase' && runResult && runResult.testResults?.map((tc, i) => (
// // // // // // // // // //                     <div key={i} className="mb-4">
// // // // // // // // // //                         <div className={`font-semibold ${tc.isCorrect ? 'text-success' : 'text-error'}`}>{tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}</div>
// // // // // // // // // //                         <div className="font-mono bg-neutral-800 p-2 rounded mt-1">
// // // // // // // // // //                             <p><strong>Input:</strong> {tc.stdin}</p>
// // // // // // // // // //                             <p><strong>Expected:</strong> {tc.expected_output}</p>
// // // // // // // // // //                             <p><strong>Output:</strong> {tc.stdout}</p>
// // // // // // // // // //                             <p><strong>Status:</strong> {tc.status_description}</p>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 ))}
// // // // // // // // // //                 {activeBottomTab === 'result' && submitResult && (
// // // // // // // // // //                     <div className={`p-4 rounded ${submitResult.status === 'accepted' ? 'bg-green-800' : 'bg-red-800'}`}>
// // // // // // // // // //                         <h2 className="text-xl font-bold">{submitResult.status}</h2>
// // // // // // // // // //                         {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // // // // //                         {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // // // // //                         {submitResult.errorMessage && <p>Error: {submitResult.errorMessage}</p>}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // // // export default ProblemPage;
// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // // import Editorial from '../components/Editorial';
// // // // // // // // // import SplitPane from 'react-split-pane';

// // // // // // // // // const langMap = {
// // // // // // // // //   cpp: 'C++',
// // // // // // // // //   java: 'Java',
// // // // // // // // //   javascript: 'JavaScript'
// // // // // // // // // };

// // // // // // // // // function ProblemPage() {
// // // // // // // // //   const { problemid } = useParams();
// // // // // // // // //   const [problem, setProblem] = useState(null);
// // // // // // // // //   const [code, setCode] = useState('');
// // // // // // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // // //   const [pageLoading, setPageLoading] = useState(true);
// // // // // // // // //   const [actionLoading, setActionLoading] = useState(false);
// // // // // // // // //   const [runResult, setRunResult] = useState(null);
// // // // // // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // // // // // //   const [activeLeftTab, setActiveLeftTab] = useState('description');
// // // // // // // // //   const [activeBottomTab, setActiveBottomTab] = useState('testcase');
// // // // // // // // //   const editorRef = useRef(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchProblem = async () => {
// // // // // // // // //       if (!problemid) return;
// // // // // // // // //       setPageLoading(true);
// // // // // // // // //       try {
// // // // // // // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // // //         setProblem(data);
// // // // // // // // //         const starterCodeObj = data.startcode.find(sc => {
// // // // // // // // //           if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // //           return sc.language === selectedLanguage;
// // // // // // // // //         });
// // // // // // // // //         setCode(starterCodeObj ? starterCodeObj.initialcode : '// Starter code not found.');
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error('Error fetching problem:', error);
// // // // // // // // //       } finally {
// // // // // // // // //         setPageLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchProblem();
// // // // // // // // //   }, [problemid]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (problem) {
// // // // // // // // //       const starterCodeObj = problem.startcode.find(sc => {
// // // // // // // // //         if (selectedLanguage === 'cpp') return sc.language === 'cpp' || sc.language === 'c++';
// // // // // // // // //         return sc.language === selectedLanguage;
// // // // // // // // //       });
// // // // // // // // //       setCode(starterCodeObj ? starterCodeObj.initialcode : `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // // //     }
// // // // // // // // //   }, [selectedLanguage, problem]);

// // // // // // // // //   const handleEditorChange = value => setCode(value || '');
// // // // // // // // //   const handleEditorDidMount = editor => (editorRef.current = editor);

// // // // // // // // //   const handleRun = async () => {
// // // // // // // // //     setActionLoading(true);
// // // // // // // // //     setRunResult(null);
// // // // // // // // //     setActiveBottomTab('testcase');
// // // // // // // // //     try {
// // // // // // // // //       const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // //       const { data: rawResults } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // // // // // // //         code,
// // // // // // // // //         language: languageToSend
// // // // // // // // //       });

// // // // // // // // //       if (!Array.isArray(rawResults)) throw new Error('Invalid API response');

// // // // // // // // //       const combinedTestResults = rawResults.map((result, index) => ({
// // // // // // // // //         stdin: problem?.visibletestcases[index]?.input || 'N/A',
// // // // // // // // //         expected_output: problem?.visibletestcases[index]?.output || 'N/A',
// // // // // // // // //         stdout: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // // //         status_description: result.status.description,
// // // // // // // // //         isCorrect: result.status.id === 3
// // // // // // // // //       }));

// // // // // // // // //       setRunResult({ testResults: combinedTestResults });
// // // // // // // // //       document.getElementById('output-panel')?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setRunResult({
// // // // // // // // //         error: err.response?.data?.message || 'An error occurred during execution.'
// // // // // // // // //       });
// // // // // // // // //     } finally {
// // // // // // // // //       setActionLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmitCode = async () => {
// // // // // // // // //     setActionLoading(true);
// // // // // // // // //     setSubmitResult(null);
// // // // // // // // //     setActiveBottomTab('result');
// // // // // // // // //     try {
// // // // // // // // //       const languageToSend = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
// // // // // // // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // // // // // // //         code,
// // // // // // // // //         language: languageToSend
// // // // // // // // //       });
// // // // // // // // //       setSubmitResult(data);
// // // // // // // // //       document.getElementById('output-panel')?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setSubmitResult({
// // // // // // // // //         status: 'Error',
// // // // // // // // //         errorMessage: err.response?.data?.message || 'Submission failed.'
// // // // // // // // //       });
// // // // // // // // //     } finally {
// // // // // // // // //       setActionLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const getDifficultyColor = difficulty =>
// // // // // // // // //     ({ easy: 'text-success', medium: 'text-warning', hard: 'text-error' }[difficulty] || 'text-gray-500');

// // // // // // // // //   if (pageLoading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex justify-center items-center min-h-screen bg-[#0d1117]">
// // // // // // // // //         <span className="loading loading-spinner loading-lg text-primary"></span>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (!problem) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex justify-center items-center min-h-screen bg-[#0d1117] text-error">
// // // // // // // // //         Could not load problem. Please try again later.
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0d1117]">
// // // // // // // // //       <SplitPane split="vertical" defaultSize="50%" minSize={400} className="flex-grow">
// // // // // // // // //         <div className="flex flex-col h-full bg-[#161b22] overflow-y-auto">
// // // // // // // // //           <div className="tabs tabs-bordered bg-base-200/50 px-4 flex-shrink-0">
// // // // // // // // //             {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // // //               <button
// // // // // // // // //                 key={tab}
// // // // // // // // //                 className={`tab ${activeLeftTab === tab ? 'tab-active' : ''}`}
// // // // // // // // //                 onClick={() => setActiveLeftTab(tab)}
// // // // // // // // //               >
// // // // // // // // //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// // // // // // // // //               </button>
// // // // // // // // //             ))}
// // // // // // // // //           </div>

// // // // // // // // //           <div className="p-6 flex-grow">
// // // // // // // // //             {activeLeftTab === 'description' && (
// // // // // // // // //               <div>
// // // // // // // // //                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// // // // // // // // //                 <div className="flex items-center gap-4 my-4">
// // // // // // // // //                   <div className={`badge badge-outline font-semibold ${getDifficultyColor(problem.difficulty)}`}>
// // // // // // // // //                     {problem.difficulty}
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="badge badge-primary badge-outline">{problem.tags}</div>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div
// // // // // // // // //                   className="prose prose-invert max-w-none text-neutral-content/80"
// // // // // // // // //                   dangerouslySetInnerHTML={{ __html: problem.description }}
// // // // // // // // //                 />
// // // // // // // // //                 <div className="mt-8">
// // // // // // // // //                   <h3 className="text-lg font-semibold mb-4 text-white">Examples:</h3>
// // // // // // // // //                   <div className="space-y-4">
// // // // // // // // //                     {problem.visibletestcases?.map((ex, i) => (
// // // // // // // // //                       <div key={i} className="bg-base-200/50 p-4 rounded-lg">
// // // // // // // // //                         <h4 className="font-semibold mb-2 text-white">Example {i + 1}:</h4>
// // // // // // // // //                         <div className="space-y-2 text-sm font-mono text-neutral-content/70">
// // // // // // // // //                           <p>
// // // // // // // // //                             <strong className="text-neutral-content">Input:</strong> {ex.input}
// // // // // // // // //                           </p>
// // // // // // // // //                           <p>
// // // // // // // // //                             <strong className="text-neutral-content">Output:</strong> {ex.output}
// // // // // // // // //                           </p>
// // // // // // // // //                           {ex.explanation && (
// // // // // // // // //                             <p>
// // // // // // // // //                               <strong className="text-neutral-content">Explanation:</strong> {ex.explanation}
// // // // // // // // //                             </p>
// // // // // // // // //                           )}
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                     ))}
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //             {activeLeftTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // // //             {activeLeftTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // // //             {activeLeftTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Right Side - Editor + Buttons */}
// // // // // // // // //         <div className="flex flex-col h-full bg-base-100 w-full">
// // // // // // // // //           <div className="p-2 border-b border-neutral-700 flex justify-between items-center">
// // // // // // // // //             <div className="flex gap-1">
// // // // // // // // //               {Object.keys(langMap).map(lang => (
// // // // // // // // //                 <button
// // // // // // // // //                   key={lang}
// // // // // // // // //                   className={`btn btn-xs ${selectedLanguage === lang ? 'btn-neutral' : 'btn-ghost'}`}
// // // // // // // // //                   onClick={() => setSelectedLanguage(lang)}
// // // // // // // // //                 >
// // // // // // // // //                   {langMap[lang]}
// // // // // // // // //                 </button>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //             <button
// // // // // // // // //               className="btn btn-xs btn-ghost"
// // // // // // // // //               onClick={() =>
// // // // // // // // //                 setCode(
// // // // // // // // //                   problem.startcode.find(sc => sc.language === selectedLanguage)?.initialcode || ''
// // // // // // // // //                 )
// // // // // // // // //               }
// // // // // // // // //             >
// // // // // // // // //               Reset Code
// // // // // // // // //             </button>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Monaco Editor */}
// // // // // // // // //           <div className="flex-1 w-full h-full">
// // // // // // // // //             <Editor
// // // // // // // // //               height="70%"
// // // // // // // // //               width="100%"
// // // // // // // // //               language={selectedLanguage}
// // // // // // // // //               value={code}
// // // // // // // // //               onChange={handleEditorChange}
// // // // // // // // //               theme="vs-dark"
// // // // // // // // //               options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // // // // // // //               onMount={handleEditorDidMount}
// // // // // // // // //             />
// // // // // // // // //           </div>

// // // // // // // // //           {/* Run + Submit */}
// // // // // // // // //           <div className="bg-[#161b22] p-2 border-t border-neutral-700 flex justify-end gap-2">
// // // // // // // // //             <button
// // // // // // // // //               className={`btn btn-neutral btn-sm ${actionLoading ? 'loading' : ''}`}
// // // // // // // // //               onClick={handleRun}
// // // // // // // // //               disabled={actionLoading}
// // // // // // // // //             >
// // // // // // // // //               Run
// // // // // // // // //             </button>
// // // // // // // // //             <button
// // // // // // // // //               className={`btn btn-success btn-sm ${actionLoading ? 'loading' : ''}`}
// // // // // // // // //               onClick={handleSubmitCode}
// // // // // // // // //               disabled={actionLoading}
// // // // // // // // //             >
// // // // // // // // //               Submit
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </SplitPane>

// // // // // // // // //       {/* Output Panel */}
// // // // // // // // //       <div
// // // // // // // // //         id="output-panel"
// // // // // // // // //         className="bg-[#161b22] p-4 overflow-y-auto text-white text-sm max-h-[30vh] border-t border-neutral-700"
// // // // // // // // //       >
// // // // // // // // //         {activeBottomTab === 'testcase' &&
// // // // // // // // //           runResult?.testResults?.map((tc, i) => (
// // // // // // // // //             <div key={i} className="mb-4">
// // // // // // // // //               <div className={`font-semibold ${tc.isCorrect ? 'text-success' : 'text-error'}`}>
// // // // // // // // //                 {tc.isCorrect ? `✓ Case ${i + 1}` : `✗ Case ${i + 1}`}
// // // // // // // // //               </div>
// // // // // // // // //               <div className="font-mono bg-neutral-800 p-2 rounded mt-1">
// // // // // // // // //                 <p>
// // // // // // // // //                   <strong>Input:</strong> {tc.stdin}
// // // // // // // // //                 </p>
// // // // // // // // //                 <p>
// // // // // // // // //                   <strong>Expected:</strong> {tc.expected_output}
// // // // // // // // //                 </p>
// // // // // // // // //                 <p>
// // // // // // // // //                   <strong>Output:</strong> {tc.stdout}
// // // // // // // // //                 </p>
// // // // // // // // //                 <p>
// // // // // // // // //                   <strong>Status:</strong> {tc.status_description}
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}

// // // // // // // // //         {activeBottomTab === 'result' && submitResult && (
// // // // // // // // //           <div
// // // // // // // // //             className={`p-4 rounded ${
// // // // // // // // //               submitResult.status === 'accepted' ? 'bg-green-800' : 'bg-red-800'
// // // // // // // // //             }`}
// // // // // // // // //           >
// // // // // // // // //             <h2 className="text-xl font-bold">{submitResult.status}</h2>
// // // // // // // // //             {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // // // //             {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // // // //             {submitResult.errorMessage && <p>Error: {submitResult.errorMessage}</p>}
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default ProblemPage;
// // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // // import Editorial from '../components/Editorial';

// // // // // // // // const langMap = {
// // // // // // // //   cpp: 'C++',
// // // // // // // //   java: 'Java',
// // // // // // // //   javascript: 'JavaScript'
// // // // // // // // };

// // // // // // // // function ProblemPage() {
// // // // // // // //   const { problemid } = useParams();
// // // // // // // //   const [problem, setProblem] = useState(null);
// // // // // // // //   const [code, setCode] = useState('');
// // // // // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [runResult, setRunResult] = useState(null);
// // // // // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // // // // //   const [activeTab, setActiveTab] = useState('description');
// // // // // // // //   const editorRef = useRef(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchProblem = async () => {
// // // // // // // //       setLoading(true);
// // // // // // // //       try {
// // // // // // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // // //         setProblem(data);
// // // // // // // //         const starterCodeObj = data.startcode.find(sc =>
// // // // // // // //           selectedLanguage === 'cpp'
// // // // // // // //             ? ['cpp', 'c++'].includes(sc.language)
// // // // // // // //             : sc.language === selectedLanguage
// // // // // // // //         );
// // // // // // // //         setCode(starterCodeObj?.initialcode || '// Starter code not found.');
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error('Error fetching problem:', err);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchProblem();
// // // // // // // //   }, [problemid]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (problem) {
// // // // // // // //       const starterCodeObj = problem.startcode.find(sc =>
// // // // // // // //         selectedLanguage === 'cpp'
// // // // // // // //           ? ['cpp', 'c++'].includes(sc.language)
// // // // // // // //           : sc.language === selectedLanguage
// // // // // // // //       );
// // // // // // // //       setCode(starterCodeObj?.initialcode || `// Starter code for ${selectedLanguage} not available.`);
// // // // // // // //     }
// // // // // // // //   }, [selectedLanguage]);

// // // // // // // //   const handleRun = async () => {
// // // // // // // //     setRunResult(null);
// // // // // // // //     try {
// // // // // // // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // // // // // //         code,
// // // // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // // // //       });

// // // // // // // //       const testResults = data.map((result, i) => ({
// // // // // // // //         input: problem.visibletestcases[i]?.input || '',
// // // // // // // //         expected: problem.visibletestcases[i]?.output || '',
// // // // // // // //         output: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // // // //         passed: result.status.id === 3
// // // // // // // //       }));

// // // // // // // //       setRunResult(testResults);
// // // // // // // //     } catch (error) {
// // // // // // // //       setRunResult([{ error: 'Failed to run code.' }]);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async () => {
// // // // // // // //     setSubmitResult(null);
// // // // // // // //     try {
// // // // // // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // // // // // //         code,
// // // // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // // // //       });
// // // // // // // //       setSubmitResult(data);
// // // // // // // //     } catch (error) {
// // // // // // // //       setSubmitResult({ status: 'error', message: 'Submission failed' });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="text-center text-white mt-10">Loading...</div>;

// // // // // // // //   return (
// // // // // // // //     <div className="flex flex-col bg-[#0d1117] min-h-screen text-white p-4 gap-4">
      
// // // // // // // //       {/* Header with language and buttons */}
// // // // // // // //       <div className="flex justify-between items-center flex-wrap gap-2">
// // // // // // // //         <div className="flex gap-2">
// // // // // // // //           {Object.keys(langMap).map(lang => (
// // // // // // // //             <button
// // // // // // // //               key={lang}
// // // // // // // //               className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
// // // // // // // //               onClick={() => setSelectedLanguage(lang)}
// // // // // // // //             >
// // // // // // // //               {langMap[lang]}
// // // // // // // //             </button>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //         <div className="flex gap-2">
// // // // // // // //           <button className="btn btn-sm btn-outline" onClick={handleRun}>Run</button>
// // // // // // // //           <button className="btn btn-sm btn-success" onClick={handleSubmit}>Submit</button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Tabs */}
// // // // // // // //       <div className="tabs tabs-bordered text-white">
// // // // // // // //         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // // //           <a
// // // // // // // //             key={tab}
// // // // // // // //             className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
// // // // // // // //             onClick={() => setActiveTab(tab)}
// // // // // // // //           >
// // // // // // // //             {tab.toUpperCase()}
// // // // // // // //           </a>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {/* Tab content */}
// // // // // // // //       <div className="bg-[#161b22] rounded-lg p-4 overflow-auto max-h-[40vh]">
// // // // // // // //         {activeTab === 'description' && (
// // // // // // // //           <div>
// // // // // // // //             <h2 className="text-xl font-bold">{problem.title}</h2>
// // // // // // // //             <p className="text-gray-400 mb-2">{problem.difficulty?.toUpperCase()} | Tags: {problem.tags}</p>
// // // // // // // //             <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // // // //             <div className="mt-4 space-y-2">
// // // // // // // //               {problem.visibletestcases?.map((tc, idx) => (
// // // // // // // //                 <div key={idx} className="p-2 bg-[#0d1117] rounded border border-gray-700">
// // // // // // // //                   <p><strong>Input:</strong> {tc.input}</p>
// // // // // // // //                   <p><strong>Output:</strong> {tc.output}</p>
// // // // // // // //                   {tc.explanation && <p><strong>Explanation:</strong> {tc.explanation}</p>}
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //         {activeTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // // // //         {activeTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // // //         {activeTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // // //       </div>

// // // // // // // //       {/* Monaco Editor */}
// // // // // // // //       <div className="w-full h-[40vh] border border-gray-700 rounded-lg overflow-hidden">
// // // // // // // //         <Editor
// // // // // // // //           height="100%"
// // // // // // // //           width="100%"
// // // // // // // //           language={selectedLanguage}
// // // // // // // //           value={code}
// // // // // // // //           theme="vs-dark"
// // // // // // // //           onChange={(v) => setCode(v || '')}
// // // // // // // //           onMount={(editor) => editorRef.current = editor}
// // // // // // // //           options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {/* Result Display */}
// // // // // // // //       {(runResult || submitResult) && (
// // // // // // // //         <div className="bg-[#161b22] p-4 rounded-lg border border-gray-700">
// // // // // // // //           {runResult && (
// // // // // // // //             <div>
// // // // // // // //               <h3 className="text-lg font-semibold mb-2">Run Testcases:</h3>
// // // // // // // //               {runResult.map((tc, i) => (
// // // // // // // //                 <div key={i} className="mb-2 p-2 rounded bg-[#0d1117]">
// // // // // // // //                   {tc.error ? (
// // // // // // // //                     <p className="text-red-400">{tc.error}</p>
// // // // // // // //                   ) : (
// // // // // // // //                     <>
// // // // // // // //                       <p><strong>Input:</strong> {tc.input}</p>
// // // // // // // //                       <p><strong>Expected:</strong> {tc.expected}</p>
// // // // // // // //                       <p><strong>Output:</strong> {tc.output}</p>
// // // // // // // //                       <p className={tc.passed ? 'text-green-400' : 'text-red-400'}>
// // // // // // // //                         {tc.passed ? '✓ Passed' : '✗ Failed'}
// // // // // // // //                       </p>
// // // // // // // //                     </>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //           {submitResult && (
// // // // // // // //             <div>
// // // // // // // //               <h3 className="text-lg font-semibold mt-4">Submission Result:</h3>
// // // // // // // //               <p>Status: <strong>{submitResult.status}</strong></p>
// // // // // // // //               {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // // //               {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // // //               {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default ProblemPage;
// // // // // // // import { useEffect, useRef, useState } from 'react';
// // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // // // // import ChatAi from '../components/ChatAi';
// // // // // // // import Editorial from '../components/Editorial';

// // // // // // // const langMap = {
// // // // // // //   cpp: 'C++',
// // // // // // //   java: 'Java',
// // // // // // //   javascript: 'JavaScript'
// // // // // // // };

// // // // // // // function ProblemPage() {
// // // // // // //   const { problemid } = useParams();
// // // // // // //   const editorRef = useRef(null);

// // // // // // //   const [problem, setProblem] = useState(null);
// // // // // // //   const [code, setCode] = useState('');
// // // // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // // //   const [activeTab, setActiveTab] = useState('description');
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [runResult, setRunResult] = useState(null);
// // // // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // // // //   const [modalVisible, setModalVisible] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchProblem = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // // //         setProblem(data);
// // // // // // //         const starter = data.startcode.find(sc =>
// // // // // // //           selectedLanguage === 'cpp'
// // // // // // //             ? ['cpp', 'c++'].includes(sc.language)
// // // // // // //             : sc.language === selectedLanguage
// // // // // // //         );
// // // // // // //         setCode(starter?.initialcode || '// Starter code not found.');
// // // // // // //       } catch (err) {
// // // // // // //         console.error(err);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchProblem();
// // // // // // //   }, [problemid]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (!problem) return;
// // // // // // //     const starter = problem.startcode.find(sc =>
// // // // // // //       selectedLanguage === 'cpp'
// // // // // // //         ? ['cpp', 'c++'].includes(sc.language)
// // // // // // //         : sc.language === selectedLanguage
// // // // // // //     );
// // // // // // //     setCode(starter?.initialcode || `// Starter code for ${selectedLanguage} not available.`);
// // // // // // //   }, [selectedLanguage]);

// // // // // // //   const handleRun = async () => {
// // // // // // //     try {
// // // // // // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // // // // //         code,
// // // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // // //       });

// // // // // // //       const results = data.map((res, i) => ({
// // // // // // //         input: problem.visibletestcases[i]?.input,
// // // // // // //         expected: problem.visibletestcases[i]?.output,
// // // // // // //         output: res.stdout || res.stderr || res.compile_output || 'No output',
// // // // // // //         status: res.status.description,
// // // // // // //         passed: res.status.id === 3
// // // // // // //       }));

// // // // // // //       setRunResult(results);
// // // // // // //       setSubmitResult(null);
// // // // // // //       setModalVisible(true);
// // // // // // //     } catch {
// // // // // // //       setRunResult([{ error: 'Run failed.' }]);
// // // // // // //       setModalVisible(true);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async () => {
// // // // // // //     try {
// // // // // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // // // // //         code,
// // // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // // //       });
// // // // // // //       setRunResult(null);
// // // // // // //       setSubmitResult(data);
// // // // // // //       setModalVisible(true);
// // // // // // //     } catch {
// // // // // // //       setSubmitResult({ status: 'Error', message: 'Submission failed' });
// // // // // // //       setModalVisible(true);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (loading) return <div className="text-center text-white mt-10">Loading...</div>;

// // // // // // //   return (
// // // // // // //     <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-white">
      
// // // // // // //       {/* LEFT PANEL */}
// // // // // // //       <div className="w-full md:w-1/2 border-r border-gray-800 p-4 space-y-4">
// // // // // // //         {/* Language Selector & Buttons */}
// // // // // // //         <div className="flex flex-wrap justify-between items-center gap-2">
// // // // // // //           <select
// // // // // // //             className="select select-sm bg-[#161b22] text-white border-gray-600"
// // // // // // //             value={selectedLanguage}
// // // // // // //             onChange={(e) => setSelectedLanguage(e.target.value)}
// // // // // // //           >
// // // // // // //             {Object.entries(langMap).map(([key, name]) => (
// // // // // // //               <option key={key} value={key}>{name}</option>
// // // // // // //             ))}
// // // // // // //           </select>
// // // // // // //           <div className="flex gap-2">
// // // // // // //             <button className="btn btn-sm btn-neutral" onClick={handleRun}>Run</button>
// // // // // // //             <button className="btn btn-sm btn-success" onClick={handleSubmit}>Submit</button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Tab Nav */}
// // // // // // //         <div className="tabs tabs-bordered">
// // // // // // //           {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // // //             <a
// // // // // // //               key={tab}
// // // // // // //               className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
// // // // // // //               onClick={() => setActiveTab(tab)}
// // // // // // //             >
// // // // // // //               {tab.toUpperCase()}
// // // // // // //             </a>
// // // // // // //           ))}
// // // // // // //         </div>

// // // // // // //         {/* Tab Content */}
// // // // // // //         <div className="bg-[#161b22] rounded-lg p-4 overflow-y-auto max-h-[65vh]">
// // // // // // //           {activeTab === 'description' && (
// // // // // // //             <div>
// // // // // // //               <h2 className="text-2xl font-bold">{problem.title}</h2>
// // // // // // //               <p className="text-sm mb-2">{problem.difficulty} | Tags: {problem.tags}</p>
// // // // // // //               <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // // //               <h3 className="mt-4 font-semibold">Examples:</h3>
// // // // // // //               {problem.visibletestcases.map((tc, idx) => (
// // // // // // //                 <div key={idx} className="mt-2 p-2 border border-gray-600 rounded">
// // // // // // //                   <p><strong>Input:</strong> {tc.input}</p>
// // // // // // //                   <p><strong>Output:</strong> {tc.output}</p>
// // // // // // //                   {tc.explanation && <p><strong>Explanation:</strong> {tc.explanation}</p>}
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           {activeTab === 'editorial' && <Editorial secureUrl={problem.secureUrl} />}
// // // // // // //           {activeTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // // //           {activeTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* RIGHT PANEL: Editor */}
// // // // // // //       <div className="w-full md:w-1/2 p-4">
// // // // // // //         <div className="h-[80vh] border border-gray-700 rounded-lg overflow-hidden">
// // // // // // //           <Editor
// // // // // // //             height="100%"
// // // // // // //             width="100%"
// // // // // // //             theme="vs-dark"
// // // // // // //             value={code}
// // // // // // //             language={selectedLanguage}
// // // // // // //             onChange={(val) => setCode(val || '')}
// // // // // // //             onMount={(editor) => (editorRef.current = editor)}
// // // // // // //             options={{ fontSize: 14, minimap: { enabled: false } }}
// // // // // // //           />
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* MODAL FLOATING RESULT */}
// // // // // // //       {modalVisible && (
// // // // // // //         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
// // // // // // //           <div className="bg-[#161b22] p-6 rounded-xl shadow-lg max-w-xl w-full border border-gray-700 relative">
// // // // // // //             <button className="absolute top-2 right-2 text-white" onClick={() => setModalVisible(false)}>✖</button>

// // // // // // //             {runResult && (
// // // // // // //               <div>
// // // // // // //                 <h3 className="text-lg font-bold mb-4">Run Results</h3>
// // // // // // //                 {runResult.map((tc, i) => (
// // // // // // //                   <div key={i} className={`p-3 rounded mb-2 ${tc.passed ? 'bg-green-900' : 'bg-red-900'}`}>
// // // // // // //                     <p><strong>Input:</strong> {tc.input}</p>
// // // // // // //                     <p><strong>Expected:</strong> {tc.expected}</p>
// // // // // // //                     <p><strong>Output:</strong> {tc.output}</p>
// // // // // // //                     <p>Status: {tc.status}</p>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             )}

// // // // // // //             {submitResult && (
// // // // // // //               <div className="text-center">
// // // // // // //                 <h2 className="text-2xl font-bold text-green-400 mb-2">🎉 Wooh! {submitResult.status.toUpperCase()}</h2>
// // // // // // //                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // // //                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // // //                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default ProblemPage;
// // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { useParams } from 'react-router-dom';
// // // // // // import Editor from '@monaco-editor/react';
// // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // // // import ChatAi from '../components/ChatAi';
// // // // // // import Editorial from '../components/Editorial';

// // // // // // const langMap = {
// // // // // //   cpp: 'C++',
// // // // // //   java: 'Java',
// // // // // //   javascript: 'JavaScript'
// // // // // // };

// // // // // // function ProblemPage() {
// // // // // //   const { problemid } = useParams();
// // // // // //   const [problem, setProblem] = useState(null);
// // // // // //   const [code, setCode] = useState('');
// // // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [runResult, setRunResult] = useState(null);
// // // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // // //   const [activeTab, setActiveTab] = useState('description');
// // // // // //   const [showModal, setShowModal] = useState(false);
// // // // // //   const editorRef = useRef(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchProblem = async () => {
// // // // // //       setLoading(true);
// // // // // //       try {
// // // // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // // //         setProblem(data);
// // // // // //         const starter = data.startcode.find(sc =>
// // // // // //           selectedLanguage === 'cpp' ? ['cpp', 'c++'].includes(sc.language) : sc.language === selectedLanguage
// // // // // //         );
// // // // // //         setCode(starter?.initialcode || '// Starter code not found.');
// // // // // //       } catch (err) {
// // // // // //         console.error('Error fetching problem:', err);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchProblem();
// // // // // //   }, [problemid]);

// // // // // //   useEffect(() => {
// // // // // //     if (!problem) return;
// // // // // //     const starter = problem.startcode.find(sc =>
// // // // // //       selectedLanguage === 'cpp' ? ['cpp', 'c++'].includes(sc.language) : sc.language === selectedLanguage
// // // // // //     );
// // // // // //     setCode(starter?.initialcode || `// No code available for ${selectedLanguage}`);
// // // // // //   }, [selectedLanguage]);

// // // // // //   const handleRun = async () => {
// // // // // //     setShowModal(true);
// // // // // //     setRunResult(null);
// // // // // //     try {
// // // // // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // // // //         code,
// // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // //       });

// // // // // //       const results = data.map((result, i) => ({
// // // // // //         input: problem.visibletestcases[i]?.input || '',
// // // // // //         expected: problem.visibletestcases[i]?.output || '',
// // // // // //         output: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // // //         passed: result.status.id === 3
// // // // // //       }));

// // // // // //       setRunResult(results);
// // // // // //     } catch (err) {
// // // // // //       setRunResult([{ error: 'Code execution failed.' }]);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async () => {
// // // // // //     setShowModal(true);
// // // // // //     setSubmitResult(null);
// // // // // //     try {
// // // // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // // // //         code,
// // // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // // //       });
// // // // // //       setSubmitResult(data);
// // // // // //     } catch (err) {
// // // // // //       setSubmitResult({ status: 'error', message: 'Submission failed.' });
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) return <div className="text-center text-white mt-10">Loading...</div>;

// // // // // //   return (
// // // // // //     <div className="flex h-screen bg-[#0d1117] text-white overflow-hidden relative">

// // // // // //       {/* Embedded CSS for animations */}
// // // // // //       <style>
// // // // // //         {`
// // // // // //           @keyframes fadeIn {
// // // // // //             from { opacity: 0; transform: scale(0.95); }
// // // // // //             to { opacity: 1; transform: scale(1); }
// // // // // //           }
// // // // // //           .modal-animate {
// // // // // //             animation: fadeIn 0.3s ease-out;
// // // // // //           }
// // // // // //           .scrollbar-thin::-webkit-scrollbar {
// // // // // //             width: 6px;
// // // // // //           }
// // // // // //           .scrollbar-thin::-webkit-scrollbar-thumb {
// // // // // //             background: #444;
// // // // // //             border-radius: 5px;
// // // // // //           }
// // // // // //         `}
// // // // // //       </style>

// // // // // //       {/* Left Panel */}
// // // // // //       <div className="w-1/2 p-4 overflow-y-auto border-r border-gray-700 scrollbar-thin">
// // // // // //         <div className="tabs tabs-boxed mb-4">
// // // // // //           {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // // //             <button
// // // // // //               key={tab}
// // // // // //               className={`tab ${activeTab === tab ? 'tab-active bg-primary text-white' : ''}`}
// // // // // //               onClick={() => setActiveTab(tab)}
// // // // // //             >
// // // // // //               {tab.toUpperCase()}
// // // // // //             </button>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {activeTab === 'description' && (
// // // // // //           <div>
// // // // // //             <h1 className="text-xl font-bold">{problem.title}</h1>
// // // // // //             <p className="text-gray-400 mt-1">{problem.difficulty?.toUpperCase()} | Tags: {problem.tags}</p>
// // // // // //             <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // // //             <div className="mt-4 space-y-2">
// // // // // //               {problem.visibletestcases?.map((tc, i) => (
// // // // // //                 <div key={i} className="p-2 bg-[#0d1117] rounded border border-gray-700">
// // // // // //                   <p><strong>Input:</strong> {tc.input}</p>
// // // // // //                   <p><strong>Output:</strong> {tc.output}</p>
// // // // // //                   {tc.explanation && <p><strong>Explanation:</strong> {tc.explanation}</p>}
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //         {activeTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // // //         {activeTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // // //         {activeTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // // //       </div>

// // // // // //       {/* Right Panel */}
// // // // // //       <div className="w-1/2 p-4 flex flex-col">
// // // // // //         <div className="flex justify-between items-center mb-2">
// // // // // //           <select
// // // // // //             className="select select-sm bg-[#1c2128] border border-gray-600 text-white"
// // // // // //             value={selectedLanguage}
// // // // // //             onChange={e => setSelectedLanguage(e.target.value)}
// // // // // //           >
// // // // // //             {Object.entries(langMap).map(([key, label]) => (
// // // // // //               <option key={key} value={key}>{label}</option>
// // // // // //             ))}
// // // // // //           </select>
// // // // // //           <div className="flex gap-2">
// // // // // //             <button className="btn btn-sm btn-info" onClick={handleRun}>Run</button>
// // // // // //             <button className="btn btn-sm btn-success" onClick={handleSubmit}>Submit</button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="flex-grow border border-gray-700 rounded overflow-hidden">
// // // // // //           <Editor
// // // // // //             height="100%"
// // // // // //             width="100%"
// // // // // //             language={selectedLanguage}
// // // // // //             value={code}
// // // // // //             theme="vs-dark"
// // // // // //             onChange={v => setCode(v || '')}
// // // // // //             onMount={editor => (editorRef.current = editor)}
// // // // // //             options={{ fontSize: 14, minimap: { enabled: false } }}
// // // // // //           />
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Floating Modal for Results */}
// // // // // //       {showModal && (
// // // // // //         <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
// // // // // //           <div className="bg-[#1c2128] rounded-lg p-6 w-[90%] max-w-2xl modal-animate shadow-lg border border-gray-600">
// // // // // //             <div className="flex justify-between mb-4">
// // // // // //               <h2 className="text-xl font-bold">Result</h2>
// // // // // //               <button className="btn btn-sm btn-error" onClick={() => {
// // // // // //                 setShowModal(false);
// // // // // //                 setRunResult(null);
// // // // // //                 setSubmitResult(null);
// // // // // //               }}>Close</button>
// // // // // //             </div>

// // // // // //             {runResult && (
// // // // // //               <div className="space-y-2">
// // // // // //                 <h3 className="font-semibold">Run Test Cases</h3>
// // // // // //                 {runResult.map((tc, i) => (
// // // // // //                   <div key={i} className="p-3 rounded bg-[#0d1117] border border-gray-700">
// // // // // //                     <p><strong>Input:</strong> {tc.input}</p>
// // // // // //                     <p><strong>Expected:</strong> {tc.expected}</p>
// // // // // //                     <p><strong>Output:</strong> {tc.output}</p>
// // // // // //                     <p className={tc.passed ? 'text-green-400' : 'text-red-400'}>
// // // // // //                       {tc.passed ? '✓ Passed' : '✗ Failed'}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {submitResult && (
// // // // // //               <div className="mt-4 text-center">
// // // // // //                 <h3 className="text-2xl font-bold text-green-400">🎉 Wooh! {submitResult.status.toUpperCase()}</h3>
// // // // // //                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // // //                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // // //                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default ProblemPage;
// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import Editor from '@monaco-editor/react';
// // // // // import axiosClient from '../utils/axiosClient';
// // // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // // import ChatAi from '../components/ChatAi';
// // // // // import Editorial from '../components/Editorial';

// // // // // const langMap = { cpp: 'C++', java: 'Java', javascript: 'JavaScript' };

// // // // // function ProblemPage() {
// // // // //   const { problemid } = useParams();
// // // // //   const [problem, setProblem] = useState(null);
// // // // //   const [code, setCode] = useState('');
// // // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [runResult, setRunResult] = useState(null);
// // // // //   const [submitResult, setSubmitResult] = useState(null);
// // // // //   const [activeTab, setActiveTab] = useState('description');
// // // // //   const [showModal, setShowModal] = useState(false);
// // // // //   const editorRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const fetchProblem = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // // //         setProblem(data);
// // // // //         const starter = data.startcode.find(sc =>
// // // // //           selectedLanguage === 'cpp' ? ['cpp', 'c++'].includes(sc.language) : sc.language === selectedLanguage
// // // // //         );
// // // // //         setCode(starter?.initialcode || '// Starter code not found.');
// // // // //       } catch (err) {
// // // // //         console.error('Fetch error:', err);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchProblem();
// // // // //   }, [problemid]);

// // // // //   useEffect(() => {
// // // // //     if (!problem) return;
// // // // //     const starter = problem.startcode.find(sc =>
// // // // //       selectedLanguage === 'cpp' ? ['cpp', 'c++'].includes(sc.language) : sc.language === selectedLanguage
// // // // //     );
// // // // //     setCode(starter?.initialcode || `// No code for ${selectedLanguage}`);
// // // // //   }, [selectedLanguage]);

// // // // //   const handleRun = async () => {
// // // // //     setShowModal(true);
// // // // //     setRunResult(null);
// // // // //     try {
// // // // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // // //         code,
// // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // //       });
// // // // //       const results = data.map((result, i) => ({
// // // // //         input: problem.visibletestcases[i]?.input || '',
// // // // //         expected: problem.visibletestcases[i]?.output || '',
// // // // //         output: result.stdout || result.stderr || result.compile_output || 'No output',
// // // // //         passed: result.status.id === 3
// // // // //       }));
// // // // //       setRunResult(results);
// // // // //     } catch {
// // // // //       setRunResult([{ error: 'Code execution failed.' }]);
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async () => {
// // // // //     setShowModal(true);
// // // // //     setSubmitResult(null);
// // // // //     try {
// // // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // // //         code,
// // // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // // //       });
// // // // //       setSubmitResult(data);
// // // // //     } catch {
// // // // //       setSubmitResult({ status: 'error', message: 'Submission failed.' });
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <div className="text-center text-white mt-10">Loading...</div>;

// // // // //   return (
// // // // //     <div className="flex h-screen bg-gradient-to-tr from-[#0d1117] to-[#1a1f2e] text-white relative font-sans">
// // // // //       {/* Embedded CSS for style/animation */}
// // // // //       <style>
// // // // //         {`
// // // // //         @keyframes fadeIn {
// // // // //           0% { opacity: 0; transform: scale(0.9); }
// // // // //           100% { opacity: 1; transform: scale(1); }
// // // // //         }
// // // // //         .modal-animate {
// // // // //           animation: fadeIn 0.3s ease-out;
// // // // //         }
// // // // //         .watermark::before {
// // // // //           content: "CodeVerse";
// // // // //           position: fixed;
// // // // //           bottom: 5%;
// // // // //           left: 50%;
// // // // //           transform: translateX(-50%);
// // // // //           font-size: 8rem;
// // // // //           color: rgba(255, 255, 255, 0.02);
// // // // //           z-index: 0;
// // // // //           user-select: none;
// // // // //           pointer-events: none;
// // // // //         }
// // // // //         `}
// // // // //       </style>

// // // // //       {/* Left Panel */}
// // // // //       <div className="w-1/2 p-4 overflow-y-auto border-r border-gray-700 relative z-10">
// // // // //         <div className="tabs tabs-boxed mb-4">
// // // // //           {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // // //             <button
// // // // //               key={tab}
// // // // //               className={`tab ${activeTab === tab ? 'tab-active bg-primary text-white' : ''}`}
// // // // //               onClick={() => setActiveTab(tab)}
// // // // //             >
// // // // //               {tab.toUpperCase()}
// // // // //             </button>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="watermark" />
// // // // //         {activeTab === 'description' && (
// // // // //           <div>
// // // // //             <h1 className="text-xl font-bold">{problem.title}</h1>
// // // // //             <p className="text-gray-400 mt-1">{problem.difficulty?.toUpperCase()} | Tags: {problem.tags}</p>
// // // // //             <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // // //             <div className="mt-4 space-y-2">
// // // // //               {problem.visibletestcases?.map((tc, i) => (
// // // // //                 <div key={i} className="p-2 bg-[#0d1117] rounded border border-gray-700">
// // // // //                   <p><strong>Input:</strong> {tc.input}</p>
// // // // //                   <p><strong>Output:</strong> {tc.output}</p>
// // // // //                   {tc.explanation && <p><strong>Explanation:</strong> {tc.explanation}</p>}
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //         {activeTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // // //         {activeTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // // //         {activeTab === 'chatAi' && <ChatAi problem={problem} />}
// // // // //       </div>

// // // // //       {/* Right Panel */}
// // // // //       <div className="w-1/2 p-4 flex flex-col z-10">
// // // // //         <div className="flex justify-between items-center mb-2">
// // // // //           <select
// // // // //             className="select select-sm bg-[#1c2128] border border-gray-600 text-white"
// // // // //             value={selectedLanguage}
// // // // //             onChange={e => setSelectedLanguage(e.target.value)}
// // // // //           >
// // // // //             {Object.entries(langMap).map(([key, label]) => (
// // // // //               <option key={key} value={key}>{label}</option>
// // // // //             ))}
// // // // //           </select>
// // // // //           <div className="flex gap-2">
// // // // //             <button className="btn btn-sm btn-info" onClick={handleRun}>Run</button>
// // // // //             <button className="btn btn-sm btn-success" onClick={handleSubmit}>Submit</button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex-grow border border-gray-700 rounded overflow-hidden">
// // // // //           <Editor
// // // // //             height="100%"
// // // // //             width="100%"
// // // // //             language={selectedLanguage}
// // // // //             value={code}
// // // // //             theme="vs-dark"
// // // // //             onChange={v => setCode(v || '')}
// // // // //             onMount={editor => (editorRef.current = editor)}
// // // // //             options={{ fontSize: 14, minimap: { enabled: false } }}
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Floating Result Modal */}
// // // // //       {showModal && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
// // // // //           <div className="bg-[#1c2128] rounded-lg p-6 w-[90%] max-w-2xl modal-animate shadow-lg border border-gray-600">
// // // // //             <div className="flex justify-between mb-4">
// // // // //               <h2 className="text-xl font-bold">Result</h2>
// // // // //               <button className="btn btn-sm btn-error" onClick={() => {
// // // // //                 setShowModal(false);
// // // // //                 setRunResult(null);
// // // // //                 setSubmitResult(null);
// // // // //               }}>Close</button>
// // // // //             </div>

// // // // //             {runResult && (
// // // // //               <div className="space-y-2">
// // // // //                 <h3 className="font-semibold">Run Test Cases</h3>
// // // // //                 {runResult.map((tc, i) => (
// // // // //                   <div key={i} className="p-3 rounded bg-[#0d1117] border border-gray-700">
// // // // //                     <p><strong>Input:</strong> {tc.input}</p>
// // // // //                     <p><strong>Expected:</strong> {tc.expected}</p>
// // // // //                     <p><strong>Output:</strong> {tc.output}</p>
// // // // //                     <p className={tc.passed ? 'text-green-400' : 'text-red-400'}>
// // // // //                       {tc.passed ? '✓ Passed' : '✗ Failed'}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}

// // // // //             {submitResult && (
// // // // //               <div className="mt-4 text-center">
// // // // //                 <h3 className="text-2xl font-bold text-green-400">🎉 Wooh! {submitResult.status.toUpperCase()}</h3>
// // // // //                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // // // //                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // // // //                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default ProblemPage;
// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useParams } from 'react-router-dom';
// // // // import Editor from '@monaco-editor/react';
// // // // import axiosClient from '../utils/axiosClient';
// // // // import SubmissionHistory from '../components/SubmissionHistory';
// // // // import ChatAi from '../components/ChatAi';
// // // // import Editorial from '../components/Editorial';

// // // // const langMap = {
// // // //   cpp: 'C++',
// // // //   java: 'Java',
// // // //   javascript: 'JavaScript'
// // // // };

// // // // function ProblemPage() {
// // // //   const { problemid } = useParams();
// // // //   const [problem, setProblem] = useState(null);
// // // //   const [code, setCode] = useState('');
// // // //   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [runResult, setRunResult] = useState(null);
// // // //   const [submitResult, setSubmitResult] = useState(null);
// // // //   const [activeTab, setActiveTab] = useState('description');
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [modalContent, setModalContent] = useState(null);
// // // //   const editorRef = useRef(null);

// // // //   // Styling applied inline
// // // //   const styles = {
// // // //     page: {
// // // //       minHeight: '100vh',
// // // //       background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
// // // //       padding: '20px',
// // // //       color: 'white',
// // // //       fontFamily: 'monospace',
// // // //       position: 'relative',
// // // //     },
// // // //     watermark: {
// // // //       position: 'absolute',
// // // //       bottom: 10,
// // // //       right: 10,
// // // //       opacity: 0.05,
// // // //       fontSize: '6rem',
// // // //       userSelect: 'none',
// // // //       pointerEvents: 'none',
// // // //     },
// // // //     card: {
// // // //       background: '#1e293b',
// // // //       padding: '20px',
// // // //       borderRadius: '10px',
// // // //       marginBottom: '20px',
// // // //       boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
// // // //     },
// // // //     tab: (active) => ({
// // // //       cursor: 'pointer',
// // // //       padding: '8px 16px',
// // // //       borderBottom: active ? '2px solid cyan' : '2px solid transparent',
// // // //     }),
// // // //     modal: {
// // // //       position: 'fixed',
// // // //       top: '50%',
// // // //       left: '50%',
// // // //       transform: 'translate(-50%, -50%) scale(1)',
// // // //       background: '#1f2937',
// // // //       padding: '30px',
// // // //       borderRadius: '12px',
// // // //       boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
// // // //       zIndex: 1000,
// // // //       transition: 'all 0.4s ease',
// // // //       color: 'white',
// // // //     },
// // // //     backdrop: {
// // // //       position: 'fixed',
// // // //       top: 0, left: 0, right: 0, bottom: 0,
// // // //       backgroundColor: 'rgba(0,0,0,0.6)',
// // // //       zIndex: 999,
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const fetchProblem = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // // //         setProblem(data);
// // // //         const starterCode = data.startcode.find(sc =>
// // // //           selectedLanguage === 'cpp'
// // // //             ? ['cpp', 'c++'].includes(sc.language)
// // // //             : sc.language === selectedLanguage
// // // //         );
// // // //         setCode(starterCode?.initialcode || '// Starter code not found.');
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchProblem();
// // // //   }, [problemid]);

// // // //   useEffect(() => {
// // // //     if (problem) {
// // // //       const starter = problem.startcode.find(sc =>
// // // //         selectedLanguage === 'cpp'
// // // //           ? ['cpp', 'c++'].includes(sc.language)
// // // //           : sc.language === selectedLanguage
// // // //       );
// // // //       setCode(starter?.initialcode || `// No starter code for ${selectedLanguage}`);
// // // //     }
// // // //   }, [selectedLanguage]);

// // // //   const handleRun = async () => {
// // // //     setShowModal(true);
// // // //     setModalContent(<div>Running your code...</div>);
// // // //     try {
// // // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // // //         code,
// // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // //       });
// // // //       const results = data.map((res, i) => ({
// // // //         input: problem.visibletestcases[i]?.input,
// // // //         expected: problem.visibletestcases[i]?.output,
// // // //         output: res.stdout || res.stderr || res.compile_output || 'No output',
// // // //         status: res.status.description,
// // // //         passed: res.status.id === 3
// // // //       }));

// // // //       setRunResult(results);
// // // //       setModalContent(
// // // //         <div>
// // // //           <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Testcase Results:</h2>
// // // //           {results.map((r, i) => (
// // // //             <div key={i} style={{ marginBottom: 10, padding: 10, background: '#111827', borderRadius: 8 }}>
// // // //               <p><strong>Input:</strong> {r.input}</p>
// // // //               <p><strong>Expected:</strong> {r.expected}</p>
// // // //               <p><strong>Output:</strong> {r.output}</p>
// // // //               <p style={{ color: r.passed ? 'lightgreen' : 'red' }}>{r.passed ? '✓ Passed' : '✗ Failed'}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       );
// // // //     } catch (err) {
// // // //       setModalContent(<div style={{ color: 'red' }}>Run Failed. Try again.</div>);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     setShowModal(true);
// // // //     setModalContent(<div>Submitting your solution...</div>);
// // // //     try {
// // // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // // //         code,
// // // //         language: selectedLanguage === 'cpp' ? 'c++' : selectedLanguage
// // // //       });
// // // //       setSubmitResult(data);
// // // //       setModalContent(
// // // //         <div style={{ textAlign: 'center' }}>
// // // //           <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🎉 Wooh! Submission {data.status.toUpperCase()}</h2>
// // // //           {data.runtime && <p>Runtime: {data.runtime} ms</p>}
// // // //           {data.memory && <p>Memory: {data.memory} KB</p>}
// // // //           {data.errorMessage && <p style={{ color: 'red' }}>{data.errorMessage}</p>}
// // // //         </div>
// // // //       );
// // // //     } catch (err) {
// // // //       setModalContent(<div style={{ color: 'red' }}>Submission Failed.</div>);
// // // //     }
// // // //   };

// // // //   if (loading) return <div style={styles.page}>Loading...</div>;

// // // //   return (
// // // //     <div style={styles.page}>
// // // //       <div style={styles.watermark}>CodeArena</div>

// // // //       {/* Language Selector + Buttons */}
// // // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 10 }}>
// // // //         <select
// // // //           value={selectedLanguage}
// // // //           onChange={(e) => setSelectedLanguage(e.target.value)}
// // // //           style={{ padding: 8, borderRadius: 6, background: '#111827', color: 'white', border: '1px solid #444' }}
// // // //         >
// // // //           {Object.entries(langMap).map(([val, label]) => (
// // // //             <option key={val} value={val}>{label}</option>
// // // //           ))}
// // // //         </select>
// // // //         <div style={{ display: 'flex', gap: 10 }}>
// // // //           <button className="btn btn-outline btn-sm" onClick={handleRun}>Run</button>
// // // //           <button className="btn btn-success btn-sm" onClick={handleSubmit}>Submit</button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Tabs */}
// // // //       <div style={{ display: 'flex', borderBottom: '1px solid #444', marginBottom: 10 }}>
// // // //         {['description', 'editorial', 'submissions', 'chatAi'].map(tab => (
// // // //           <div
// // // //             key={tab}
// // // //             style={styles.tab(activeTab === tab)}
// // // //             onClick={() => setActiveTab(tab)}
// // // //           >
// // // //             {tab.toUpperCase()}
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Tab Content */}
// // // //       <div style={styles.card}>
// // // //         {activeTab === 'description' && (
// // // //           <div>
// // // //             <h2 style={{ fontSize: '1.5rem' }}>{problem.title}</h2>
// // // //             <div dangerouslySetInnerHTML={{ __html: problem.description }} />
// // // //             <div style={{ marginTop: 10 }}>
// // // //               {problem.visibletestcases?.map((ex, i) => (
// // // //                 <div key={i} style={{ background: '#0f172a', margin: '10px 0', padding: 10, borderRadius: 8 }}>
// // // //                   <p><strong>Input:</strong> {ex.input}</p>
// // // //                   <p><strong>Output:</strong> {ex.output}</p>
// // // //                   {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //         {activeTab === 'editorial' && <Editorial secureUrl={problem?.secureUrl} />}
// // // //         {activeTab === 'submissions' && <SubmissionHistory problemid={problemid} />}
// // // //         {activeTab === 'chatAi' && <ChatAi problem={problem} />}
// // // //       </div>

// // // //       {/* Editor */}
// // // //       <div style={{ ...styles.card, height: '40vh' }}>
// // // //         <Editor
// // // //           height="100%"
// // // //           width="100%"
// // // //           language={selectedLanguage}
// // // //           value={code}
// // // //           theme="vs-dark"
// // // //           onChange={(v) => setCode(v || '')}
// // // //           onMount={(editor) => editorRef.current = editor}
// // // //           options={{ minimap: { enabled: false }, fontSize: 14 }}
// // // //         />
// // // //       </div>

// // // //       {/* Floating Modal */}
// // // //       {showModal && (
// // // //         <>
// // // //           <div style={styles.backdrop} onClick={() => setShowModal(false)} />
// // // //           <div style={styles.modal}>
// // // //             {modalContent}
// // // //             <div style={{ marginTop: 20 }}>
// // // //               <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Close</button>
// // // //             </div>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ProblemPage;
// // // // ProblemPage.jsx
// // // import { useState, useEffect, useRef } from "react";
// // // import { useParams } from "react-router-dom";
// // // import Editor from "@monaco-editor/react";
// // // import axiosClient from "../utils/axiosClient";
// // // import SubmissionHistory from "../components/SubmissionHistory";
// // // import Editorial from "../components/Editorial";
// // // import ChatAi from "../components/ChatAi";

// // // const langMap = {
// // //   cpp: "C++",
// // //   java: "Java",
// // //   javascript: "JavaScript",
// // // };

// // // function ProblemPage() {
// // //   const { problemid } = useParams();
// // //   const [problem, setProblem] = useState(null);
// // //   const [code, setCode] = useState("");
// // //   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
// // //   const [loading, setLoading] = useState(true);
// // //   const [runResult, setRunResult] = useState(null);
// // //   const [submitResult, setSubmitResult] = useState(null);
// // //   const [activeTab, setActiveTab] = useState("description");
// // //   const [showModal, setShowModal] = useState(false);
// // //   const editorRef = useRef(null);

// // //   useEffect(() => {
// // //     const fetchProblem = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// // //         setProblem(data);
// // //         const starter = data.startcode.find((sc) =>
// // //           selectedLanguage === "cpp"
// // //             ? ["cpp", "c++"].includes(sc.language)
// // //             : sc.language === selectedLanguage
// // //         );
// // //         setCode(starter?.initialcode || "// No starter code found.");
// // //       } catch (err) {
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchProblem();
// // //   }, [problemid]);

// // //   useEffect(() => {
// // //     if (problem) {
// // //       const starter = problem.startcode.find((sc) =>
// // //         selectedLanguage === "cpp"
// // //           ? ["cpp", "c++"].includes(sc.language)
// // //           : sc.language === selectedLanguage
// // //       );
// // //       setCode(starter?.initialcode || `// No code for ${selectedLanguage}`);
// // //     }
// // //   }, [selectedLanguage]);

// // //   const handleRun = async () => {
// // //     setShowModal(true);
// // //     setRunResult(null);
// // //     try {
// // //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// // //         code,
// // //         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage,
// // //       });
// // //       const results = data.map((res, i) => ({
// // //         input: problem.visibletestcases[i]?.input,
// // //         expected: problem.visibletestcases[i]?.output,
// // //         output: res.stdout || res.stderr || res.compile_output || "No output",
// // //         passed: res.status.id === 3,
// // //       }));
// // //       setRunResult(results);
// // //     } catch (err) {
// // //       setRunResult([{ error: "Run Failed. Try again." }]);
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     setShowModal(true);
// // //     setSubmitResult(null);
// // //     try {
// // //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// // //         code,
// // //         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage,
// // //       });
// // //       setSubmitResult(data);
// // //     } catch (err) {
// // //       setSubmitResult({ status: "error", message: "Submission failed." });
// // //     }
// // //   };

// // //   if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono relative">
// // //       <style>
// // //         {`
// // //         .tab-active {
// // //           border-bottom: 2px solid cyan;
// // //         }
// // //         .fade-in {
// // //           animation: fadeIn 0.3s ease-in-out;
// // //         }
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; transform: translateY(10px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }
// // //         `}
// // //       </style>

// // //       <div className="absolute bottom-5 right-5 text-7xl opacity-5 select-none pointer-events-none font-extrabold">
// // //         CodeArena
// // //       </div>

// // //       {/* Header Controls */}
// // //       <div className="p-4 flex flex-wrap justify-between items-center gap-4">
// // //         <select
// // //           value={selectedLanguage}
// // //           onChange={(e) => setSelectedLanguage(e.target.value)}
// // //           className="bg-gray-800 border border-gray-600 p-2 rounded text-white"
// // //         >
// // //           {Object.entries(langMap).map(([key, label]) => (
// // //             <option key={key} value={key}>
// // //               {label}
// // //             </option>
// // //           ))}
// // //         </select>
// // //         <div className="flex gap-3">
// // //           <button onClick={handleRun} className="btn btn-sm btn-info">
// // //             Run
// // //           </button>
// // //           <button onClick={handleSubmit} className="btn btn-sm btn-success">
// // //             Submit
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Tabs */}
// // //       <div className="flex border-b border-gray-600 px-4 space-x-6">
// // //         {["description", "editorial", "submissions", "chatAi"].map((tab) => (
// // //           <div
// // //             key={tab}
// // //             onClick={() => setActiveTab(tab)}
// // //             className={`cursor-pointer pb-2 transition ${
// // //               activeTab === tab ? "tab-active text-cyan-400" : "text-gray-300"
// // //             }`}
// // //           >
// // //             {tab.toUpperCase()}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Tab Content */}
// // //       <div className="p-4 fade-in">
// // //         {activeTab === "description" && (
// // //           <div>
// // //             <h2 className="text-2xl font-bold">{problem.title}</h2>
// // //             <div dangerouslySetInnerHTML={{ __html: problem.description }} className="prose prose-invert mt-4" />
// // //             <div className="mt-4 space-y-2">
// // //               {problem.visibletestcases?.map((ex, i) => (
// // //                 <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700">
// // //                   <p>
// // //                     <strong>Input:</strong> {ex.input}
// // //                   </p>
// // //                   <p>
// // //                     <strong>Output:</strong> {ex.output}
// // //                   </p>
// // //                   {ex.explanation && (
// // //                     <p>
// // //                       <strong>Explanation:</strong> {ex.explanation}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}
// // //         {activeTab === "editorial" && <Editorial secureUrl={problem?.secureUrl} />}
// // //         {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
// // //         {activeTab === "chatAi" && <ChatAi problem={problem} />}
// // //       </div>

// // //       {/* Editor */}
// // //       <div className="p-4 fade-in">
// // //         <div className="h-[400px] border border-gray-700 rounded overflow-hidden">
// // //           <Editor
// // //             language={selectedLanguage}
// // //             value={code}
// // //             onChange={(v) => setCode(v || "")}
// // //             theme="vs-dark"
// // //             onMount={(editor) => (editorRef.current = editor)}
// // //             options={{ minimap: { enabled: false }, fontSize: 14 }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Floating Modal */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
// // //           <div className="bg-gray-900 rounded-lg p-6 w-[90%] max-w-2xl shadow-lg border border-gray-700 fade-in">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-xl font-bold">Result</h3>
// // //               <button onClick={() => setShowModal(false)} className="btn btn-sm btn-error">
// // //                 Close
// // //               </button>
// // //             </div>
// // //             {runResult &&
// // //               runResult.map((r, i) => (
// // //                 <div key={i} className="bg-gray-800 p-4 rounded mb-2">
// // //                   <p>
// // //                     <strong>Input:</strong> {r.input}
// // //                   </p>
// // //                   <p>
// // //                     <strong>Expected:</strong> {r.expected}
// // //                   </p>
// // //                   <p>
// // //                     <strong>Output:</strong> {r.output}
// // //                   </p>
// // //                   <p className={r.passed ? "text-green-400" : "text-red-400"}>
// // //                     {r.passed ? "✓ Passed" : "✗ Failed"}
// // //                   </p>
// // //                 </div>
// // //               ))}
// // //             {submitResult && (
// // //               <div className="text-center mt-4">
// // //                 <h2 className="text-2xl text-green-400">🎉 {submitResult.status.toUpperCase()}</h2>
// // //                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// // //                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// // //                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default ProblemPage;

// // import { useEffect, useState, useRef } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import Editor from "@monaco-editor/react";
// // import axiosClient from "../utils/axiosClient";
// // import SubmissionHistory from "../components/SubmissionHistory";
// // import Editorial from "../components/Editorial";
// // import ChatAi from "../components/ChatAi";

// // const langMap = {
// //   cpp: "C++",
// //   java: "Java",
// //   javascript: "JavaScript"
// // };

// // function ProblemPage() {
// //   const { problemid } = useParams();
// //   const navigate = useNavigate();
// //   const editorRef = useRef(null);

// //   const [problem, setProblem] = useState(null);
// //   const [code, setCode] = useState("");
// //   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
// //   const [loading, setLoading] = useState(true);
// //   const [runResult, setRunResult] = useState(null);
// //   const [submitResult, setSubmitResult] = useState(null);
// //   const [activeTab, setActiveTab] = useState("description");
// //   const [showModal, setShowModal] = useState(false);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [allProblems, setAllProblems] = useState([]);
// //   const [showProblemList, setShowProblemList] = useState(false);
// //   const [loadingModalText, setLoadingModalText] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
// //         setProblem(data);
// //         const starter = data.startcode.find(sc =>
// //           selectedLanguage === "cpp"
// //             ? ["cpp", "c++"].includes(sc.language)
// //             : sc.language === selectedLanguage
// //         );
// //         setCode(starter?.initialcode || "// No starter code available");
// //       } catch (err) {
// //         console.error("Error loading problem:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [problemid]);

// //   useEffect(() => {
// //     if (problem) {
// //       const starter = problem.startcode.find(sc =>
// //         selectedLanguage === "cpp"
// //           ? ["cpp", "c++"].includes(sc.language)
// //           : sc.language === selectedLanguage
// //       );
// //       setCode(starter?.initialcode || "// No starter code for this language.");
// //     }
// //   }, [selectedLanguage]);

// //   const handleRun = async () => {
// //     setShowModal(true);
// //     setLoadingModalText("Running...");
// //     setRunResult(null);
// //     setSubmitResult(null);
// //     try {
// //       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
// //         code,
// //         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
// //       });
// //       const results = data.map((res, i) => ({
// //         input: problem.visibletestcases[i]?.input || "",
// //         expected: problem.visibletestcases[i]?.output || "",
// //         output: res.stdout || res.stderr || res.compile_output || "No output",
// //         passed: res.status.id === 3
// //       }));
// //       setRunResult(results);
// //     } catch {
// //       setRunResult([{ error: "Run failed. Please try again." }]);
// //     } finally {
// //       setLoadingModalText("");
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     setShowModal(true);
// //     setLoadingModalText("Submitting...");
// //     setRunResult(null);
// //     setSubmitResult(null);
// //     try {
// //       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
// //         code,
// //         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
// //       });
// //       setSubmitResult(data);
// //     } catch {
// //       setSubmitResult({ status: "error", message: "Submission failed." });
// //     } finally {
// //       setLoadingModalText("");
// //     }
// //   };

// //   const handleResetCode = () => {
// //     if (problem) {
// //       const starter = problem.startcode.find(sc =>
// //         selectedLanguage === "cpp"
// //           ? ["cpp", "c++"].includes(sc.language)
// //           : sc.language === selectedLanguage
// //       );
// //       setCode(starter?.initialcode || "// No starter code for this language.");
// //     }
// //   };

// //   const toggleFullScreen = () => {
// //     setIsFullScreen(!isFullScreen);
// //     if (!isFullScreen) document.documentElement.requestFullscreen();
// //     else document.exitFullscreen();
// //   };

// //   const fetchAllProblems = async () => {
// //     if (allProblems.length > 0) {
// //       setShowProblemList(!showProblemList);
// //       return;
// //     }
// //     try {
// //       const res = await axiosClient.get("/problem/getallproblem");
// //       setAllProblems(res.data);
// //       setShowProblemList(true);
// //     } catch (err) {
// //       alert("Failed to load problem list.");
// //     }
// //   };

// //   if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

// //   return (
// //     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono">
// //       <style>{`
// //         .tab-active { border-bottom: 2px solid cyan; }
// //         .fade-in { animation: fadeIn 0.3s ease-in-out; }
// //         @keyframes fadeIn { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
// //       `}</style>

// //       <div className="w-full md:w-1/2 p-4 overflow-y-auto space-y-4">
// //         <div className="flex justify-between items-center mb-2">
// //           <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>🧠 CoderWorld</div>
// //           <div className="text-cyan-300 cursor-pointer hover:underline flex items-center gap-1" onClick={fetchAllProblems}>📘 Problems</div>
// //         </div>

// //         {showProblemList && (
// //           <div className="bg-gray-900 border border-gray-700 p-3 rounded mb-4 max-h-52 overflow-y-auto">
// //             <h3 className="text-lg mb-2 font-semibold">All Problems</h3>
// //             <ul className="space-y-2">
// //               {allProblems.map((p) => (
// //                 <li key={p._id} className="hover:underline text-cyan-300 cursor-pointer" onClick={() => navigate(`/problem/${p._id}`)}>➤ {p.title}</li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}

// //         <div className="flex space-x-6 border-b border-gray-600 text-gray-300">
// //           {["description", "editorial", "submissions", "chatAi"].map(tab => (
// //             <div key={tab} onClick={() => setActiveTab(tab)} className={`py-2 cursor-pointer transition ${activeTab === tab ? "tab-active text-cyan-400" : ""}`}>
// //               {tab.toUpperCase()}
// //             </div>
// //           ))}
// //         </div>

// //         <div className="fade-in">
// //           {activeTab === "description" && (
// //             <>
// //               <h2 className="text-xl font-bold">{problem?.title}</h2>
// //               <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem?.description }} />
// //               <div className="mt-4 space-y-2">
// //                 {(problem?.visibletestcases || []).map((ex, i) => (
// //                   <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700">
// //                     <p><strong>Input:</strong> {ex.input}</p>
// //                     <p><strong>Output:</strong> {ex.output}</p>
// //                     {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           )}
// //           {activeTab === "editorial" && <Editorial secureUrl={problem?.secureUrl} />}
// //           {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
// //           {activeTab === "chatAi" && <ChatAi problem={problem} />}
// //         </div>
// //       </div>

// //       <div className="w-full md:w-1/2 p-4 flex flex-col gap-3">
// //         <div className="flex flex-wrap justify-between items-center gap-2">
// //           <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="bg-gray-800 border border-gray-600 text-white p-2 rounded">
// //             {Object.entries(langMap).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
// //           </select>
// //           <div className="flex flex-wrap gap-2">
// //             <button onClick={handleRun} className="btn btn-info btn-sm">Run</button>
// //             <button onClick={handleSubmit} className="btn btn-success btn-sm">Submit</button>
// //             <button onClick={() => navigator.clipboard.writeText(code)} className="btn btn-primary btn-sm">Copy</button>
// //             <button onClick={handleResetCode} className="btn btn-warning btn-sm">Reset</button>
// //             <button onClick={() => alert("Format Placeholder")} className="btn btn-secondary btn-sm">Format</button>
// //             <button onClick={toggleFullScreen} className="btn btn-outline btn-sm">{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
// //           </div>
// //         </div>
// //         <div className="flex-grow border border-gray-700 rounded overflow-hidden">
// //           <Editor language={selectedLanguage} value={code} onChange={(v) => setCode(v || "")} theme="vs-dark" onMount={(editor) => (editorRef.current = editor)} options={{ minimap: { enabled: false }, fontSize: 14 }} />
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
// //           <div className="bg-gray-900 rounded-lg p-6 max-w-xl w-full border border-gray-700 fade-in">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-xl font-bold">Result</h3>
// //               <button onClick={() => setShowModal(false)} className="btn btn-error btn-sm">Close</button>
// //             </div>
// //             {loadingModalText && (
// //               <div className="text-center text-cyan-400 animate-pulse mb-4 text-lg font-semibold">
// //                 {loadingModalText === "Running..." ? "💻✨ Running your code..." : "🚀✨ Submitting your code..."}
// //               </div>
// //             )}
// //             {runResult && runResult.map((r, i) => (
// //               <div key={i} className="bg-gray-800 p-3 mb-2 rounded">
// //                 {r.error ? <p className="text-red-400">{r.error}</p> : (
// //                   <>
// //                     <p><strong>Input:</strong> {r.input}</p>
// //                     <p><strong>Expected:</strong> {r.expected}</p>
// //                     <p><strong>Output:</strong> {r.output}</p>
// //                     <p className={r.passed ? "text-green-400" : "text-red-400"}>{r.passed ? "✓ Passed" : "✗ Failed"}</p>
// //                   </>
// //                 )}
// //               </div>
// //             ))}
// //             {submitResult && (
// //               <div className="text-center mt-4">
// //                 <h2 className="text-2xl text-green-400">🎉 {submitResult.status?.toUpperCase()}</h2>
// //                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
// //                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
// //                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ProblemPage;

// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Editor from "@monaco-editor/react";
// import axiosClient from "../utils/axiosClient";
// import SubmissionHistory from "../components/SubmissionHistory";
// import Editorial from "../components/Editorial";
// import ChatAi from "../components/ChatAi";

// const langMap = {
//   cpp: "C++",
//   java: "Java",
//   javascript: "JavaScript"
// };

// function ProblemPage() {
//   const { problemid } = useParams();
//   const navigate = useNavigate();
//   const editorRef = useRef(null);

//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
//   const [loading, setLoading] = useState(true);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeTab, setActiveTab] = useState("description");
//   const [showModal, setShowModal] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [allProblems, setAllProblems] = useState([]);
//   const [showProblemList, setShowProblemList] = useState(false);
//   const [loadingModalText, setLoadingModalText] = useState("");

//   useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
//         setProblem(data);
//         const starter = data.startcode.find(sc =>
//           selectedLanguage === "cpp"
//             ? ["cpp", "c++"].includes(sc.language)
//             : sc.language === selectedLanguage
//         );
//         setCode(starter?.initialcode || "// No starter code found");
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblem();
//   }, [problemid]);

//   useEffect(() => {
//     if (problem) {
//       const starter = problem.startcode.find(sc =>
//         selectedLanguage === "cpp"
//           ? ["cpp", "c++"].includes(sc.language)
//           : sc.language === selectedLanguage
//       );
//       setCode(starter?.initialcode || "// No starter code for this language");
//     }
//   }, [selectedLanguage]);

//   const handleRun = async () => {
//     setShowModal(true);
//     setLoadingModalText("💻 Running your code...");
//     setRunResult(null);
//     setSubmitResult(null);
//     try {
//       const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
//         code,
//         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
//       });
//       const results = data.map((res, i) => ({
//         input: problem.visibletestcases[i]?.input,
//         expected: problem.visibletestcases[i]?.output,
//         output: res.stdout || res.stderr || res.compile_output || "No output",
//         passed: res.status.id === 3
//       }));
//       setRunResult(results);
//     } catch {
//       setRunResult([{ error: "❌ Run failed. Please try again." }]);
//     } finally {
//       setLoadingModalText("");
//     }
//   };

//   const handleSubmit = async () => {
//     setShowModal(true);
//     setLoadingModalText("🚀 Submitting your solution...");
//     setRunResult(null);
//     setSubmitResult(null);
//     try {
//       const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
//         code,
//         language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
//       });
//       setSubmitResult(data);
//     } catch {
//       setSubmitResult({ status: "error", message: "Submission failed." });
//     } finally {
//       setLoadingModalText("");
//     }
//   };

//   const handleResetCode = () => {
//     setCode(""); // clear editor on reset
//   };

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(code);
//     alert("✅ Code copied to clipboard!");
//   };

//   const handleFormatCode = () => {
//     if (editorRef.current) {
//       editorRef.current.getAction("editor.action.formatDocument").run();
//     }
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//     if (!isFullScreen) document.documentElement.requestFullscreen();
//     else document.exitFullscreen();
//   };

//   const fetchAllProblems = async () => {
//     if (allProblems.length > 0) {
//       setShowProblemList(!showProblemList);
//       return;
//     }
//     try {
//       const res = await axiosClient.get("/problem/allproblems");
//       setAllProblems(res.data);
//       setShowProblemList(true);
//     } catch (err) {
//       alert("❌ Failed to load problems");
//     }
//   };

//   if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

//   return (
//     <div className={`min-h-screen flex flex-col md:flex-row bg-[#0f2027] text-white font-mono ${isFullScreen ? "fixed inset-0 z-50" : ""}`}>
//       <style>{`
//         .tab-active { border-bottom: 2px solid cyan; }
//         .fade-in { animation: fadeIn 0.3s ease-in-out; }
//         @keyframes fadeIn { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
//       `}</style>

//       {/* Left Panel */}
//       <div className="w-full md:w-1/2 p-4 space-y-3 overflow-y-auto relative">
//         <div className="flex justify-between items-center">
//           <div onClick={() => navigate("/")} className="text-3xl font-bold cursor-pointer">🧠 CoderWorld</div>
//           <div onClick={fetchAllProblems} className="cursor-pointer text-cyan-300 text-sm">📘 Problems</div>
//         </div>

//         {showProblemList && (
//           <div className="bg-gray-900 border border-gray-700 p-3 rounded max-h-60 overflow-y-auto">
//             <h3 className="text-lg font-semibold mb-2">All Problems</h3>
//             <ul className="space-y-1">
//               {allProblems.map(p => (
//                 <li key={p._id} onClick={() => navigate(`/problem/${p._id}`)} className="text-cyan-300 cursor-pointer hover:underline">➤ {p.title}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="flex space-x-6 border-b border-gray-600 text-gray-300 mt-2">
//           {["description", "editorial", "submissions", "chatAi"].map(tab => (
//             <div key={tab} onClick={() => setActiveTab(tab)} className={`py-2 cursor-pointer ${activeTab === tab ? "tab-active text-cyan-400" : ""}`}>{tab.toUpperCase()}</div>
//           ))}
//         </div>

//         <div className="fade-in">
//           {activeTab === "description" && (
//             <>
//               <h2 className="text-xl font-bold mt-3">{problem?.title}</h2>
//               <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem?.description }} />
//               <div className="mt-4 space-y-2">
//                 {problem?.visibletestcases.map((ex, i) => (
//                   <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700">
//                     <p><strong>Input:</strong> {ex.input}</p>
//                     <p><strong>Output:</strong> {ex.output}</p>
//                     {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//           {activeTab === "editorial" && <Editorial secureUrl={problem?.secureUrl} />}
//           {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
//           {activeTab === "chatAi" && <ChatAi problem={problem} />}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-full md:w-1/2 p-4 flex flex-col gap-3">
//         <div className="flex flex-wrap justify-between items-center gap-2">
//           <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="bg-gray-800 border border-gray-600 p-2 rounded text-white">
//             {Object.entries(langMap).map(([k, v]) => (
//               <option key={k} value={k}>{v}</option>
//             ))}
//           </select>

//           <div className="flex flex-wrap gap-2">
//             <button onClick={handleRun} className="btn btn-info btn-sm">Run</button>
//             <button onClick={handleSubmit} className="btn btn-success btn-sm">Submit</button>
//             <button onClick={handleCopyCode} className="btn btn-primary btn-sm">Copy</button>
//             <button onClick={handleResetCode} className="btn btn-warning btn-sm">Reset</button>
//             <button onClick={handleFormatCode} className="btn btn-secondary btn-sm">Format</button>
//             <button onClick={toggleFullScreen} className="btn btn-outline btn-sm">{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
//           </div>
//         </div>

//         <div className="flex-grow border border-gray-700 rounded overflow-hidden">
//           <Editor
//             language={selectedLanguage}
//             value={code}
//             onChange={(v) => setCode(v || "")}
//             theme="vs-dark"
//             onMount={(editor) => (editorRef.current = editor)}
//             options={{ minimap: { enabled: false }, fontSize: 14 }}
//           />
//         </div>
//       </div>

//       {/* Floating Result Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-[90%] max-w-2xl fade-in">
//             <div className="flex justify-between mb-3">
//               <h2 className="text-xl font-bold">Result</h2>
//               <button onClick={() => setShowModal(false)} className="btn btn-error btn-sm">Close</button>
//             </div>
//             {loadingModalText && <div className="text-center text-cyan-400 mb-3">{loadingModalText}</div>}
//             {runResult && runResult.map((r, i) => (
//               <div key={i} className="bg-gray-800 p-3 rounded mb-2">
//                 {r.error ? <p className="text-red-400">{r.error}</p> : (
//                   <>
//                     <p><strong>Input:</strong> {r.input}</p>
//                     <p><strong>Expected:</strong> {r.expected}</p>
//                     <p><strong>Output:</strong> {r.output}</p>
//                     <p className={r.passed ? "text-green-400" : "text-red-400"}>
//                       {r.passed ? "✅ Passed" : "❌ Failed"}
//                     </p>
//                   </>
//                 )}
//               </div>
//             ))}
//             {submitResult && (
//               <div className="text-center mt-4">
//                 <h2 className="text-2xl text-green-400">🎉 {submitResult.status?.toUpperCase()}</h2>
//                 {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
//                 {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
//                 {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProblemPage;
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import Editorial from "../components/Editorial";
import ChatAi from "../components/ChatAi";

const langMap = {
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript"
};

function ProblemPage() {
  const { problemid } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [loading, setLoading] = useState(true);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [allProblems, setAllProblems] = useState([]);
  const [showProblemList, setShowProblemList] = useState(false);
  const [loadingModalText, setLoadingModalText] = useState("");

  // Fetch problem on load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/problem/problembyid/${problemid}`);
        setProblem(data);
        const starter = data.startcode.find(sc =>
          selectedLanguage === "cpp"
            ? ["cpp", "c++"].includes(sc.language)
            : sc.language === selectedLanguage
        );
        setCode(starter?.initialcode || "// No starter code available");
      } catch (err) {
        console.error("Error loading problem:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [problemid]);

  // Reset code on language change
  useEffect(() => {
    if (problem) {
      const starter = problem.startcode.find(sc =>
        selectedLanguage === "cpp"
          ? ["cpp", "c++"].includes(sc.language)
          : sc.language === selectedLanguage
      );
      setCode(starter?.initialcode || "// No starter code for this language.");
    }
  }, [selectedLanguage]);

  const handleRun = async () => {
    // Validate code before running
    if (!code.trim()) {
      setRunResult([{ error: "❌ Please write some code before running!" }]);
      setShowModal(true);
      return;
    }

    setShowModal(true);
    setLoadingModalText("💻 Running your code...");
    setRunResult(null);
    setSubmitResult(null);
    
    try {
      const { data } = await axiosClient.post(`/submission/run/${problemid}`, {
        code,
        language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
      });
      
      if (data && Array.isArray(data)) {
      const results = data.map((res, i) => ({
        input: problem.visibletestcases[i]?.input || "",
        expected: problem.visibletestcases[i]?.output || "",
        output: res.stdout || res.stderr || res.compile_output || "No output",
          passed: res.status?.id === 3,
          status: res.status?.description || "Unknown"
      }));
      setRunResult(results);
        setLoadingModalText("✅ Code executed successfully!");
      } else {
        setRunResult([{ error: "❌ Invalid response from server. Please try again." }]);
      }
    } catch (error) {
      console.error('Run error:', error);
      let errorMessage = "❌ Run failed. Please try again.";
      
      if (error.response?.status === 400) {
        errorMessage = "❌ Invalid code or missing parameters.";
      } else if (error.response?.status === 401) {
        errorMessage = "❌ Please login to run code.";
      } else if (error.response?.status === 500) {
        errorMessage = "❌ Server error. Please try again later.";
      }
      
      setRunResult([{ error: errorMessage }]);
    } finally {
      setTimeout(() => setLoadingModalText(""), 2000);
    }
  };

  const handleSubmit = async () => {
    // Validate code before submitting
    if (!code.trim()) {
      setSubmitResult({ status: "error", message: "❌ Please write some code before submitting!" });
    setShowModal(true);
      return;
    }

    setShowModal(true);
    setLoadingModalText("🚀 Submitting your solution...");
    setRunResult(null);
    setSubmitResult(null);
    
    try {
      const { data } = await axiosClient.post(`/submission/submit/${problemid}`, {
        code,
        language: selectedLanguage === "cpp" ? "c++" : selectedLanguage
      });
      
      if (data) {
        // Format the response for better display
        const formattedResult = {
          status: data.status || "unknown",
          testCasesPassed: data.testCasesPassed || 0,
          testCasesTotal: data.testCasesTotal || 0,
          runtime: data.runtime || 0,
          memory: data.memory || 0,
          errorMessage: data.errorMessage || null,
          message: getSubmissionMessage(data.status, data.testCasesPassed, data.testCasesTotal)
        };
        setSubmitResult(formattedResult);
        setLoadingModalText("✅ Submission completed!");
      } else {
        setSubmitResult({ status: "error", message: "❌ Invalid response from server." });
      }
    } catch (error) {
      console.error('Submit error:', error);
      let errorMessage = "❌ Submission failed. Please try again.";
      
      if (error.response?.status === 400) {
        errorMessage = "❌ Invalid code or missing parameters.";
      } else if (error.response?.status === 401) {
        errorMessage = "❌ Please login to submit code.";
      } else if (error.response?.status === 500) {
        errorMessage = "❌ Server error. Please try again later.";
      }
      
      setSubmitResult({ status: "error", message: errorMessage });
    } finally {
      setTimeout(() => setLoadingModalText(""), 2000);
    }
  };

  // Helper function to generate user-friendly submission messages
  const getSubmissionMessage = (status, passed, total) => {
    switch (status) {
      case 'accepted':
        return `🎉 Congratulations! All ${total} test cases passed!`;
      case 'wrong answer':
        return `❌ Wrong Answer. ${passed}/${total} test cases passed.`;
      case 'error':
        return `❌ Runtime Error. ${passed}/${total} test cases passed.`;
      case 'time limit exceeded':
        return `⏰ Time Limit Exceeded. ${passed}/${total} test cases passed.`;
      case 'memory limit exceeded':
        return `💾 Memory Limit Exceeded. ${passed}/${total} test cases passed.`;
      default:
        return `❓ Unknown status. ${passed}/${total} test cases passed.`;
    }
  };

  const handleResetCode = () => {
    setCode("");
  };

  const handleFormatCode = () => {
    const formatted = code.split("\n").map(line => line.trimLeft()).join("\n");
    setCode(formatted);
    alert("Formatted successfully!");
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  const fetchAllProblems = async () => {
    if (allProblems.length > 0) {
      setShowProblemList(!showProblemList);
      return;
    }
    try {
      const res = await axiosClient.get("/problem/getallproblem");
      setAllProblems(res.data);
      setShowProblemList(true);
    } catch (err) {
      alert("Failed to load problem list.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono ${isFullScreen ? "fixed inset-0 z-50" : ""}`}>
      <style>{`
        .tab-active { border-bottom: 2px solid cyan; }
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
      `}</style>

      {/* Left Panel */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto space-y-4 relative">
        <div className="flex justify-between items-center mb-2">
          <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>🧠 CoderWorld</div>
          <div className="cursor-pointer text-sm text-cyan-400 hover:underline" onClick={fetchAllProblems}>📘 Problems</div>
        </div>

        {showProblemList && (
          <div className="bg-gray-900 border border-gray-700 p-3 rounded mb-4 max-h-52 overflow-y-auto">
            <h3 className="text-lg mb-2 font-semibold">All Problems</h3>
            <ul className="space-y-2">
              {allProblems.map((p) => (
                <li
                  key={p._id}
                  className="hover:underline text-cyan-300 cursor-pointer"
                  onClick={() => navigate(`/problem/${p._id}`)}
                >
                  ➤ {p.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-6 border-b border-gray-600 text-gray-300">
          {["description", "editorial", "submissions", "chatAi"].map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 cursor-pointer transition ${activeTab === tab ? "tab-active text-cyan-400" : ""}`}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="fade-in">
          {activeTab === "description" && (
            <>
              <h2 className="text-xl font-bold">{problem?.title}</h2>
              <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: problem?.description }} />
              <div className="mt-4 space-y-2">
                {(problem?.visibletestcases || []).map((ex, i) => (
                  <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700">
                    <p><strong>Input:</strong> {ex.input}</p>
                    <p><strong>Output:</strong> {ex.output}</p>
                    {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab === "editorial" && <Editorial secureUrl={problem?.secureUrl} />}
          {activeTab === "submissions" && <SubmissionHistory problemid={problemid} />}
          {activeTab === "chatAi" && <ChatAi problem={problem} />}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 p-4 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white p-2 rounded"
          >
            {Object.entries(langMap).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            <button onClick={handleRun} className="btn btn-info btn-sm">Run</button>
            <button onClick={handleSubmit} className="btn btn-success btn-sm">Submit</button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                alert("Code copied to clipboard!");
              }}
              className="btn btn-primary btn-sm"
            >Copy</button>
            <button onClick={handleResetCode} className="btn btn-warning btn-sm">Reset</button>
            <button onClick={handleFormatCode} className="btn btn-secondary btn-sm">Format</button>
            <button onClick={toggleFullScreen} className="btn btn-outline btn-sm">{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
          </div>
        </div>

        <div className="flex-grow border border-gray-700 rounded overflow-hidden">
          <Editor
            language={selectedLanguage}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            onMount={(editor) => (editorRef.current = editor)}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-xl w-full border border-gray-700 fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">🎯 Result</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-error btn-sm">Close</button>
            </div>
            {loadingModalText && <div className="text-center text-cyan-300 mb-4">{loadingModalText}</div>}
            {runResult && runResult.map((r, i) => (
              <div key={i} className="bg-gray-800 p-3 mb-2 rounded">
                {r.error ? <p className="text-red-400">{r.error}</p> : (
                  <>
                    <p><strong>Input:</strong> {r.input}</p>
                    <p><strong>Expected:</strong> {r.expected}</p>
                    <p><strong>Output:</strong> {r.output}</p>
                    <p className={r.passed ? "text-green-400" : "text-red-400"}>
                      {r.passed ? "✓ Passed" : "✗ Failed"}
                    </p>
                  </>
                )}
              </div>
            ))}
            {submitResult && (
              <div className="text-center mt-4">
                <h2 className="text-2xl text-green-400">🎉 {submitResult.status?.toUpperCase()}</h2>
                {submitResult.runtime && <p>Runtime: {submitResult.runtime} ms</p>}
                {submitResult.memory && <p>Memory: {submitResult.memory} KB</p>}
                {submitResult.message && <p className="text-red-400">{submitResult.message}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemPage;
