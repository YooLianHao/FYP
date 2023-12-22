import { Cylindrical } from "three";
import { Path, Vector3 } from "yuka";

const YELLOWVEHICLESPATHS = [];

const yellowV1 = new Path();
yellowV1.add(new Vector3(5.91, 0.3, 125.92));
yellowV1.add(new Vector3(5.72, 0.3, 93.68));
YELLOWVEHICLESPATHS.push(yellowV1);

const yellowV2 = new Path();
yellowV2.add(new Vector3(6.21, 0.3, 30.19));
yellowV2.add(new Vector3(7.07, 0.3, 24.66));
yellowV2.add(new Vector3(33.32, 0.3, 24.36));
YELLOWVEHICLESPATHS.push(yellowV2);

const yellowV3 = new Path();
yellowV3.add(new Vector3(93.03, 0.3, 24.50));
yellowV3.add(new Vector3(102, 0.3, 22.84));
yellowV3.add(new Vector3(102.42, 0.3, -1.27));
YELLOWVEHICLESPATHS.push(yellowV3);

const yellowV4 = new Path();
yellowV4.add(new Vector3(102.50, 0.3, -66));
yellowV4.add(new Vector3(99.92, 0.3, -73.97));
yellowV4.add(new Vector3(76.00, 0.3, -75.41));
YELLOWVEHICLESPATHS.push(yellowV4);

const yellowV5 = new Path();
yellowV5.add(new Vector3(11.86, 0.3, -75.86));
yellowV5.add(new Vector3(5.98, 0.3, -75.96));
yellowV5.add(new Vector3(5.63, 0.3, -102.59));
YELLOWVEHICLESPATHS.push(yellowV5);

const yellowV6 = new Path();
yellowV6.add(new Vector3(5.97, 0.3, -161.04));
yellowV6.add(new Vector3(4.55, 0.3, -169.50));
yellowV6.add(new Vector3(-20.11, 0.3, -170.21));
YELLOWVEHICLESPATHS.push(yellowV6);

const yellowV7 = new Path();
yellowV7.add(new Vector3(-82.82, 0.3, -171.17));
yellowV7.add(new Vector3(-115.08, 0.3, -170.50));
YELLOWVEHICLESPATHS.push(yellowV7);

const ANSWERSTEXT = [
    {
        question: 'Q1 : How would your friends describe you？',
        option1: 'Passionate and optimistic ',
        option2: 'Warm but not overly expressive ',
        option3: 'Silent and uncommunicative ',
    },

    {
        question: 'Q2 :	What kind of music do you like？',
        option1: 'Lyrical ',
        option2: 'Rock & Roll ',
        option3: 'Hip Hop ',
    },

    {
        question: 'Q3 : How often do you do exercise?',
        option1: 'Occasionally ',
        option2: 'Often ',
        option3: 'Seldom ',
    },

    {
        question: 'Q4 : What would you do if a friend you know very well asks you to borrow money?',
        option1: 'Ask for the reason before borrowing  ',
        option2: 'Lend to him without hesitation  ',
        option3: 'Consider repeatedly  ',
    },

    {
        question: 'Q5 : How do you feel about love?',
        option1: 'Stay together for a long time ',
        option2: 'Live in the moment  ',
        //option3: '',
    },
    
    {
        question: 'Q6 : When you are on a long holiday, do you prefer to?',
        option1: 'Go for a trip  ',
        option2: 'Stay at home  ',
        option3: '',
    },
    
    {
        question: 'Q7 : Can you accept a short period of mental infidelity from your partner?',
        option1: 'Cannot ',
        option2: 'Can  ',
        option3: '',
    },
    
    {
        question: 'Q8 : Is there a general agreement between outward appearance and inner thoughts?',
        option1: 'Mostly consistent  ',
        option2: 'Not necessarily  ',
        option3: '',
    },
    
    {
        question: 'Q9 : Which of the following anime do you prefer?',
        option1: 'Spirited Away  ',
        option2: 'Totoro  ',
        option3: '',
    },
    
    {
        question: 'Q10 : Are you very ambitious?',
        option1: 'No ambition, just want to be ordinary  ',
        option2: 'Very ambitious ',
        option3: '',
    }

]

const RESULT = [   
    {
        type: 'Your personality colour: Cyan ',
        explanation: `Cyan is a colour between blue and green, there is no absolute distinction, just like your personality, it is between a gentle and rational opinion and a rebellious one.

        You are a very contradictory person who wants to act according to your heart, but at the same time, you are easily overwhelmed by rational emotions and cannot really act from your heart.
        
        Deep down you are rebellious and long for freedom, but you don't always reveal this to others. You have expectations of love, but you don't care about the longevity of it; a lifetime is too long for you.
        `,
    },

    {
        type: 'Your personality colour: Beige   ',
        explanation: `Beige is a warm and comforting colour, which is a perfect match for your personality. You have a stable temperament, you are not a hard-headed person, and you do not like to have a lot of excitement, but rather a quiet life.

        Most of your friends are happy to deal with you because you are non-aggressive, have a calmness about you and a high level of emotional intelligence, and do not make trouble for no reason.
        
        In general, you are seen as friendly and approachable, but this does not mean that you are a soft touch, and you are determined to defend yourself against anyone who offends your principles.
        
        `,
        
    },

    {
        type: 'Your personality colour: Red ',
        explanation: `Red represents enthusiasm, outgoing and initiative. You are a cheerful, open and honest person who has no sense of propriety or harm, and who treats all those around you with sincerity.

        You are simple and straightforward, confident, and bold, and don't like the dullness of a static life. You are a person who is open to challenges, who is willing to break the rules and who likes to explore new things and people, and you have a vitality that can be seen in you.
        
        You have a strong resilience and are not easily broken by life's blows. You always have the courage to rise again, and this is what makes you so attractive.
        `,
    },

    {
        type: 'Your personality colour: Blue ',
        explanation: `Blue is a symbol of wisdom and mystery. You are used to thinking rationally and you are able to remain calm in any confusing situation.

        You have a very clear vision of things and are a sensible person. However, it is not easy for people to see through you, as you have a different person living inside you than the one you appear to be.
        
        You are sometimes simple, sometimes complex, bright but also deep. Anyone who tries to read your innermost thoughts through your words and actions will only end up in a futile attempt.
        `,
    },


];


export{
    YELLOWVEHICLESPATHS,
    ANSWERSTEXT,
    RESULT
  
}