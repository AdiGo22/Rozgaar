import {Stack} from "expo-router";
import './global.css';
export default function RootLayout () { 
   return(
    <>
    <Stack>
    <Stack.Screen
    name ="(tabs)"
     options={{headerShown : false}}
     //this allowss to hide header shown 
    />
    <Stack.Screen
    name = "jobs/[id]"
    options = {{headerShown : false}}
     />
  
    </Stack>
    </>
   )
}