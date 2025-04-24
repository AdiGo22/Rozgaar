const JOBS_API_CONFIG = { 
    BASE_URL : 'https://testapi.getlokalapp.com/common',
    headers : { 
        Accept :  'application/json',
    }
};

export const fetchJobs = async({page}:{page :number}) => {
//endpoints with pages
const endpoint = `${JOBS_API_CONFIG.BASE_URL}/jobs?page=${page}`;

try {
  const response = await fetch(endpoint, { 
    method : 'GET',
    headers : JOBS_API_CONFIG.headers,
  });

if(!response.ok) { 
    throw new Error(`API request failed : ${response.status}`);
}
const data = await response.json();
return data.results; //jobs array from the response.
}
catch(e) { 
console.error("Jobs fetch error",e);
}
}