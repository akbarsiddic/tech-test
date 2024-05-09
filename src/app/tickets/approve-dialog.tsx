"use client";

import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { db } from "~/server/db";
import { Ticket } from "./columns";
import { revalidatePath } from "next/cache";

export function ApproveDialog({props}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    approved: z.string().min(1),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      approved: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      // hit the api /api/tickets
      const response = await fetch(`api/tickets/${props}`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error while adding ticket");
      }

      toast({
        variant: "success",
        title: "Ticket Update",
        description: "Ticket has been Update successfully.",
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-indigo-600 text-white hover:bg-indigo-800"
        >
          Approve Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Approve Ticket</DialogTitle>
              <DialogDescription>
                Select the form below to approve a new ticket.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid  items-center gap-4">
                <FormField
                  control={form.control}
                  name="approved"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select approve or reject ticket</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal text-green-500">
                                Approve Ticket
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel className="font-normal text-red-500">
                              Reject Ticket
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
