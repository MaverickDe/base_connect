import Image from "next/image";


export interface IDefaultLogo {
    height?:number
    width?:number
}
const Logo = ({width=100,height=100}:IDefaultLogo={}) => {
  return (
    <Image 
      src="/Frame.png" 
      alt="Logo" 
      width={width} 
      height={height} 
      priority
    />
  );
};

export default Logo;
