import React, { useState, useEffect } from "react";
import verified_badge from "@/assets/verified_badge.svg";
import pending_badge from "@/assets/pending_badge.svg";
import { UnsavedChangesAlert } from "@/components";
import DynamicForm from "@/components/DynamicForm";
import userProfileFormSchema from "../form/config";

interface DocumentCard {
   id: string;
   name: string;
   status: "verified" | "pending" | "add";
   image?: string;
}

interface ProfileFormRef {
   save: () => void;
   hasUnsavedChanges: boolean;
}

interface ProfileFormProps {
   onSave?: () => void;
   onContinue?: (hasChanges: boolean) => void;
   ref?: React.Ref<ProfileFormRef>;
   onDocumentAdd?: () => void;
}

const ProfileForm = React.forwardRef<ProfileFormRef, ProfileFormProps>(
   ({ onSave, onContinue, onDocumentAdd }, ref) => {
      const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
      const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
      const [pendingNavigation, setPendingNavigation] = useState<
         (() => void) | null
      >(null);
      const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
      const [initialFormData, setInitialFormData] = useState<Record<string, string | number | boolean>>({});

      // Dummy data for documents
      const [documents] = useState<DocumentCard[]>([
         {
            id: "aadhaar",
            name: "Aadhaar Card",
            status: "verified",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
         },
         {
            id: "pan",
            name: "PAN Card",
            status: "pending",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
         },
         {
            id: "passport",
            name: "Passport",
            status: "pending",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
         },
         {
            id: "add",
            name: "Add Document",
            status: "add",
         },
      ]);

      // Default values for the form
      const defaultValues = {
         email: "nimitjain@gmail.com",
         name: "Nimit Jain",
         alternatePhone: "9756237892",
         dateOfBirth: "1997-03-02",
         gender: "male",
         collegeCompanyName: "Rentok",
         tenantType: "working-professional",
         currentAddress: "",
         phone: "9756237892",
         fatherName: "Add details",
         parentPhone: "9756237892",
         localGuardianName: "Add details",
         localGuardianPhone: "9756237892",
         pinCode: "",
         remark: "",
         bankAccountNumber: "",
         ifscCode: "",
         bankName: "",
         upiId: "",
         companyParent: "",
         companyAddress: ""
      };

      // Store initial values on component mount
      useEffect(() => {
         setInitialFormData(defaultValues);
         setFormData(defaultValues);
      }, []);

      // Check for changes
      const checkForChanges = () => {
         if (!initialFormData || Object.keys(initialFormData).length === 0) return false;
         
         return Object.keys(formData).some(key => 
            formData[key] !== initialFormData[key]
         );
      };

      // Update hasUnsavedChanges whenever form data changes
      useEffect(() => {
         const hasChanges = checkForChanges();
         setHasUnsavedChanges(hasChanges);

         // Notify parent component about changes
         if (onContinue) {
            onContinue(hasChanges);
         }
      }, [formData, onContinue]);

      // Handle beforeunload event
      useEffect(() => {
         const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
               e.preventDefault();
               e.returnValue = "";
            }
         };

         window.addEventListener("beforeunload", handleBeforeUnload);
         return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
      }, [hasUnsavedChanges]);

      // Handle form submission
      const handleFormSubmit = (data: Record<string, string | number | boolean>) => {
         setFormData(data);
         setInitialFormData(data);
         setHasUnsavedChanges(false);
         
         if (onSave) {
            onSave();
         }
      };

      const handleProceedAnyway = () => {
         setShowUnsavedAlert(false);
         setHasUnsavedChanges(false);
         if (pendingNavigation) {
            pendingNavigation();
            setPendingNavigation(null);
         }
      };

      const handleCancelNavigation = () => {
         setShowUnsavedAlert(false);
         setPendingNavigation(null);
      };

      // Expose save function to parent via ref
      React.useImperativeHandle(ref, () => ({
         save: () => handleFormSubmit(formData),
         hasUnsavedChanges,
      }));

      const renderDocumentCard = (doc: DocumentCard) => {
         if (doc.status === "add") {
            return (
               <div
                  key={doc.id}
                  onClick={() => {
                     if (onDocumentAdd) {
                        onDocumentAdd();
                     } else {
                        console.log('onDocumentAdd is not defined');
                     }
                  }}
                  className="bg-white h-[150px] relative rounded-[8.75px] w-[180px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-[12.5px] flex-shrink-0 min-w-[180px]"
               >
                  <div className="bg-[rgba(3,2,19,0.1)] rounded-full size-7 flex items-center justify-center mb-[3.5px]">
                     <svg
                        className="size-3.5 text-[#030213]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                     </svg>
                  </div>
                  <p className="text-[#101828] text-[10.5px] font-medium text-center leading-[14px]">
                     Add Document
                  </p>
                  <p className="text-[#717182] text-[10.5px] text-center leading-[14px]">
                     Upload additional ID
                  </p>
               </div>
            );
         }

         return (
            <div
               key={doc.id}
               className="bg-white h-[150px] relative rounded-[8.75px] w-[150px] shadow-sm flex-shrink-0 min-w-[150px]"
            >
               <div className="h-full flex flex-col">
                  <div className="bg-blue-100 h-[95px] rounded-t-[8.75px] relative overflow-hidden">
                     {doc.image && (
                        <div
                           className="w-full h-full bg-cover bg-center"
                           style={{ backgroundImage: `url('${doc.image}')` }}
                        />
                     )}
                     <div className="absolute top-[-14px] right-[7px]">
                        <img
                           src={
                              doc.status === "verified"
                                 ? verified_badge
                                 : pending_badge
                           }
                           alt={
                              doc.status === "verified" ? "Verified" : "Pending"
                           }
                           className="w-18 h-18"
                        />
                     </div>
                  </div>
                  <div className="p-[10.5px] flex-1 flex flex-col justify-between">
                     <div className="flex items-center justify-between">
                        <div className="flex-1">
                           <p className="text-[#101828] text-[10.5px] font-medium leading-[14px]">
                              {doc.name}
                           </p>
                           <p className="text-[#155dfc] text-[10.5px] font-normal leading-[14px]">
                              Edit
                           </p>
                        </div>
                        <svg
                           className="size-[10.5px] text-[#717182]"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                           />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         );
      };

      return (
         <div className="space-y-[21px]">
            {/* Profile Card */}
            <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[384px] mx-auto">
               <div className="p-[21px] text-center">
                  <div className="relative inline-block mb-[21px]">
                     <div className="bg-blue-100 rounded-full size-28 relative">
                        <div className="bg-gray-100 rounded-full size-28 flex items-center justify-center">
                           <div className="size-[88px] bg-gray-200 rounded-full" />
                        </div>
                        <div className="absolute inset-0 border-4 border-white rounded-full shadow-lg" />
                     </div>
                     <button className="absolute bottom-[7px] right-[7px] bg-[#030213] rounded-full size-[35px] flex items-center justify-center shadow-lg">
                        <svg
                           className="size-[17.5px] text-white"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                           />
                        </svg>
                     </button>
                  </div>
                  <h2 className="text-[#101828] text-[17.5px] font-medium leading-[24.5px] mb-[7px]">
                     Nimit Jain
                  </h2>
                  <div className="bg-[#ffedd4] inline-flex items-center gap-1 px-[7px] py-[3.5px] rounded-full">
                     <span className="text-[#ca3500] text-[10px] font-normal leading-[14px]">
                        KYC Pending
                     </span>
                     <svg
                        className="size-3 text-[#ca3500]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                     </svg>
                  </div>
               </div>
            </div>

            {/* Identity Documents */}
            <div className="space-y-[21px]">
               <div className="flex items-center justify-between">
                  <h3 className="text-[#101828] text-[14px] font-medium leading-[21px]">
                     Identity Documents
                  </h3>
                  <span className="text-[#717182] text-[12.3px] leading-[17.5px]">
                     1/5 verified
                  </span>
               </div>
               <div className="flex gap-[11px] overflow-x-auto pb-2 scrollbar-hide w-full">
                  {documents.map(renderDocumentCard)}
               </div>
            </div>

            {/* Dynamic Form */}
            <div className="rounded-[21px]">
               <div className="">
                  <DynamicForm
                     schema={userProfileFormSchema}
                     onSubmit={handleFormSubmit}
                     submitButtonText="Continue"
                     defaultValues={defaultValues}
                     className="space-y-6"
                     expandAllByDefault={true}
                  />
               </div>
            </div>

            {/* Unsaved Changes Alert */}
            <UnsavedChangesAlert
               isOpen={showUnsavedAlert}
               onProceed={handleProceedAnyway}
               onCancel={handleCancelNavigation}
            />
         </div>
      );
   }
);

export default ProfileForm;
