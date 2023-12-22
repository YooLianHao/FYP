//import YUKA from 'yuka';
//import { gsap } from 'gsap';

import * as THREE from 'three';
import * as YUKA from 'yuka';
import  gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import { 
    ANSWERSTEXT,
    RESULT
 } from './constants';


const entityManager = new YUKA.EntityManager();

const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const loadingManager = new THREE.LoadingManager();

const startButton = document.querySelector('.header button');
const title = document.querySelector('.header h1');

const explanation = document.querySelector('.explanation');
const nextQuestionButton = document.querySelector('.explanation button');
const question = document.querySelector('.questions p');
const result = document.querySelector('.result');

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

const option1Text = document.getElementById('a1-text');
const option2Text = document.getElementById('a2-text');
const option3Text = document.getElementById('a3-text');



let cameraX = 3;
let cameraZ = 144;
let questionNumber = 1;
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';




const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
// renderer.setClearColor(0xFEFEFE); white
renderer.setClearColor(0x94D8FB); //blue

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// const orbit = new OrbitControls(camera,renderer.domElement);

// Camera positioning
camera.position.set(3, 10, 218);
camera.lookAt(scene.position);
//orbit.update();


const ambientLight = new THREE.AmbientLight(0xE1E1E1, 0.3);
scene.add(ambientLight);

const hemiSphereLight = new THREE.HemisphereLight(0x94D8F8, 0x9CFF2E, 0.3);
scene.add(hemiSphereLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
scene.add(directionalLight);

renderer.outputEncoding = THREE.sRGBEncoding;

// loadingManager.onProgress = function(url, loaded, total) {
//     progressBar.value = (loaded/total) * 120;
// }

// loadingManager.onLoad = function() {
//     progressBarContainer.style.display = 'none'; 
// }

//const gLoader = new GLTFLoader(loadingManager);
const gLoader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
gLoader.setDRACOLoader(dLoader);

gLoader.load('./assets/terrain.glb', function(glb){
    const model = glb.scene;
    scene.add(model);
});
// console.log("STarted onclick!")
// chooseAnswer()
// console.log("DOne onclick")

function sync(entity, renderComponent){
    renderComponent.matrix.copy(entity.worldMatrix);
}

// function createCar(model, path, entityManager, yRotatation) {
//     const group = new THREE.Group();
//     scene.add(group);
//     group.matrixAutoUpdate = false;

//     const car = SkeletonUtils.clone(model);
//     group.add(car);

//     const v = new YUKA.Vehicle();
//     v.setRenderComponent(group, sync);
    
//     entityManager.add(v);

//     const followPathBehaviour = new YUKA.followPathBehaviour(path, 2);
//     const onPathBehaviour = new YUKA.onPathBehaviour(path);
//     onPathBehaviour.radius = 0.1;

//     v.position.copy(path.current());
//     v.maxSpeed = 5;
//     v.steering.add(onPathBehaviour);
//     v.steering.add(followPathBehaviour);

//     followPathBehaviour.active = false;

//     v.rotation.fromEuler(0, yRotatation, 0);

//     const vehicleAll = {vehicle: v, modelGroup: car};
//     return vehicleAll;
// }



// gLoader.load('./assets/SUV.glb', function(glb){
//     const model = glb.scene;
//     const v1 = createCar(model, YELLOWVEHICLESPATHS[0], entityManager, Math.PI)
// });

startButton.addEventListener('mousedown', function() {
    const t1 = gsap.timeline();
    t1.to(startButton, {
        autoAlpha: 0,
        // y: '-=20',
        duration: 0.5
    })
    .to(title, {
        autoAlpha: 0,
        // y: '-=20',
        duration: 1
    },0)
    .to(camera.position, {
        z: 144,
        duration: 3
    },0)
    .to(camera.rotation, {
        x: -0.4,
        duration: 3
    },0)

    .to(question, {
        autoAlpha: 1,
        duration : 0.5
    }, '+=0.2')
    .to(option1, {
        rotateX: 0,
        duration: 0.4
    }, '+=0.4')
    .to(option2, {
        rotateX: 0,
        duration: 0.4
    }, '+=0.4')
    .to(option3, {
        rotateX: 0,
        duration: 0.4
    }, '+=0.4')
})




//let chosenIndex = null; 

// function chooseAnswer() {

//     const options = document.querySelectorAll('li');
//     let chosenOption = null;
  
//     options.forEach(option => {
  
//       option.addEventListener('click', () => {
  
//         // Unhighlight previous choice
//         if(chosenOption) {
//           chosenOption.style.backgroundColor = 'black';
//           chosenOption.style.color = 'white';  
//         }
  
//         // Highlight new choice
//         option.style.backgroundColor = 'white';
//         option.style.color = 'black';
  
//         gsap.to(explanation, {
//           autoAlpha: 1, 
//           y: "=10",   
//           duration: 0.5
//         });
  
//         // Update chosen option
//         chosenOption = option;
  
//       });
  
//     });
  
//   }
  
//   chooseAnswer();



const options = document.querySelectorAll('li');
let chosenIndex = 0; 

function chooseAnswer() {
  
    options.forEach((option, index) => {
  
      option.addEventListener('click', () => {

      
        // Unhighlight previous choice
        if(chosenIndex !== null) {
          options[chosenIndex].style.backgroundColor = 'black';
          options[chosenIndex].style.color = 'white';
        }
  
        // Highlight clicked option
        option.style.backgroundColor = 'white';
        option.style.color = 'black';
  
        // Update chosen index
        chosenIndex = index;

        
        
        // Log index + 1 (to start from 1 instead of 0)
        console.log(chosenIndex+1); 

      

        gsap.to(explanation, {
          autoAlpha: 1, 
          y: "=10",   
          duration: 0.5
        });
  
      });
  
    });
  
  }
  
  chooseAnswer();


option1.addEventListener('click', chooseAnswer.bind(null,option1));
option2.addEventListener('click', chooseAnswer.bind(null,option2));
option3.addEventListener('click', chooseAnswer.bind(null,option3));

function changeColors() {
    option1.style.backgroundColor = 'black';
    option1.style.color = 'white';
    option2.style.backgroundColor = 'black';
    option2.style.color = 'white';
    option3.style.backgroundColor = 'black';
    option3.style.color = 'white';
}

function changeOptionsText(qtion, opt1, opt2, opt3){
    question.textContent = qtion;
    option1Text.textContent = opt1;
    option2Text.textContent = opt2;
    option3Text.textContent = opt3;

}    
        
    // Reusable animation functions  
    const cameraAnimations = [
        function() {
          // Animation 1
          cameraZ = 51; 
        },
        function() {  
          // Animation 2
          cameraX = 100;
        },
        function() {
         // Animation 3 
         cameraZ = -45;
        },
        function() {
         // Animation 4 
         cameraX = 4;
        },
        function() {
         // Animation 5 
         cameraZ = -135;
        },
        function() {
         // Animation 6 
         cameraX = -93;
        },
        function() {
         // Animation 7 
         cameraX = 4;
         
        },
        function() {
         // Animation 8 
         cameraZ = -45;
        },
        function() {
         // Animation 9 
         cameraZ = -215;
        },
        function() {
         // Animation 10 
         cameraZ = -215;
        }
      ];

    
    
        function playCameraAnimation(index) {
            cameraAnimations[index](); 
          }


          function updateQuestionsAndOptions(CurrentQuestionNumber) {

            const t1 = gsap.timeline();
    t1.to(camera.position, {
        x: cameraX,
        z: cameraZ,
        duration: 4

    })
    .to(question, {
        autoAlpha: 0,
        duration: 0.2
    },0)
    .to(explanation, {
        autoAlpha: 0,
        y: '+=10',
        duration: 0.5
    },0)
    .to(option1, {
        rotateX: 90,
        duration: 0.2
    }, '-=3.7')
    .to(option2, {
        rotateX: 90,
        duration: 0.2
        }, '-=3.5')
    .to(option3, {
        rotateX: 90,
        duration: 0.2,
        onComplete: function() {
            changeColors();
               changeOptionsText(
                    ANSWERSTEXT[CurrentQuestionNumber-1].question,
                    ANSWERSTEXT[CurrentQuestionNumber-1].option1,
                    ANSWERSTEXT[CurrentQuestionNumber-1].option2,
                    ANSWERSTEXT[CurrentQuestionNumber-1].option3,
               );

        }
    }, '-=3.3')
    .to(question, {
        autoAlpha: 1,
        duration: 0.2,
    }, '-=0.5')
    .to(option1, {
        rotateX: 0,
        duration: 0.2
    }, '+=0.5')
    .to(option2, {
        rotateX: 0,
        duration: 0.2
    }, '+=0.4')
    .to(option3, {
        rotateX: 0,
        duration: 0.2
    }, '+=0.3')
          }
          



nextQuestionButton.addEventListener('click', function() {


    chooseAnswer();
    
  switch(questionNumber) {
    
    case 1: 
        playCameraAnimation(0);
       
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);

//     playCameraAnimation(0);
       
    
//     if(chosenIndex == 0){
//        showResult(

//             RESULT[CurrentQuestionNumber-1].result,
            
//        );
//         result = RESULT[0];
//     }else if (chosenIndex == 1){
//         result = RESULT[2];
//     }


//    nextQuestionButton.textContent = "RESULT";
       
         break;


    case 2:
        playCameraAnimation(1);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
  
         break;

    case 3:
        playCameraAnimation(2);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
  
         break;
    
    case 4:
        playCameraAnimation(3);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
     
         break;

    case 5:
        playCameraAnimation(4);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
  
         break;

    case 6:
        playCameraAnimation(5);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
       
         break;

    case 7:
        playCameraAnimation(6);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
       
       
         break;

    case 8:
        playCameraAnimation(7);
        alert(`ChosenIndex: ${chosenIndex}`);
        if(chosenIndex == 0){
            questionNumber += chosenIndex+1;
        }else if (chosenIndex == 1){
            questionNumber += chosenIndex+1;
        }else if(chosenIndex == 2){
            questionNumber += chosenIndex+1;
   }
   alert(`questionNumebr: ${questionNumber}`);
   nextQuestionButton.textContent = "RESULT";
       
       
  
         break;

    case 9:
        playCameraAnimation(8);
        alert(`ChosenIndex: ${chosenIndex}`);
//         if(chosenIndex == 0){
//             questionNumber += chosenIndex+1;
//         }else if (chosenIndex == 1){
//             questionNumber += chosenIndex+1;
//         }else if(chosenIndex == 2){
//             questionNumber += chosenIndex+1;
//    }
   alert(`questionNumebr: ${questionNumber}`);
   nextQuestionButton.textContent = "RESULT";
   showResult();
   
         break;

    case 10:
        playCameraAnimation(9);
        alert(`ChosenIndex: ${chosenIndex}`);
//         if(chosenIndex == 0){
//             questionNumber += chosenIndex+1;
//         }else if (chosenIndex == 1){
//             questionNumber += chosenIndex+1;
//         }else if(chosenIndex == 2){
//             questionNumber += chosenIndex+1;
//    }
   alert(`questionNumebr: ${questionNumber}`);
   nextQuestionButton.textContent = "RESULT";
   showResult();
      
         break;

         case 11:
            playCameraAnimation(10);
            showResult();
  }

  updateQuestionsAndOptions(questionNumber);

    
});

function showResult(resultNUmber) {
    if (nextQuestionButton.textContent == 'RESULT') {

         // Get the corresponding result object based on questionNumber and chosenIndex
         const resultIndex = chosenIndex; // Adjust this logic based on your requirements
         const resultContent = RESULT[resultIndex];

        // Get screen dimensions
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Create or open a new full-screen window
        const resultWindow = window.open('', '_blank', `width=${screenWidth},height=${screenHeight}`);

        // Write the result content to the new window
        resultWindow.document.write(`
            <html>
                <head>
                    <title>Result</title>
                    <!-- Include any necessary styles or scripts here -->
                </head>
                <body>
                    <h1>PERSONALITY TYPES</h1>
                    <p>${resultContent.type}</p>
                    <p>${resultContent.explanation}</p>
                    <button onclick="window.close(); location.reload()">Test Again</button>
                </body>
            </html>
        `);

        // Optionally, you can include additional styles or scripts within the result window
        resultWindow.document.head.innerHTML += `
            <style>
                /* Add your custom styles here */
            </style>
        `;
    }

}

const time = new YUKA.Time();

// // Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
    const delta = time.update().getDelta();
    entityManager.update(delta);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});