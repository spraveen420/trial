

// export class Check {

//     mainfunction() {
//         if ('webkitSpeechRecognition' in window) {

//             this.startfunction().then((result) => {
//                 console.log(result);

//                 this.initReqToBot().then((result1) => {
//                     console.log(result1);

//                     this.sendReqToBot().then((result2) => {
//                         console.log(result2);

//                         this.getRespToBot().then((result3) => {
//                             console.log(result3);

//                         }).catch((err) => {
//                             console.log(err);
//                         });

//                     }).catch((err) => {
//                         console.log(err);
//                     });

//                 }).catch((err) => {
//                     console.log(err);
//                 });

//             }).catch((err) => {
//                 console.log(err);
//             });
//         }
//     }

//     startfunction() {
//         return new Promise((resolve, reject) => {
//             const {webkitSpeechRecognition}: IWindow = window as any;
//             // YOUR_CODE
//             if(count > 0) {
//                 resolve('this.text');
//             }
//         });
//     }

//     initReqToBot() {
//         return new Promise((resolve, reject) => {
//             // YOUR_CODE
//             resolve();
//         });
//     }

//     sendReqToBot() {
//         return new Promise((resolve, reject) => {
//             // YOUR_CODE
//             resolve();
//         });
//     }

//     getRespToBot() {
//         return new Promise((resolve, reject) => {
//             // YOUR_CODE
//             resolve();
//         });
//     }
// }
