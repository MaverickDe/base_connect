import { Macdoc } from "./macdot"

export const Wyship = ()=>{
    return <div className=" max-md:overflow-x-scroll">


        <div className="rounded-xl border relative bg-white max-w-[500px] p-5">
            <Macdoc/>
            <div>

                <pre className="whitespace-pre-wrap break-words  ">

                    {
                        `
Every deploy is remarkable. Chat with your team on real, production-grade UI, not just designs.

Every deploy is remarkable. Chat with your team on real, production-grade UI, not just designs.


                        `
                    }
                </pre>
            </div>
              <div className="rounded-xl bg-white absolute top-[100px] left-[50px] border w-full p-5">
            <Macdoc/>
            <div>

                <pre className="whitespace-pre-wrap break-words  ">

                    {
                        `
Every deploy is remarkable. Chat with your team on real, production-grade UI, not just designs.

Every deploy is remarkable. Chat with your team on real, production-grade UI, not just designs.  `
                    }
                </pre>
            </div>

        </div>

        </div>
      
    </div>
}