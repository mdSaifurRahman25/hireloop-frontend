'use client'
import { Loader2, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "../(dashboard)/dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobDialog({job}: {job: JobPost}) {
  const [open, setOpen] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter(); 

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteJob(job.id); 
      console.log('deleting', res);
      if (res?.deletedCount > 0 || res?.deleteCount > 0 || res?.acknowledged) {
        setOpen(false); 
        toast.add({
          title: 'Job Deleted!',
          description: 'The job has been permanently deleted.',
        }); 
        router.refresh(); 
      } else {
        toast.add({
          title: 'Delete Failed',
          description: res?.message ?? 'Could not delete the job.',
        });
      }
    } catch (error) {
      console.error('Delete job error:', error);
      toast.add({
        title: 'Error',
        description: 'An error occurred while deleting the job.',
      });
    } finally {
      setIsDeleting(false);
    }
  }; 

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive"><Trash2Icon /></Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job post. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive" disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
