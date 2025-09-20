// // // import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

// // // const generateCaptcha = () => {
// // //   const numericChars = '0123456789';
// // //   const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// // //   // A selection of visually distinct special characters
// // //   const specialChars = '!@#$%&*?'; 

// // //   const allChars = numericChars + upperCaseChars + specialChars;
// // //   let captchaArray = [];

// // //   // Ensure at least one character from each required type
// // //   captchaArray.push(numericChars[Math.floor(Math.random() * numericChars.length)]);
// // //   captchaArray.push(upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
// // //   captchaArray.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

// // //   // Fill the remaining spots (total 6 characters - 3 guaranteed = 3 more to pick)
// // //   const remainingLength = 6 - captchaArray.length;
// // //   for (let i = 0; i < remainingLength; i++) {
// // //     captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
// // //   }

// // //   // Shuffle the array to randomize the order of characters
// // //   // Fisher-Yates (Knuth) shuffle algorithm
// // //   for (let i = captchaArray.length - 1; i > 0; i--) {
// // //     const j = Math.floor(Math.random() * (i + 1));
// // //     [captchaArray[i], captchaArray[j]] = [captchaArray[j], captchaArray[i]];
// // //   }

// // //   return captchaArray.join('');
// // // };

// // // const Captcha = forwardRef((props, ref) => {
// // //   const [captchaText, setCaptchaText] = useState('');

// // //   useEffect(() => {
// // //     setCaptchaText(generateCaptcha());
// // //   }, []);

// // //   const refreshCaptcha = () => {
// // //     setCaptchaText(generateCaptcha());
// // //   };

// // //   useImperativeHandle(ref, () => ({
// // //     getCaptchaText: () => captchaText,
// // //     refresh: refreshCaptcha,
// // //   }));

// // //   // Apply some dynamic styles for visual complexity
// // //   const dynamicStyle = {
// // //     transform: `rotate(${Math.random() * 6 - 3}deg) skewX(${Math.random() * 4 - 2}deg)`, // Slight random rotation and skew
// // //     textDecoration: 'line-through', // Makes it harder to read automatically
// // //     opacity: 0.9,
// // //     letterSpacing: '0.15em', // Add letter spacing for more challenge
// // //   };

// // //   return (
// // //     <div className="flex items-center space-x-2">
// // //       <div className="captcha-display bg-gray-800 text-white font-mono text-xl px-4 py-2 rounded select-none min-w-[120px] text-center"
// // //            style={dynamicStyle}
// // //       >
// // //         {captchaText}
// // //       </div>
// // //       <button
// // //         type="button"
// // //         className="btn btn-sm btn-outline btn-square text-gray-400 hover:text-white"
// // //         onClick={refreshCaptcha}
// // //         aria-label="Refresh Captcha"
// // //       >
// // //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 00-15.356-2m0 0v5h-.582m2.592-8.5l-.75-1.3A9.957 9.957 0 0112 2c4.329 0 8.358 2.879 9.516 6.892L21 9m-4.592 11.5l.75 1.3A9.957 9.957 0 0012 22c-4.329 0-8.358-2.879-9.516-6.892L3 15" />
// // //         </svg>
// // //       </button>
// // //     </div>
// // //   );
// // // });

// // // export default Captcha;

// // import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

// // const generateCaptcha = () => {
// //   const numericChars = '0123456789';
// //   const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// //   const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'; 
// //   const specialChars = '!@#$%&*?'; // A selection of visually distinct special characters

// //   const allChars = numericChars + upperCaseChars + lowerCaseChars + specialChars;
// //   let captchaArray = [];

// //   // Guarantee at least one character from each set
// //   captchaArray.push(numericChars[Math.floor(Math.random() * numericChars.length)]);
// //   captchaArray.push(upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
// //   captchaArray.push(lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]);
// //   captchaArray.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

// //   // Fill the remaining spots (6 characters total - 4 guaranteed = 2 more to pick)
// //   const remainingLength = 6 - captchaArray.length;
// //   for (let i = 0; i < remainingLength; i++) {
// //     captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
// //   }

// //   // Shuffle the array to randomize the order of characters (Fisher-Yates shuffle)
// //   for (let i = captchaArray.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [captchaArray[i], captchaArray[j]] = [captchaArray[j], captchaArray[i]];
// //   }

// //   return captchaArray.join('');
// // };

// // const Captcha = forwardRef((props, ref) => {
// //   const [captchaText, setCaptchaText] = useState('');

// //   useEffect(() => {
// //     setCaptchaText(generateCaptcha());
// //   }, []);

// //   const refreshCaptcha = () => {
// //     setCaptchaText(generateCaptcha());
// //   };

// //   useImperativeHandle(ref, () => ({
// //     getCaptchaText: () => captchaText,
// //     refresh: refreshCaptcha,
// //   }));

// //   // Apply dynamic styles for visual complexity and to prevent cutting
// //   const dynamicStyle = {
// //     // Increased `min-w` to ensure text fits even with aggressive styling
// //     // Added `lineHeight` to help with vertical alignment and prevent clipping on very tall characters
// //     // Increased rotation and skew slightly for more variability
// //     transform: `rotate(${Math.random() * 8 - 4}deg) skewX(${Math.random() * 6 - 3}deg)`, 
// //     textDecoration: 'line-through', 
// //     opacity: 0.9,
// //     letterSpacing: '0.2em', // Increased spacing for a "larger" feel without a larger font size
// //     lineHeight: '1.2', // Adjust line height for character heights
// //     padding: '0.5rem 1rem', // Increased horizontal padding
// //   };

// //   return (
// //     // Added flex-shrink-0 to prevent the captcha box from shrinking if space is tight
// //     <div className="flex items-center space-x-2 flex-shrink-0"> 
// //       <div className="captcha-display bg-gray-800 text-white font-mono text-xl rounded select-none min-w-[160px] text-center"
// //            style={dynamicStyle}
// //       >
// //         {captchaText}
// //       </div>
// //       <button
// //         type="button"
// //         className="btn btn-sm btn-outline btn-square text-gray-400 hover:text-white"
// //         onClick={refreshCaptcha}
// //         aria-label="Refresh Captcha"
// //       >
// //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 00-15.356-2m0 0v5h-.582m2.592-8.5l-.75-1.3A9.957 9.957 0 0112 2c4.329 0 8.358 2.879 9.516 6.892L21 9m-4.592 11.5l.75 1.3A9.957 9.957 0 0012 22c-4.329 0-8.358-2.879-9.516-6.892L3 15" />
// //         </svg>
// //       </button>
// //     </div>
// //   );
// // });

// // export default Captcha;

// import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

// const generateCaptcha = () => {
//   const numericChars = '0123456789';
//   const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'; 
//   const specialChars = '!@#$%&*?'; // A selection of visually distinct special characters

//   const allChars = numericChars + upperCaseChars + lowerCaseChars + specialChars;
//   let captchaArray = [];

//   // Guarantee at least one character from each set
//   captchaArray.push(numericChars[Math.floor(Math.random() * numericChars.length)]);
//   captchaArray.push(upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
//   captchaArray.push(lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]);
//   captchaArray.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

//   // Fill the remaining spots (6 characters total - 4 guaranteed = 2 more to pick)
//   const remainingLength = 6 - captchaArray.length;
//   for (let i = 0; i < remainingLength; i++) {
//     captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
//   }

//   // Shuffle the array to randomize the order of characters (Fisher-Yates shuffle)
//   for (let i = captchaArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [captchaArray[i], captchaArray[j]] = [captchaArray[j], captchaArray[i]];
//   }

//   return captchaArray.join('');
// };

// const Captcha = forwardRef((props, ref) => {
//   const [captchaText, setCaptchaText] = useState('');

//   useEffect(() => {
//     setCaptchaText(generateCaptcha());
//   }, []);

//   const refreshCaptcha = () => {
//     setCaptchaText(generateCaptcha());
//   };

//   useImperativeHandle(ref, () => ({
//     getCaptchaText: () => captchaText,
//     refresh: refreshCaptcha,
//   }));

//   // Apply dynamic styles for visual complexity and to prevent cutting
//   const dynamicStyle = {
//     // Increased `min-w` to ensure text fits even with aggressive styling
//     // Added `lineHeight` to help with vertical alignment and prevent clipping on very tall characters
//     // Increased rotation and skew slightly for more variability
//     transform: `rotate(${Math.random() * 8 - 4}deg) skewX(${Math.random() * 6 - 3}deg)`, 
//     textDecoration: 'line-through', 
//     opacity: 0.9,
//     letterSpacing: '0.2em', // Increased spacing for a "larger" feel without a larger font size
//     lineHeight: '1.2', // Adjust line height for character heights
//     padding: '0.5rem 1rem', // Increased horizontal padding
//   };

//   return (
//     // Added flex-shrink-0 to prevent the captcha box from shrinking if space is tight
//     <div className="flex items-center space-x-2 flex-shrink-0"> 
//       <div className="captcha-display bg-gray-800 text-white font-mono text-xl rounded select-none min-w-[160px] text-center"
//            style={dynamicStyle}
//       >
//         {captchaText}
//       </div>
//       <button
//         type="button"
//         className="btn btn-sm btn-outline btn-square text-gray-400 hover:text-white"
//         onClick={refreshCaptcha}
//         aria-label="Refresh Captcha"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 00-15.356-2m0 0v5h-.582m2.592-8.5l-.75-1.3A9.957 9.957 0 0112 2c4.329 0 8.358 2.879 9.516 6.892L21 9m-4.592 11.5l.75 1.3A9.957 9.957 0 0012 22c-4.329 0-8.358-2.879-9.516-6.892L3 15" />
//         </svg>
//       </button>
//     </div>
//   );
// });

// export default Captcha;
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const generateCaptcha = () => {
  const numericChars = '0123456789';
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'; 
  const specialChars = '!@#$%&*?'; // A selection of visually distinct special characters

  const allChars = numericChars + upperCaseChars + lowerCaseChars + specialChars;
  let captchaArray = [];

  // Guarantee at least one character from each set
  captchaArray.push(numericChars[Math.floor(Math.random() * numericChars.length)]);
  captchaArray.push(upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
  captchaArray.push(lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]);
  captchaArray.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

  // Fill the remaining spots (6 characters total - 4 guaranteed = 2 more to pick)
  const remainingLength = 6 - captchaArray.length;
  for (let i = 0; i < remainingLength; i++) {
    captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the array to randomize the order of characters (Fisher-Yates shuffle)
  for (let i = captchaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [captchaArray[i], captchaArray[j]] = [captchaArray[j], captchaArray[i]];
  }

  return captchaArray.join('');
};

const Captcha = forwardRef((props, ref) => {
  const [captchaText, setCaptchaText] = useState('');

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };

  useImperativeHandle(ref, () => ({
    getCaptchaText: () => captchaText,
    refresh: refreshCaptcha,
  }));

  // Apply dynamic styles for visual complexity and to prevent cutting
  const dynamicStyle = {
    // Increased `min-w` to ensure text fits even with aggressive styling
    // Added `lineHeight` to help with vertical alignment and prevent clipping on very tall characters
    // Increased rotation and skew slightly for more variability
    transform: `rotate(${Math.random() * 8 - 4}deg) skewX(${Math.random() * 6 - 3}deg)`, 
    textDecoration: 'line-through', 
    opacity: 0.9,
    letterSpacing: '0.2em', // Increased spacing for a "larger" feel without a larger font size
    lineHeight: '1.2', // Adjust line height for character heights
    padding: '0.5rem 1rem', // Increased horizontal padding
  };

  return (
    // Added flex-shrink-0 to prevent the captcha box from shrinking if space is tight
    <div className="flex items-center space-x-2 flex-shrink-0"> 
      <div className="captcha-display bg-gray-800 text-white font-mono text-xl rounded select-none min-w-[160px] text-center"
           style={dynamicStyle}
      >
        {captchaText}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-outline btn-square text-gray-400 hover:text-white"
        onClick={refreshCaptcha}
        aria-label="Refresh Captcha"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 00-15.356-2m0 0v5h-.582m2.592-8.5l-.75-1.3A9.957 9.957 0 0112 2c4.329 0 8.358 2.879 9.516 6.892L21 9m-4.592 11.5l.75 1.3A9.957 9.957 0 0012 22c-4.329 0-8.358-2.879-9.516-6.892L3 15" />
        </svg>
      </button>
    </div>
  );
});

export default Captcha;