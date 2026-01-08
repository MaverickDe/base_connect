import { useState } from "react";
import { useApps } from "../../hooks";
import Button from "../ui/Button";
import { X } from "lucide-react";
import { wait } from "@/utils";




export const   useSaveEdit= (setShowEditModal:any,setApp?:any)=>{
  const {updateApp,updateAppLoading} =useApps()
 const handleSaveEdit = async (editFormData:any) => {
    console.log('Saving app changes:', editFormData);
    // Here you would make an API call to update the app
 
    try{
    let data =  await  updateApp(editFormData,editFormData?._id)

      if(data.success){

        // await   wait(2000)
        if(setApp){
          setApp((prev:any)=>{
            return {...prev,...editFormData}
          })
        }
        setShowEditModal(null);
      }
      return data
      // setShowCreateModal(false);
    }catch(e){
                          // await   wait(2000)
console.log(e)

                        }
                        // Handle create app logic here
                      
                        
                      };
                      return {handleSaveEdit,updateAppLoading} 



}
const Editapp =({showEditModal,setShowEditModal,setEditFormData,editFormData,setApp,editinitialdata}:any)=>{
  // const {updateApp,updateAppLoading} =useApps()
    //   const [showEditModal, setShowEditModal] = useState(null);
    //   const [showDeleteModal, setShowDeleteModal] = useState(null);
    //   const [editFormData, setEditFormData] = useState({
    //     name: '',
    //     description: '',
    //     primaryUrl: '',
    //     interval: '60'
    //   });
    const {handleSaveEdit,updateAppLoading}= useSaveEdit(setShowEditModal,setApp)
  // const handleEditApp = (app) => {
  //   setEditFormData(app);
  //   setShowEditModal(app);
  // };


//   const handleSaveEdit = async () => {
//     console.log('Saving app changes:', editFormData);
//     // Here you would make an API call to update the app
 
      
//       try{
//    await  updateApp(editFormData,editFormData?._id)
//         setShowEditModal(null);
//                           // setShowCreateModal(false);
//                         }catch(e){
// console.log(e)

//                         }
//                         // Handle create app logic here
                      
//   };


  return (
    
<>

  {showEditModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={() => setShowEditModal(null)}></div>
            
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-lg w-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Edit Application</h3>
                    <button
                      onClick={() => setShowEditModal(null)}
                      className="text-gray-400 hover:text-white transition-colors p-2"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Application Name
                      </label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="My Awesome App"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editFormData.description}
                        onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Brief description of your application"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary URL
                      </label>
                      <input
                        type="url"
                        value={editFormData.primaryUrl}
                        onChange={(e) => setEditFormData({...editFormData, primaryUrl: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="https://myapp.com"
                      />
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Monitoring Interval
                      </label>
                      <select 
                        value={editFormData.interval}
                        onChange={(e) => setEditFormData({...editFormData, interval: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="30">30 seconds</option>
                        <option value="60">1 minute</option>
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                      </select>
                    </div> */}
                  </div>

                  <div className="flex space-x-3 mt-8">
                    <button
                      onClick={() => setShowEditModal(null)}
                      className="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Cancel
                    </button>
                    <Button loading={updateAppLoading}
                    disabled={updateAppLoading}
                      onClick={async ()=>{
                        
                        
                        let v = await handleSaveEdit(editFormData)
                      
                        if(v.success){
                        setEditFormData(editinitialdata)
                      }
                      }
                    
                      }
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Save Changesa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

</>  )
    
}


export default Editapp;