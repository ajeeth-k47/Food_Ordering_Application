import React,{useCallback} from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';


const requestConfig = {};

export default function Meals(){
   
    // for  Local deployment
    //const {data:loadedMeals,isLoading,error}= useHttp("http://localhost:3000/meals",requestConfig,[]);

    // for production
    const {data:loadedMeals,isLoading,error}= useHttp("https://online-food-service.onrender.com/meals",requestConfig,[]);

   
    if(isLoading){
        return <p className='center'>Fetching Meals...</p>
    }

    if(error){
       return <Error title='Failed to fetch meals' message={error} />
    }

    return (
         <ul id="meals">
            {loadedMeals.map((meal)=>{
                return(
                <MealItem key={meal.id} meal={meal} />);
            })}
         </ul>
    );
}

