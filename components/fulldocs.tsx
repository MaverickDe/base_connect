import { Pre } from "./pre"

export const FullDocs = () => {




    return <>
    
    <div>
 <div >
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md ">
        
<p className="text-black/40 py-5 font-bold h-full " >Installation</p>
        </div>
        <Pre code=
            {`
//npm install dotenv

            `}
      />
    </div>






         <div >
               <div className="flex px-5 max-sm:px-mprimarypad rounded-md">
        
<p className="text-black/40 py-5 font-bold h-full " >Configuration</p>
        </div>
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md bg-[#517188]/10">
        
<p className="text-primary py-5 font-bold h-full border-b-2 border-b-primary" >Javascipt</p>
        </div>
        <Pre code=
            {`import dotenv from “dotenv”
            
dotenv.config({env:”/asd/dfd”,restart:”node nest.js”,key:””,secret:””}) 

`}
        />
    </div>
         <div >
               <div className="flex px-5 max-sm:px-mprimarypad rounded-md">
        
<p className="text-black/40 py-5 font-bold h-full " >Monitor for change</p>
        </div>
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md bg-[#517188]/10">
        
<p className="text-primary py-5 font-bold h-full border-b-2 border-b-primary" >Javascipt</p>
        </div>
   

           <Pre 
        code={
            
 `  import dotenv from “dotenv”dotenv.config({
  env: "/asd/dfd",
  onChange: ({ env, changedEnv }) => {
    console.log("Environment file reloaded");
    console.log("All env variables:", env);
    console.log("Changed variables:", changedEnv);
  },
  key: "YOUR_APP_KEY",
  secret: "YOUR_APP_SECRET"
});


            `}
        />
    </div>


<div className="overflow-x-scroll">

<table className="table-auto border-collapse border border-gray-300 w-full text-left my-10">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Parameter</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Required</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">env</td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">
                Path to the environment file to load (e.g., <code>.env</code> or a custom path).
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">onChange</td>
              <td className="border border-gray-300 px-4 py-2">Function</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">
                Callback executed whenever environment variables are reloaded or changed.  
                Receives an object <code>{`{ env, changedEnv }`}</code>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">key</td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">
                Key for validation or secure access to environment management.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">secret</td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">
                Secret for additional authentication or encryption logic.
              </td>
            </tr>
          </tbody>
        </table>
</div>
    
         <div >
               <div className="flex px-5 max-sm:px-mprimarypad rounded-md">
        
<pre className="text-black/40 py-5 font-bold h-full " >{
  `
onChange Callback
The onChange callback provides:
env → All environment variables after reload.
changedEnv → Only the environment variables that were modified since the last load.

Example
    `
}</pre>
        </div>
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md bg-[#517188]/10">
        
<p className="text-primary py-5 font-bold h-full border-b-2 border-b-primary" >Javascipt</p>
        </div>
   

           <Pre 
        code={
            
 ` onChange: ({ env, changedEnv }) => {
  if (changedEnv.includes("DB_URL")) {
    console.log("Database URL updated:", env.DB_URL);
    reconnectDatabase(env.DB_URL);
  }
}
            `}
        />
    </div>
         <div >
               <div className="flex px-5 max-sm:px-mprimarypad rounded-md">
        
<p className="text-black/40 py-5 font-bold h-full " >workflow
 
</p>
        </div>
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md bg-[#517188]/10">
        
<p className="text-primary py-5 font-bold h-full border-b-2 border-b-primary" >Javascipt</p>
        </div>
   

           <Pre 
        code={
            
 ` dotenv.config({
  env: ".env.production",
  onChange: ({ env, changedEnv }) => {
    if (changedEnv.includes("REDIS_URL")) {
      reconnectRedis(env.REDIS_URL);
    }
    if (changedEnv.includes("API_KEY")) {
      refreshAPIKey(env.API_KEY);
    }
  },
  key: "my-app",
  secret: "super-secret"
});
            `}
        />
    </div>
    <div className="p-6 mt-5 rounded-2xl ">
      <h2 className="text-lg text-[red] font-semibold mb-4">Notes</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          Always validate changed environment variables before applying them to
          critical services (e.g., DB, Redis).
        </li>
        <li>
          Sensitive information (like <code>key</code> and <code>secret</code>)
          should not be logged.
        </li>
        <li>
          Works well with watchers or reload triggers for <code>.env</code>{" "}
          files.
        </li>
      </ul>
    </div>

    </div>
    
    </>
}