//import YUKA from 'yuka';
//import { gsap } from 'gsap';

import * as THREE from 'three';
import * as YUKA from 'yuka';
import  gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import { 
    ANSWERSTEXT
 } from './constants';

 import {questions} from "./question&answer.js"
 import {answers} from "./question&answer.js"

const entityManager = new YUKA.EntityManager();

const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const loadingManager = new THREE.LoadingManager();

const startButton = document.querySelector('.header button');
const title = document.querySelector('.header h1');

const explanation = document.querySelector('.explanation');
const nextQuestionButton = document.querySelector('.explanation button');
const question = document.querySelector('.questions p');

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

const option1Text = document.getElementById('a1-text');
const option2Text = document.getElementById('a2-text');
const option3Text = document.getElementById('a3-text');


let questionNumber = 1;
let cameraX = 3;
let cameraZ = 144;

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
let chosenIndex = null; 

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





function turnLeft(){
    cameraX -= 97; 
}

function turnRight(){
    cameraX += 97; 
}

function goStraight(){
    cameraZ -= 90; 
}

function reverse(){
    cameraZ += 90; 
}








nextQuestionButton.addEventListener('click', function() {
    chooseAnswer(); 
   
    //questionNumber++;
    questionNumber+= chosenIndex + 1;
   
    switch (questionNumber) {
        // case 1:
        //     resetCamera();
        // break;

        case 2:
       
            // cameraZ = 51;
            goStraight(); //(向前)    
            break;
        
        case 3:
            // questionNumber = 1;
            turnRight(); //（向右）
            break;

        case 4:
            goStraight();; //（向前）
            break; 
            
        case 5:
            turnLeft(); //（向左）
            break; 
            
        case 6:
            goStraight(); //（向前）
            break; 
            
        case 7:
            turnLeft(); //（向左）
            break; 
            
        case 8:
            turnRight(); //（向右）
            break; 
        
        case 9:
            reverse();//（向前）
            break; 

        case 10:
            goStraight();//（向前）
            nextQuestionButton.textContent = "RESULT";
            //nextQuestionButton.disabled = true;
            //nextQuestionButton.style.visibility = "hidden";
            break; 

        case 11:
            goStraight();

        default:
            showResult();
                    
    }

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
                    ANSWERSTEXT[questionNumber -1].question,
                    ANSWERSTEXT[questionNumber -1].option1,
                    ANSWERSTEXT[questionNumber -1].option2,
                    ANSWERSTEXT[questionNumber -1].option3,
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

    
});

// function resetCamera(){

// const t1 = gsap.timeline();
//     t1.to(question, {
//         autoAlpha: 0,
//         duration: 1
//     },0)
//     .to(option1, {
//         rotateX: 0,
//         duration: 1
//     },0)
//     .to(option2, {
//         rotateX: 0,
//         duration: 1
//     },0)
//     .to(option3, {
//         autoAlpha: 0,
//         duration: 1
//     },0)
//     .to(camera.position, {
//         x: 3,
//         y: 10,
//         z: 218,
//         duration: 3
//     },0)
//     .to(camera.rotation, {
//         x: 0.4,
//         duration: 3
//     },0)

//     .to(title, {
//         autoAlpha: 1,
//         duration: 1
//     },0)
//     .to(startButton, {
//         autoAlpha: 1,
//         duration: 0.5
//     })
    
// }











// function turnLeft(){
//     cameraX -= 90; 
// }

// function turnRight(){
//     cameraX += 90; 
// }

// function goStraight(){
//     cameraZ -= 90; 
// }





// nextQuestionButton.addEventListener('click', function() {
//     chooseAnswer(); 
   
//     questionNumber++;
//     //questionNumber+= chosenIndex + 1;
   
//     switch (questionNumber) {
//         case 2:
//             goStraight(); //(向前)
//             break;
        
//         case 3:
//             turnRight(); //（向右）
//             break;

//         case 4:
//             cameraZ = -45; //（向前）
//             break; 
            
//         case 5:
//             cameraX = 4; //（向左）
//             break; 
            
//         case 6:
//             cameraZ = -145; //（向前）
//             break; 
            
//         case 7:
//             cameraX = -90; //（向左）
//             break; 
            
//         case 8:
//             cameraX = 4; //（向右）
//             break; 
        
//         case 9:
//             cameraZ = -55;//（向右）
//             break; 

//         case 10:
//             cameraZ = -195;//（向右）
//             nextQuestionButton.textContent = "RESULT";
//             //nextQuestionButton.disabled = true;
//             //nextQuestionButton.style.visibility = "hidden";
//             break; 

//         default:
//             showResult();
                    
//     }

//     const t1 = gsap.timeline();
//     t1.to(camera.position, {
//         x: cameraX,
//         z: cameraZ,
//         duration: 4

//     })
//     .to(question, {
//         autoAlpha: 0,
//         duration: 0.2
//     },0)
//     .to(explanation, {
//         autoAlpha: 0,
//         y: '+=10',
//         duration: 0.5
//     },0)
//     .to(option1, {
//         rotateX: 90,
//         duration: 0.2
//     }, '-=3.7')
//     .to(option2, {
//         rotateX: 90,
//         duration: 0.2
//         }, '-=3.5')
//     .to(option3, {
//         rotateX: 90,
//         duration: 0.2,
//         onComplete: function() {
//             changeColors();
//                changeOptionsText(
//                     ANSWERSTEXT[questionNumber -1].question,
//                     ANSWERSTEXT[questionNumber -1].option1,
//                     ANSWERSTEXT[questionNumber -1].option2,
//                     ANSWERSTEXT[questionNumber -1].option3,
//                );

//         }
//     }, '-=3.3')
//     .to(question, {
//         autoAlpha: 1,
//         duration: 0.2,
//     }, '-=0.5')
//     .to(option1, {
//         rotateX: 0,
//         duration: 0.2
//     }, '+=0.5')
//     .to(option2, {
//         rotateX: 0,
//         duration: 0.2
//     }, '+=0.4')
//     .to(option3, {
//         rotateX: 0,
//         duration: 0.2
//     }, '+=0.3')

    
// });




   




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