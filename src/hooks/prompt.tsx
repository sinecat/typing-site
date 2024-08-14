import {toast} from "@/components/ui/use-toast";

export const usePromptsToChangeInputMethod = (t:any)=>{
    return () => {
        toast({
            title: t('title'),
            description: t('content'),
        })
    }
}