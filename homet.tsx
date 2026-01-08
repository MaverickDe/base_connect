

// import Image from "next/image";

// import Navbar from "../../components/navbar";
// import Button from "../../components/ui/Button";
// import { ArrowBigUpDash, ChevronRight, SquareArrowDownRight, SquareArrowRight } from "lucide-react";
// import ImageWithOverlay from "../../components/imageoverlay-alt";
// import IWithOverlay  from "../../components/imageoverlay";
// import DottedLineWithBlobs from "../../components/ui/Dottedline";
// export const hideMainHeader = true;
// import CloudQueueIcon from '@mui/icons-material/CloudQueue';
// import HubIcon from '@mui/icons-material/Hub';
// import { Cached } from "@mui/icons-material";
// import { NormalDoc } from "../../components/docs";
// import { Wyship } from "../../components/random/wyship";
// import React from "react";
// import { Footer } from "../../components/footer";
// export default function Home() {
//   return (
//   <div className="w-full">
// <div className="w-full   nnnnn">

// <ImageWithOverlay
//   src="/fabio-oyXis2kALVg-unsplash.jpg"
//   overlayContent={
//     <div className="bg-black/30   w-full  h-fit     text-white  ">
//     <div className=" p-4 px-primarypad max-sm:px-mprimarypad  w-full  h-fit     text-white  ">
//       <Navbar px="0"/>
//       <div className="w-full flex h-fit  pt-20 flex-col items-center">

// <h2 className="text-[70px] font-bold max-w-200 text-center">Your fatest path to production</h2>
// <p className="text-[30px]">Get quater teo og just going there for fun</p>
// <Button title="Get started" className="mt-5 bg-[white] text-primary rounded-md flex  px-10" left={<ChevronRight className="bg-primary  rounded-md border" color={"white"} size={20}/>}/>
// <div className="flex items-center flex-col justify-center mt-10">

// <p className="my-1 mb-3">Quick metrics</p>
// <div className="flex gap-3 justify-center">{
  
//   [{al:"Secured"},{al:"real time"},{al:"multiple"}].map((e,index)=>{
//     return <div key={index}className="bg-[#3B4C58]/20 flex  justify-center items-center flex-col rounded-md h-30 w-40 max-md:h-20 max-md:w-30">
// <ArrowBigUpDash/>
//       <p>{e.al}</p>
//     </div>
//   })
//   }</div>

// </div>
//       </div>
//           </div>
//       <div className=" pt-20 bg-gradient-to-t px-primarypad max-sm:px-mprimarypad from-black via-black/90 to-transparent flex items-center flex-col min-h-30 pt-50 pb-30 justify-center">

//         <h1 className="text-[30px] mb-4">Varibale <span className="text-primary">computes...</span></h1>
//         <div className="flex gap-3 justify-center">{
  
//   [{al:"Instant Redeployment",Icon:HubIcon},{al:"Auto Update",Icon:CloudQueueIcon},{al:"Syncing",Icon:Cached}].map((e,index,arr)=>{

//     let line = index != arr.length-1 ?<DottedLineWithBlobs className="mx-10 max-sm:mx-2" lineStyle={"border-secondary "} blobStyle={"bg-secondary"}/>:null
//     return <React.Fragment key={index}>
//      <div key={index} className=" flex  justify-center items-center flex-col rounded-md  min-md:h-20 min-md:w-30">
// <e.Icon  sx={{ 
//           fontSize: {
//             xs: 20,  // mobile
//             sm: 30,  // ≥640px
//             md: 40,  // ≥768px
//             lg: 60   // ≥1024px
//           },}}className="text-secondary  text-[4444px] w-500 max-sm:w-135 max-sm:h-135"/>
//       <p className="text-center max-md:text-5">{e.al}</p>

//     </div>
//     {line}
//    </React.Fragment>
//   })
//   }</div>
//       </div>
  

//     </div>
//   }
//   objectFit="cover"
// />
// </div>

// <div className="bg-tertiary px-primarypad  max-sm:px-mprimarypad py-10">
// <NormalDoc/>
// </div>
// <div className="flex  items-center w-full  justify-center max-sm:px-mprimarypad  px-primarypad  bg-black">
//   <div className="flex gap-5 max-sm:flex-col items-center max-w-[1500px] justify-between py-20 bg-black">
//      <h1 className="text-[50px] text-white mb-4">Variable <span className="text-primary">computes...</span></h1>
//      <div>

//       {
//         [{des:"sync cloud env with specified env file",head:"Syncing with local env"},{head:"Update env in runtime",des:"auto update env in runtime allowing for instant redployment"},{head:"Supports intsant redeploy",des:"specify redploy command "}].map((e,index)=>{
//           return <>
//           <div className="mb-5 text-[20px] text-white">

//           <h1>{e.head}</h1>
//           <p>{e.des}</p>
//           </div>
//           </>
//         })
//       }
//      </div>
//   </div>
// </div>



// <div className="w-full  flex items-center flex-col bg-contain h-100 min-md:h-150  "
//  style={{ backgroundImage: "url('/white-beam-gray-wall-generative-ai.jpg')" }}
// >
// <div className="w-full   ">
// <div className="w-full  flex items-center flex-col">
// <div className="w-full px-primarypad max-sm:px-mprimarypad  max-w-[1000px] flex items-center flex-col">

// <h1 className="font-bold my-10 text-center text-[40px] text-white max-w-[600px]">
//   Built-in application security with end to end Encrytion
// </h1>
// <div className="bg-black/30 p-4 relative  w-full h-fit       text-white  ">
//   {/* <Image
//         src={"/env.png"}
//         alt={"alt"}
//         height={10}
//         width={100}
//         // fill
//         className="w-full absolute top-[300px]"
//         // style={{ objectFit,position:"absolute" }}
//         sizes="100vw"
//         priority
//       /> */}

//  {/* <Image
//         src={"/white-beam-gray-wall-generative-ai.jpg"}
//         alt={"alt"}
//         height={10}
//         width={100}
//         // fill
//         className="w-full absolute top-0 z-index-0"
//         // style={{ objectFit,position:"absolute" }}
//         sizes="100vw"
//         priority
//       /> */}

//   <img
//         src={"/env.svg"}
//         alt={"alt"}
//         // height={10}
//         // width={100}
        
//         // fill
//         className="w-full"
//         // style={{ objectFit,position:"absolute" }}
//         // sizes="100vw"
//         // priority
//       />

//     </div>
// </div>


// </div>
// <div>
// <div className="flex bg-[#D9D9D9]  gap-5 h-[200px] mt-5 w-full px-primarypad max-sm:px-mprimarypad mt-[100px]">
//   <p className="relative top-[-30px] max-md:hidden bg-white px-5">It helps us onboard new software engineers and get them productive right away. We have </p>
//   <p  className="bg-white px-5">
//     <p className="min-md:hidden my-5">""Quote""</p>
// It helps us onboard new software engineers and get them productive right away. We have all our source code, issues, and pull requests in one place... GitHub is a complete platform that frees us from menial tasks and enables us to do our best work.
// Fabian FaulhaberApplication manager at Mercedes-Benz</p>
// </div>






// </div>

// <div className="p-primarypad max-sm:px-mprimarypad py-[100px] flex items-center max-md:flex-col gap-10 justify-around">

//   <div className="p-5">
    
//     <h1 className="font-bold text-2xl">Vercel AI Gateway</h1>
//     <p className="mb-3 text-2xl">From localhost to https, in seconds. Deploy from Git or your CLI.</p>
//     <Wyship/>
//   </div>
//   <div>
//  <h1 className="font-bold text-5xl text-gray-700">
//   Scale with confidence
// </h1>

//     <p className="text-2xl">Grow your infrastructure, team, and business with a platform that scales alongside you.</p>
//   </div>
// </div>

// <div className="py-10 pb-20 border-b">
//   <h1 className="text-center text-3xl font-bold ">Develop with your favorite tools 
// Launch globally, instantly  Keep pushing</h1>
// {/* <hr className="w-full"></hr> */}
 
// </div>
// <div className="flex flex-col items-center justify-center py-10">
//   <h1 className="text-center text-3xl ">Ready to deploy? Start building with a free account. Speak to an expert for your Pro or Enterprise needs.</h1>
//   <Button title="Get started" className="mt-5 bg-[white] text-primary rounded-md flex  px-10" left={<ChevronRight className="bg-primary  rounded-md border" color={"white"} size={20}/>}/>
// </div>

// <Footer/>

// </div>
// </div>


//   </div>
//   );
// }
