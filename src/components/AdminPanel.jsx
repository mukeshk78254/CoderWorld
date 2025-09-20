// // // import { useForm, useFieldArray } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';
// // // import { z } from 'zod';
// // // import axiosClient from '../utils/axiosClient';
// // // import { useNavigate } from 'react-router';

// // // // Zod schema matching the problem schema
// // // const problemSchema = z.object({
// // //   title: z.string().min(1, 'Title is required'),
// // //   description: z.string().min(1, 'Description is required'),
// // //   difficulty: z.enum(['easy', 'medium', 'hard']),
// // //   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
// // //   visibleTestCases: z.array(
// // //     z.object({
// // //       input: z.string().min(1, 'Input is required'),
// // //       output: z.string().min(1, 'Output is required'),
// // //       explanation: z.string().min(1, 'Explanation is required')
// // //     })
// // //   ).min(1, 'At least one visible test case required'),
// // //   hiddenTestCases: z.array(
// // //     z.object({
// // //       input: z.string().min(1, 'Input is required'),
// // //       output: z.string().min(1, 'Output is required')
// // //     })
// // //   ).min(1, 'At least one hidden test case required'),
// // //   startCode: z.array(
// // //     z.object({
// // //       language: z.enum(['C++', 'Java', 'JavaScript']),
// // //       initialCode: z.string().min(1, 'Initial code is required')
// // //     })
// // //   ).length(3, 'All three languages required'),
// // //   referenceSolution: z.array(
// // //     z.object({
// // //       language: z.enum(['C++', 'Java', 'JavaScript']),
// // //       completeCode: z.string().min(1, 'Complete code is required')
// // //     })
// // //   ).length(3, 'All three languages required')
// // // });

// // // function AdminPanel() {
// // //   const navigate = useNavigate();
// // //   const {
// // //     register,
// // //     control,
// // //     handleSubmit,
// // //     formState: { errors }
// // //   } = useForm({
// // //     resolver: zodResolver(problemSchema),
// // //     defaultValues: {
// // //       startCode: [
// // //         { language: 'C++', initialCode: '' },
// // //         { language: 'Java', initialCode: '' },
// // //         { language: 'JavaScript', initialCode: '' }
// // //       ],
// // //       referenceSolution: [
// // //         { language: 'C++', completeCode: '' },
// // //         { language: 'Java', completeCode: '' },
// // //         { language: 'JavaScript', completeCode: '' }
// // //       ]
// // //     }
// // //   });

// // //   const {
// // //     fields: visibleFields,
// // //     append: appendVisible,
// // //     remove: removeVisible
// // //   } = useFieldArray({
// // //     control,
// // //     name: 'visibleTestCases'
// // //   });

// // //   const {
// // //     fields: hiddenFields,
// // //     append: appendHidden,
// // //     remove: removeHidden
// // //   } = useFieldArray({
// // //     control,
// // //     name: 'hiddenTestCases'
// // //   });

// // //   const onSubmit = async (data) => {
// // //     try {
// // //       await axiosClient.post('/problem/create', data);
// // //       alert('Problem created successfully!');
// // //       navigate('/');
// // //     } catch (error) {
// // //       alert(`Error: ${error.response?.data?.message || error.message}`);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-6">
// // //       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
// // //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// // //         {/* Basic Information */}
// // //         <div className="card bg-base-100 shadow-lg p-6">
// // //           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
// // //           <div className="space-y-4">
// // //             <div className="form-control">
// // //               <label className="label">
// // //                 <span className="label-text">Title</span>
// // //               </label>
// // //               <input
// // //                 {...register('title')}
// // //                 className={`input input-bordered ${errors.title && 'input-error'}`}
// // //               />
// // //               {errors.title && (
// // //                 <span className="text-error">{errors.title.message}</span>
// // //               )}
// // //             </div>

// // //             <div className="form-control">
// // //               <label className="label">
// // //                 <span className="label-text">Description</span>
// // //               </label>
// // //               <textarea
// // //                 {...register('description')}
// // //                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
// // //               />
// // //               {errors.description && (
// // //                 <span className="text-error">{errors.description.message}</span>
// // //               )}
// // //             </div>

// // //             <div className="flex gap-4">
// // //               <div className="form-control w-1/2">
// // //                 <label className="label">
// // //                   <span className="label-text">Difficulty</span>
// // //                 </label>
// // //                 <select
// // //                   {...register('difficulty')}
// // //                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
// // //                 >
// // //                   <option value="easy">Easy</option>
// // //                   <option value="medium">Medium</option>
// // //                   <option value="hard">Hard</option>
// // //                 </select>
// // //               </div>

// // //               <div className="form-control w-1/2">
// // //                 <label className="label">
// // //                   <span className="label-text">Tag</span>
// // //                 </label>
// // //                 <select
// // //                   {...register('tags')}
// // //                   className={`select select-bordered ${errors.tags && 'select-error'}`}
// // //                 >
// // //                   <option value="array">Array</option>
// // //                   <option value="linkedList">Linked List</option>
// // //                   <option value="graph">Graph</option>
// // //                   <option value="dp">DP</option>
// // //                 </select>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Test Cases */}
// // //         <div className="card bg-base-100 shadow-lg p-6">
// // //           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
// // //           {/* Visible Test Cases */}
// // //           <div className="space-y-4 mb-6">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="font-medium">Visible Test Cases</h3>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
// // //                 className="btn btn-sm btn-primary"
// // //               >
// // //                 Add Visible Case
// // //               </button>
// // //             </div>
            
// // //             {visibleFields.map((field, index) => (
// // //               <div key={field.id} className="border p-4 rounded-lg space-y-2">
// // //                 <div className="flex justify-end">
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => removeVisible(index)}
// // //                     className="btn btn-xs btn-error"
// // //                   >
// // //                     Remove
// // //                   </button>
// // //                 </div>
                
// // //                 <input
// // //                   {...register(`visibleTestCases.${index}.input`)}
// // //                   placeholder="Input"
// // //                   className="input input-bordered w-full"
// // //                 />
                
// // //                 <input
// // //                   {...register(`visibleTestCases.${index}.output`)}
// // //                   placeholder="Output"
// // //                   className="input input-bordered w-full"
// // //                 />
                
// // //                 <textarea
// // //                   {...register(`visibleTestCases.${index}.explanation`)}
// // //                   placeholder="Explanation"
// // //                   className="textarea textarea-bordered w-full"
// // //                 />
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Hidden Test Cases */}
// // //           <div className="space-y-4">
// // //             <div className="flex justify-between items-center">
// // //               <h3 className="font-medium">Hidden Test Cases</h3>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => appendHidden({ input: '', output: '' })}
// // //                 className="btn btn-sm btn-primary"
// // //               >
// // //                 Add Hidden Case
// // //               </button>
// // //             </div>
            
// // //             {hiddenFields.map((field, index) => (
// // //               <div key={field.id} className="border p-4 rounded-lg space-y-2">
// // //                 <div className="flex justify-end">
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => removeHidden(index)}
// // //                     className="btn btn-xs btn-error"
// // //                   >
// // //                     Remove
// // //                   </button>
// // //                 </div>
                
// // //                 <input
// // //                   {...register(`hiddenTestCases.${index}.input`)}
// // //                   placeholder="Input"
// // //                   className="input input-bordered w-full"
// // //                 />
                
// // //                 <input
// // //                   {...register(`hiddenTestCases.${index}.output`)}
// // //                   placeholder="Output"
// // //                   className="input input-bordered w-full"
// // //                 />
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Code Templates */}
// // //         <div className="card bg-base-100 shadow-lg p-6">
// // //           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
// // //           <div className="space-y-6">
// // //             {[0, 1, 2].map((index) => (
// // //               <div key={index} className="space-y-2">
// // //                 <h3 className="font-medium">
// // //                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
// // //                 </h3>
                
// // //                 <div className="form-control">
// // //                   <label className="label">
// // //                     <span className="label-text">Initial Code</span>
// // //                   </label>
// // //                   <pre className="bg-base-300 p-4 rounded-lg">
// // //                     <textarea
// // //                       {...register(`startCode.${index}.initialCode`)}
// // //                       className="w-full bg-transparent font-mono"
// // //                       rows={6}
// // //                     />
// // //                   </pre>
// // //                 </div>
                
// // //                 <div className="form-control">
// // //                   <label className="label">
// // //                     <span className="label-text">Reference Solution</span>
// // //                   </label>
// // //                   <pre className="bg-base-300 p-4 rounded-lg">
// // //                     <textarea
// // //                       {...register(`referenceSolution.${index}.completeCode`)}
// // //                       className="w-full bg-transparent font-mono"
// // //                       rows={6}
// // //                     />
// // //                   </pre>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <button type="submit" className="btn btn-primary w-full">
// // //           Create Problem
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default AdminPanel;

// // import { useForm, useFieldArray } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import axiosClient from '../utils/axiosClient';
// // import { useNavigate } from 'react-router';

// // // Zod schema corrected to match the Mongoose schema exactly
// // const problemSchema = z.object({
// //   title: z.string().min(1, 'Title is required'),
// //   description: z.string().min(1, 'Description is required'),
// //   difficulty: z.enum(['easy', 'medium', 'hard']),
// //   // FIX: Enum values updated to match schema ('linked list', 'string')
// //   tags: z.enum(['array', 'linked list', 'dp', 'string']), 
// //   // FIX: Renamed to all lowercase to match schema
// //   visibletestcases: z.array(
// //     z.object({
// //       input: z.string().min(1, 'Input is required'),
// //       output: z.string().min(1, 'Output is required'),
// //       explanation: z.string().min(1, 'Explanation is required')
// //     })
// //   ).min(1, 'At least one visible test case required'),
// //   // FIX: Renamed to all lowercase
// //   hiddentestcases: z.array(
// //     z.object({
// //       input: z.string().min(1, 'Input is required'),
// //       output: z.string().min(1, 'Output is required')
// //     })
// //   ).min(1, 'At least one hidden test case required'),
// //   // FIX: Renamed to all lowercase
// //   startcode: z.array(
// //     z.object({
// //       // FIX: Language enum updated to backend values
// //       language: z.enum(['c++', 'java', 'javascript']), 
// //       // FIX: Renamed to all lowercase
// //       initialcode: z.string().min(1, 'Initial code is required')
// //     })
// //   ).length(3, 'All three languages required'),
// //   // FIX: Renamed to all lowercase
// //   refsolution: z.array(
// //     z.object({
// //       // FIX: Language enum updated to backend values
// //       language: z.enum(['c++', 'java', 'javascript']),
// //       // FIX: Renamed to all lowercase
// //       completecode: z.string().min(1, 'Complete code is required')
// //     })
// //   ).length(3, 'All three languages required')
// // });

// // function AdminPanel() {
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     control,
// //     handleSubmit,
// //     formState: { errors }
// //   } = useForm({
// //     resolver: zodResolver(problemSchema),
// //     // FIX: Default values updated to match the corrected schema structure
// //     defaultValues: {
// //       startcode: [
// //         { language: 'c++', initialcode: '' },
// //         { language: 'java', initialcode: '' },
// //         { language: 'javascript', initialcode: '' }
// //       ],
// //       refsolution: [
// //         { language: 'c++', completecode: '' },
// //         { language: 'java', completecode: '' },
// //         { language: 'javascript', completecode: '' }
// //       ]
// //     }
// //   });

// //   const {
// //     fields: visibleFields,
// //     append: appendVisible,
// //     remove: removeVisible
// //   } = useFieldArray({
// //     control,
// //     // FIX: Name updated to match schema
// //     name: 'visibletestcases'
// //   });

// //   const {
// //     fields: hiddenFields,
// //     append: appendHidden,
// //     remove: removeHidden
// //   } = useFieldArray({
// //     control,
// //     // FIX: Name updated to match schema
// //     name: 'hiddentestcases'
// //   });

// //   const onSubmit = async (data) => {
// //     try {
// //       // The 'data' object now perfectly matches the backend schema
// //       await axiosClient.post('/problem/create', data);
// //       alert('Problem created successfully!');
// //       navigate('/');
// //     } catch (error) {
// //       alert(`Error: ${error.response?.data?.message || error.message}`);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //         {/* Basic Information */}
// //         <div className="card bg-base-100 shadow-lg p-6">
// //           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
// //           <div className="space-y-4">
// //             <div className="form-control">
// //               <label className="label">
// //                 <span className="label-text">Title</span>
// //               </label>
// //               <input
// //                 {...register('title')}
// //                 className={`input input-bordered ${errors.title && 'input-error'}`}
// //               />
// //               {errors.title && (
// //                 <span className="text-error">{errors.title.message}</span>
// //               )}
// //             </div>

// //             <div className="form-control">
// //               <label className="label">
// //                 <span className="label-text">Description</span>
// //               </label>
// //               <textarea
// //                 {...register('description')}
// //                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
// //               />
// //               {errors.description && (
// //                 <span className="text-error">{errors.description.message}</span>
// //               )}
// //             </div>

// //             <div className="flex gap-4">
// //               <div className="form-control w-1/2">
// //                 <label className="label">
// //                   <span className="label-text">Difficulty</span>
// //                 </label>
// //                 <select
// //                   {...register('difficulty')}
// //                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
// //                 >
// //                   <option value="easy">Easy</option>
// //                   <option value="medium">Medium</option>
// //                   <option value="hard">Hard</option>
// //                 </select>
// //               </div>

// //               <div className="form-control w-1/2">
// //                 <label className="label">
// //                   <span className="label-text">Tag</span>
// //                 </label>
// //                 <select
// //                   {...register('tags')}
// //                   className={`select select-bordered ${errors.tags && 'select-error'}`}
// //                 >
// //                   {/* FIX: Option values updated to match schema */}
// //                   <option value="array">Array</option>
// //                   <option value="linked list">Linked List</option>
// //                   <option value="string">String</option>
// //                   <option value="dp">DP</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Test Cases */}
// //         <div className="card bg-base-100 shadow-lg p-6">
// //           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
// //           <div className="space-y-4 mb-6">
// //             <div className="flex justify-between items-center">
// //               <h3 className="font-medium">Visible Test Cases</h3>
// //               <button
// //                 type="button"
// //                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
// //                 className="btn btn-sm btn-primary"
// //               >
// //                 Add Visible Case
// //               </button>
// //             </div>
            
// //             {visibleFields.map((field, index) => (
// //               <div key={field.id} className="border p-4 rounded-lg space-y-2">
// //                 <div className="flex justify-end">
// //                   <button type="button" onClick={() => removeVisible(index)} className="btn btn-xs btn-error">Remove</button>
// //                 </div>
// //                 {/* FIX: Register calls updated to lowercase */}
// //                 <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full"/>
// //                 <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full"/>
// //                 <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full"/>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <h3 className="font-medium">Hidden Test Cases</h3>
// //               <button
// //                 type="button"
// //                 onClick={() => appendHidden({ input: '', output: '' })}
// //                 className="btn btn-sm btn-primary"
// //               >
// //                 Add Hidden Case
// //               </button>
// //             </div>
            
// //             {hiddenFields.map((field, index) => (
// //               <div key={field.id} className="border p-4 rounded-lg space-y-2">
// //                 <div className="flex justify-end">
// //                   <button type="button" onClick={() => removeHidden(index)} className="btn btn-xs btn-error">Remove</button>
// //                 </div>
// //                 {/* FIX: Register calls updated to lowercase */}
// //                 <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full"/>
// //                 <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full"/>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Code Templates */}
// //         <div className="card bg-base-100 shadow-lg p-6">
// //           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
// //           <div className="space-y-6">
// //             {[0, 1, 2].map((index) => (
// //               <div key={index} className="space-y-2">
// //                 <h3 className="font-medium">
// //                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
// //                 </h3>
                
// //                 <div className="form-control">
// //                   <label className="label"><span className="label-text">Initial Code</span></label>
// //                   <pre className="bg-base-300 p-4 rounded-lg">
// //                     {/* FIX: Register calls updated to lowercase */}
// //                     <textarea {...register(`startcode.${index}.initialcode`)} className="w-full bg-transparent font-mono" rows={6}/>
// //                   </pre>
// //                 </div>
                
// //                 <div className="form-control">
// //                   <label className="label"><span className="label-text">Reference Solution</span></label>
// //                   <pre className="bg-base-300 p-4 rounded-lg">
// //                     {/* FIX: Register calls updated to lowercase */}
// //                     <textarea {...register(`refsolution.${index}.completecode`)} className="w-full bg-transparent font-mono" rows={6}/>
// //                   </pre>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <button type="submit" className="btn btn-primary w-full">
// //           Create Problem
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AdminPanel;


// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router';

// // Zod schema corrected to match the Mongoose schema exactly
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   // FIX: Enum values updated to match schema
//   tags: z.enum(['array', 'linked list', 'dp', 'string']), 
//   // FIX: Renamed to all lowercase to match schema
//   visibletestcases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required')
//     })
//   ).min(1, 'At least one visible test case required'),
//   // FIX: Renamed to all lowercase
//   hiddentestcases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required')
//     })
//   ).min(1, 'At least one hidden test case required'),
//   // FIX: Renamed to all lowercase
//   startcode: z.array(
//     z.object({
//       // FIX: Language enum updated to backend values
//       language: z.enum(['c++', 'java', 'javascript']), 
//       // FIX: Renamed to all lowercase
//       initialcode: z.string().min(1, 'Initial code is required')
//     })
//   ).length(3, 'All three languages required'),
//   // FIX: Renamed to all lowercase
//   refsolution: z.array(
//     z.object({
//       // FIX: Language enum updated to backend values
//       language: z.enum(['c++', 'java', 'javascript']),
//       // FIX: Renamed to all lowercase
//       completecode: z.string().min(1, 'Complete code is required')
//     })
//   ).length(3, 'All three languages required')
// });

// function AdminPanel() {
//   const navigate = useNavigate();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     // FIX: Default values updated to match the corrected schema structure
//     defaultValues: {
//       visibletestcases: [{ input: '', output: '', explanation: '' }],
//       hiddentestcases: [{ input: '', output: '' }],
//       startcode: [
//         { language: 'c++', initialcode: 'class Solution {\npublic:\n    // Your C++ code here\n};' },
//         { language: 'java', initialcode: 'class Solution {\n    // Your Java code here\n}' },
//         { language: 'javascript', initialcode: '// Your JavaScript code here\nfunction solve() {\n\n}' }
//       ],
//       refsolution: [
//         { language: 'c++', completecode: '' },
//         { language: 'java', completecode: '' },
//         { language: 'javascript', completecode: '' }
//       ]
//     }
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible
//   } = useFieldArray({
//     control,
//     // FIX: Name updated to match schema
//     name: 'visibletestcases'
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden
//   } = useFieldArray({
//     control,
//     // FIX: Name updated to match schema
//     name: 'hiddentestcases'
//   });

//   const onSubmit = async (data) => {
//     try {
//       // The 'data' object now perfectly matches the backend schema
//       await axiosClient.post('/problem/create', data);
//       alert('Problem created successfully!');
//       navigate('/admin');
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-base-200">
//       <h1 className="text-3xl font-bold mb-6 text-base-content">Create New Problem</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error text-sm mt-1">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error text-sm mt-1">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="form-control w-full md:w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-full md:w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   {/* FIX: Option values updated to match schema */}
//                   <option value="array">Array</option>
//                   <option value="linked list">Linked List</option>
//                   <option value="string">String</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-outline btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
            
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-2 relative">
//                 <div className="absolute top-2 right-2">
//                   <button type="button" onClick={() => removeVisible(index)} className="btn btn-xs btn-ghost text-error">Remove</button>
//                 </div>
//                 {/* FIX: Register calls updated to lowercase */}
//                 <textarea {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="textarea textarea-bordered w-full font-mono text-sm"/>
//                 <textarea {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="textarea textarea-bordered w-full font-mono text-sm"/>
//                 <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full text-sm"/>
//               </div>
//             ))}
//              {errors.visibletestcases && (
//                 <span className="text-error text-sm mt-1">{errors.visibletestcases.message}</span>
//               )}
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-outline btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
            
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-2 relative">
//                 <div className="absolute top-2 right-2">
//                   <button type="button" onClick={() => removeHidden(index)} className="btn btn-xs btn-ghost text-error">Remove</button>
//                 </div>
//                 {/* FIX: Register calls updated to lowercase */}
//                 <textarea {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="textarea textarea-bordered w-full font-mono text-sm"/>
//                 <textarea {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="textarea textarea-bordered w-full font-mono text-sm"/>
//               </div>
//             ))}
//              {errors.hiddentestcases && (
//                 <span className="text-error text-sm mt-1">{errors.hiddentestcases.message}</span>
//               )}
//           </div>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates & Solutions</h2>
          
//           <div className="space-y-6">
//             {['c++', 'java', 'javascript'].map((lang, index) => (
//               <div key={index} className="space-y-4 p-4 border border-base-300 rounded-lg">
//                 <h3 className="font-medium text-lg">
//                   {lang === 'c++' ? 'C++' : lang === 'java' ? 'Java' : 'JavaScript'}
//                 </h3>
                
//                 <div className="form-control">
//                   <label className="label"><span className="label-text">Starter Code</span></label>
//                     {/* FIX: Register calls updated to lowercase */}
//                     <textarea {...register(`startcode.${index}.initialcode`)} className="textarea textarea-bordered w-full font-mono text-sm" rows={8}/>
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label"><span className="label-text">Reference Solution</span></label>
//                     {/* FIX: Register calls updated to lowercase */}
//                     <textarea {...register(`refsolution.${index}.completecode`)} className="textarea textarea-bordered w-full font-mono text-sm" rows={8}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary btn-lg w-full">
//           Create Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminPanel;

// src/components/AdminPanel.jsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import { Plus, Minus, Code, FileText, LayoutList } from 'lucide-react'; // Icons

// Zod schema corrected to match the Mongoose schema exactly
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linked list', 'dp', 'string', 'tree', 'graph', 'backtracking', 'greedy']), // Added more common tags
  visibletestcases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddentestcases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startcode: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javascript']), 
      initialcode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  refsolution: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javascript']),
      completecode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      visibletestcases: [{ input: '', output: '', explanation: '' }],
      hiddentestcases: [{ input: '', output: '' }],
      startcode: [
        { language: 'c++', initialcode: 'class Solution {\npublic:\n    // Your C++ code here\n    // Example: int add(int a, int b) { return a + b; }\n};' },
        { language: 'java', initialcode: 'class Solution {\n    // Your Java code here\n    // Example: public int add(int a, int b) { return a + b; }\n}' },
        { language: 'javascript', initialcode: '// Your JavaScript code here\n// Example: function add(a, b) { return a + b; }\n// module.exports = { add }; // For testing frameworks\n' }
      ],
      refsolution: [
        { language: 'c++', completecode: '// Example reference solution for C++\nclass Solution {\npublic:\n    int add(int a, int b) {\n        return a + b;\n    }\n};' },
        { language: 'java', completecode: '// Example reference solution for Java\nclass Solution {\n    public int add(int a, int b) {\n        return a + b;\n    }\n}' },
        { language: 'javascript', completecode: '// Example reference solution for JavaScript\nfunction add(a, b) {\n    return a + b;\n}\nmodule.exports = { add };' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibletestcases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddentestcases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!'); // DaisyUI toast or modal would be better here
      navigate('/admin');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-base-200 min-h-screen text-base-content">
      <h1 className="text-4xl font-extrabold mb-8 text-primary-content flex items-center">
        <Plus className="w-8 h-8 mr-3 text-success" /> Create New Problem
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-xl border border-base-300 p-6 md:p-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6 text-secondary-content flex items-center">
            <LayoutList className="w-6 h-6 mr-3 text-info" /> Basic Information
          </h2>
          <div className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Title</span>
              </label>
              <input
                {...register('title')}
                className={`input input-bordered input-primary transition-all duration-200 ${errors.title && 'input-error'}`}
                placeholder="e.g., Two Sum"
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">{errors.title.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Description</span>
              </label>
              <textarea
                {...register('description')}
                className={`textarea textarea-bordered textarea-primary h-40 transition-all duration-200 ${errors.description && 'textarea-error'}`}
                placeholder="Provide a detailed problem description..."
              />
              {errors.description && (
                <span className="text-error text-sm mt-1">{errors.description.message}</span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-lg font-medium">Difficulty</span>
                </label>
                <select
                  {...register('difficulty')}
                  className={`select select-bordered select-primary transition-all duration-200 ${errors.difficulty && 'select-error'}`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-lg font-medium">Tag</span>
                </label>
                <select
                  {...register('tags')}
                  className={`select select-bordered select-primary transition-all duration-200 ${errors.tags && 'select-error'}`}
                >
                  <option value="array">Array</option>
                  <option value="linked list">Linked List</option>
                  <option value="string">String</option>
                  <option value="dp">DP</option>
                  <option value="tree">Tree</option>
                  <option value="graph">Graph</option>
                  <option value="backtracking">Backtracking</option>
                  <option value="greedy">Greedy</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className="card bg-base-100 shadow-xl border border-base-300 p-6 md:p-8 animate-fade-in-up delay-100">
          <h2 className="text-2xl font-bold mb-6 text-secondary-content flex items-center">
            <FileText className="w-6 h-6 mr-3 text-warning" /> Test Cases
          </h2>
          
          <div className="space-y-6 mb-8 p-4 border border-base-300 rounded-lg">
            <div className="flex justify-between items-center pb-3 border-b border-base-content/10">
              <h3 className="font-semibold text-xl">Visible Test Cases</h3>
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="btn btn-sm btn-outline btn-primary transition-transform duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Visible Case
              </button>
            </div>
            
            {visibleFields.map((field, index) => (
              <div key={field.id} className="border border-base-content/20 bg-base-200 p-4 rounded-lg space-y-3 relative group transition-all duration-200 hover:shadow-md">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button type="button" onClick={() => removeVisible(index)} className="btn btn-xs btn-ghost text-error">
                    <Minus className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
                <label className="label"><span className="label-text font-medium">Input {index + 1}</span></label>
                <textarea {...register(`visibletestcases.${index}.input`)} placeholder="Input for test case" className="textarea textarea-bordered w-full font-mono text-sm transition-all duration-200"/>
                {errors.visibletestcases?.[index]?.input && (
                    <span className="text-error text-xs">{errors.visibletestcases[index].input.message}</span>
                )}

                <label className="label"><span className="label-text font-medium">Output {index + 1}</span></label>
                <textarea {...register(`visibletestcases.${index}.output`)} placeholder="Expected output" className="textarea textarea-bordered w-full font-mono text-sm transition-all duration-200"/>
                {errors.visibletestcases?.[index]?.output && (
                    <span className="text-error text-xs">{errors.visibletestcases[index].output.message}</span>
                )}

                <label className="label"><span className="label-text font-medium">Explanation {index + 1}</span></label>
                <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation for this test case" className="textarea textarea-bordered w-full text-sm transition-all duration-200"/>
                {errors.visibletestcases?.[index]?.explanation && (
                    <span className="text-error text-xs">{errors.visibletestcases[index].explanation.message}</span>
                )}
              </div>
            ))}
             {errors.visibletestcases && !errors.visibletestcases.message && (
                <span className="text-error text-sm mt-1">{errors.visibletestcases.message}</span>
             )}
          </div>

          <div className="space-y-6 p-4 border border-base-300 rounded-lg">
            <div className="flex justify-between items-center pb-3 border-b border-base-content/10">
              <h3 className="font-semibold text-xl">Hidden Test Cases</h3>
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="btn btn-sm btn-outline btn-primary transition-transform duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Hidden Case
              </button>
            </div>
            
            {hiddenFields.map((field, index) => (
              <div key={field.id} className="border border-base-content/20 bg-base-200 p-4 rounded-lg space-y-3 relative group transition-all duration-200 hover:shadow-md">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button type="button" onClick={() => removeHidden(index)} className="btn btn-xs btn-ghost text-error">
                    <Minus className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
                <label className="label"><span className="label-text font-medium">Input {index + 1}</span></label>
                <textarea {...register(`hiddentestcases.${index}.input`)} placeholder="Input for hidden test case" className="textarea textarea-bordered w-full font-mono text-sm transition-all duration-200"/>
                {errors.hiddentestcases?.[index]?.input && (
                    <span className="text-error text-xs">{errors.hiddentestcases[index].input.message}</span>
                )}

                <label className="label"><span className="label-text font-medium">Output {index + 1}</span></label>
                <textarea {...register(`hiddentestcases.${index}.output`)} placeholder="Expected output for hidden test case" className="textarea textarea-bordered w-full font-mono text-sm transition-all duration-200"/>
                {errors.hiddentestcases?.[index]?.output && (
                    <span className="text-error text-xs">{errors.hiddentestcases[index].output.message}</span>
                )}
              </div>
            ))}
            {errors.hiddentestcases && !errors.hiddentestcases.message && (
                <span className="text-error text-sm mt-1">{errors.hiddentestcases.message}</span>
            )}
          </div>
        </div>


        <div className="card bg-base-100 shadow-xl border border-base-300 p-6 md:p-8 animate-fade-in-up delay-200">
          <h2 className="text-2xl font-bold mb-6 text-secondary-content flex items-center">
            <Code className="w-6 h-6 mr-3 text-success" /> Code Templates & Solutions
          </h2>
          
          <div className="space-y-8">
            {['c++', 'java', 'javascript'].map((lang, index) => (
              <div key={index} className="space-y-4 p-5 border border-base-300 rounded-lg bg-base-200 transition-all duration-200 hover:shadow-lg">
                <h3 className="font-semibold text-xl text-accent-content">
                  {lang === 'c++' ? 'C++' : lang === 'java' ? 'Java' : 'JavaScript'}
                </h3>
                
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Starter Code</span></label>
                  <textarea {...register(`startcode.${index}.initialcode`)} className="textarea textarea-bordered w-full font-mono text-sm bg-base-300 min-h-[150px] transition-all duration-200" rows={8} placeholder={`Provide starter code for ${lang}...`}/>
                  {errors.startcode?.[index]?.initialcode && (
                      <span className="text-error text-xs mt-1">{errors.startcode[index].initialcode.message}</span>
                  )}
                </div>
                
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Reference Solution</span></label>
                  <textarea {...register(`refsolution.${index}.completecode`)} className="textarea textarea-bordered w-full font-mono text-sm bg-base-300 min-h-[150px] transition-all duration-200" rows={8} placeholder={`Provide complete reference solution for ${lang}...`}/>
                  {errors.refsolution?.[index]?.completecode && (
                      <span className="text-error text-xs mt-1">{errors.refsolution[index].completecode.message}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/40">
          Create Problem
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;